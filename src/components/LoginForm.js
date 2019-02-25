import React from 'react'
import '../index.css'
import PropTypes from 'prop-types'
//import  { useField } from '../hooks'


const LoginForm = ({ handleLogin, username, password }) => {
  //const username = useField('text')
  //const password = useField('password')
  return (
    <form onSubmit={handleLogin}>
      <div>
        <h3>Kirjaudu sisään, ole hyvä:</h3>
        käyttäjätunnus <input
          type={username.type}
          value={username.value}
          name='Username'
          onChange={username.onChange}
          //({ target }) => setUsername(target.value)
        />
      </div>
      <div>
        salasana <input
          type={password.type}
          value={password.value}
          name="Password"
          onChange={password.onChange}
        />
      </div>
      <p> </p>
      <button type="submit">Kirjaudu</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  //username: PropTypes.string.isRequired,
  //password: PropTypes.string.isRequired,
  //setUsername: PropTypes.func.isRequired,
  //setPassword: PropTypes.func.isRequired
}

export default LoginForm