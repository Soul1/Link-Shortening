const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
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

router.post('/login', async (req, res) => {
  try {

  } catch (e) {

  }
});

module.exports = router;