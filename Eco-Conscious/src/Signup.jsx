import React from 'react'

function Signup() {
  return (
    <div>
        <h1>Signup</h1>
        <form action="http://localhost:3000/signup" method="POST">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" required />  <br /> <br />

            <label for="fullname">Full Name</label>
            <input type="text" id="fullname" name="fullname" required /> <br /> <br />

            <label for="email">Email</label>
            <input type="email" id="email" name="email" required /> <br /> <br />

            <label for="password">Password</label>
            <input type="password" id="password" name="password" required /> <br /> <br />

            <label for="confirmPassword">Re-enter Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required /> <br /> <br />

            <label for="address">Address</label>
            <input type="text" id="address" name="address" required />  <br /> <br />

            <label for="phoneNumber">Phone Number</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" required /> <br /> <br />

            <button type="submit">Sign Up</button>
        </form>
    </div>
  )
}

export default Signup