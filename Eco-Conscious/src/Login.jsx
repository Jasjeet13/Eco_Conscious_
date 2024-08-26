import React from 'react';

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form action="http://localhost:3000/login" method="POST">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required /> <br /> <br />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required /> <br /> <br />

        <button type="submit">Login</button>
      </form>

      <br />
      <a href="/forgot-password">Forgot Password?</a>
    </div>
  );
}

export default Login;
