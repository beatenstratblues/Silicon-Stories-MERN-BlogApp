import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:8000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userData) => {
        setUserInfo(userData?.username);
      });
    });
  }, [setUserInfo]);

  function logout() {
    fetch("http://localhost:8000/logout", {
      method: "POST",
      credentials: "include",
    });
    setUserInfo(null);
  }

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {userInfo ? (
          <>
            <Link to={"/create"}> Create New Post</Link>
            <Link onClick={logout}>Logout</Link>
          </>
        ) : (
          <>
            {" "}
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
