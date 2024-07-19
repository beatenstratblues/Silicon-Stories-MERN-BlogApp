import React, { useState } from "react";

const RegisterPage = () => {
  const [Username, setUsername] = useState("");
  const [password, setpassword] = useState("");

  async function register(ev) {
    ev.preventDefault();
    await fetch("http://localhost:8000/register", {
      method: "POST",
      body: JSON.stringify({ Username, password }),
      headers: { "Content-Type": "application/json" },
    });
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={Username}
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
