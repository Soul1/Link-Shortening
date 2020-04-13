const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = Router();

router.post(
  '/register',
  [
    check('email', 'Некорректный email!').isEmail(),
    check('pass', 'Минимальная длина пароля 6 символов')
      .isLength({min: 6})
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные для регистрации...'
        })
      }

      const {email, pass} = req.body;

      const candidate = await User.findOne({email});

      if (candidate) {
        return res.status(400).json({message: 'Такой пользователь уже есть!'})
      }

      const hashedPass = await bcrypt.hash(pass, 12);
      const user = new User({email, pass: hashedPass});
      await user.save();
      res.status(201).json({massage: 'Пользователь создан'})

    } catch (e) {
      res.status(500).json({message: 'Что-то не так, попробуйте снова...'})
    }
  });

router.post('/login',
  [
    check('email', 'Некорректный email!').normalizeEmail().isEmail(),
    check('pass', 'Введите пароль!').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные для при входе...'
        })
      }

      const {email, pass} = req.body;

      const user = await User.findOne({email});
      if (!user) {
        return res.status(400).json({message: 'Пользователь не найден'})
      }

      const isMatch = await bcrypt.compare(pass, user.pass);

      if (!isMatch) {
        return res.status(400).json({message: 'Некорректный пароль'})
      }

      const token = jwt.sign(
        {userId: user.id},
        config.get('jwtSecret'),
        {expiresIn: '1h'}
        );

      res.json({token, userId: user.id})

    } catch (e) {
      res.status(500).json({message: 'Что-то не так, попробуйте снова...'})
    }
  });

module.exports = router;