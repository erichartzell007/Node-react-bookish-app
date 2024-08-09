import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { LoginSliceActions } from "../../../features/Login/LoginSlice";
import { useNavigate } from "react-router-dom";
const Navigation = () => {
  const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(LoginSliceActions.logout());
    navigate({ to: "/login" }, { replace: true });
  };

  return (
    <header className="main-header">
      <div>
        <Link to="/" className="main-header__brand">
          <img
            src="https://banner2.cleanpng.com/20190505/tki/kisspng-vector-graphics-book-stock-illustration-logo-research-vector-book-transparent-amp-png-clipart-5cce8c43c04ea6.1155603815570401957877.jpg"
            alt="Logo"
          ></img>
        </Link>
      </div>
      <nav className="main-nav">
        <ul className="main-nav__items">
          {user.role === "admin" || user.role === "author" ? (
            <li className="main-nav__item">
              <Link to="/addBook">Add Book</Link>
            </li>
          ) : null}
          {/* 
          <li className="main-nav__item">
            <Link to="/login">Login</Link>
          </li> */}
          <li className="main-nav__item">
            <Link to="/">Explore!</Link>
          </li>
          {user.token ? (
            <li
              className="main-nav__item main-nav__item--cta"
              onClick={handleLogout}
            >
              Logout
            </li>
          ) : (
            <li className="main-nav__item main-nav__item--cta">
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
