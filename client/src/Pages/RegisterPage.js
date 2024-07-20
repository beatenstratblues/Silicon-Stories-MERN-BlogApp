import React, { useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");

  async function register(ev) {
    ev.preventDefault();
    await fetch("http://localhost:8000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    }).then((Response) => {
      if (!Response.ok) {
        alert("Username or Password wrong!!! :(");
      } else {
        alert("Registration Successful!!! :)");
      }
    });
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setpassword(e.target.value);
        }}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
