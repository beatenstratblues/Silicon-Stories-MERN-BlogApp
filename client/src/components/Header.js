import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userData) => {
        setUsername(userData?.username);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:8000/logout",{
      method:'POST',
      credentials:"include",
    })
    setUsername("");
  }

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username ? (
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
