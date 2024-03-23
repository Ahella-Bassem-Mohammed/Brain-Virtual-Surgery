import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

export const Navbar = () => {
  const [nav, setnav] = useState(false);
  const changeBackgorund = () => {
    if (window.scrollY >= 50) {
      setnav(true);
    } else {
      setnav(false);
    }
  };
  const logoutHandler = () => {
    setDropdown(false);
    dispatch(logoutUser());
  };
  window.addEventListener("scroll", changeBackgorund);

  const { user } = useSelector((state) => state.auth);
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();

  return (
    <nav className={nav ? "nav active" : "nav"}>
      <Link to="/" className="title">
        Virtual Surgery
      </Link>

      <label className="menu-icon" htmlFor="menu-btn"></label>
      <span className="nav-icon"></span>

      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/services">Features</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
      {user ? (
        <>
          <div className="user-info">
            <li>
              <Link
                className="username"
                onClick={() => setDropdown((prev) => !prev)}
              >
                {user?.UserName}
                {/*<img src={user?.ProfilePhoto.url} alt="user photo"/>*/}
              </Link>
            </li>
            {dropdown && (
              <div className="dropdown">
                <Link
                  to="/profile" /////////////// undo comment for the below line when finishing linking profile with id
                  /*to={`/profile/${user?._id}`}*/
                  className="dropdown-item"
                  onClick={() => setDropdown(false)}
                >
                  <i className="bi bi-file-person"></i>
                  <span>Profile</span>
                </Link>
                <div className="dropdown-item">
                  <i className="bi bi-box-arrow-in-left"></i>
                  <Link onClick={logoutHandler}>Logout </Link>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {" "}
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </>
      )}
    </nav>
  );
};
