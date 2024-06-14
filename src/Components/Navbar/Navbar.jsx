import "./Navbar.css";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

export const Navbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [nav, setnav] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const { user } = useSelector((state) => state.auth);
    
  const changeBackgorund = () => {
    if (window.scrollY >= 50) {
      setnav(true);
    } else {
      setnav(false);
    }
  };


  // Logout Function
  const logoutHandler = () => {
    setDropdown(false);
    dispatch(logoutUser());
    navigate("/");
  };

  window.addEventListener("scroll", changeBackgorund);

  

  return (
    <nav className={nav ? "nav active" : "nav"}>
      <Link to="/" className="title">
        BVS
      </Link>

      <label className="menu-icon"></label>
      <span className="nav-icon"></span>

      <ul>
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
            <li>
              <Link to="/addpatient"> Add Patient </Link>
            </li>
            <div className="user-info">
              <li>
                <Link
                  className="username"
                  onClick={() => setDropdown((prev) => !prev)}
                >
                  {user?.UserName}
                  <img src={user?.ProfilePhoto?.url} alt="user" />
                </Link>
              </li>

              {dropdown && (
                <div className="dropdown">
                  <Link
                    to={`/profile/${user?._id}`}
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
      </ul>
    </nav>
  );
};
