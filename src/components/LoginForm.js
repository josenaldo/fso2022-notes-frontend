import React from 'react'
import PropTypes from 'prop-types'

/**
 * Component that displays a login form for the user to input their username and password.
 *
 * @component
 *
 * @param {Object} props - The component props.
 * @param {function} props.handleLogin - The function to handle login form submission.
 *
 * @returns {JSX.Element} - The rendered login form element.
 *
 * @example
 * import React from 'react';
 * import LoginForm from './LoginForm';
 *
 * const handleLogin = (credentials) => {
 *   // handle user login
 * }
 *
 * const App = () => {
 *   return (
 *     <div>
 *       <LoginForm handleLogin={handleLogin} />
 *     </div>
 *   );
 * };
 *
 * export default App;
 */
const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const login = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={login}>
        <div className="grid">
          <label>
            Username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
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
}

export default LoginForm
