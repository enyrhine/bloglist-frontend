import React from 'react'
import '../index.css'

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword, target }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <h3>Kirjaudu sisään, ole hyvä:</h3>
       käyttäjätunnus   
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />  
      </div>
      <div>
        salasana 
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <p> </p>
      <button type="submit">Kirjaudu</button>
    </form>
  )
}

export default LoginForm