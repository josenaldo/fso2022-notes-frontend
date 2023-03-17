import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div className="grid">
          <label>
            Username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={handleUsernameChange}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <div className="grid">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
