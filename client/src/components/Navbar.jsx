import React, {useContext} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/Auth.context";

const Navbar = () => {
  const history= useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = (e) => {
    e.preventDefault();
    auth.logout();
    history.push('/');
  };

  return (
    <nav>
      <div className="nav-wrapper nav-inner blue darken-2">
        <span className="brand-logo title-nav">Сокращение ссылок</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down nav-links">
          <li><NavLink to="/create">Создать</NavLink></li>
          <li><NavLink to="/links">Мои ссылки</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;