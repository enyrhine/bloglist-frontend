import React, { useState, useEffect } from 'react'
//import { connect } from 'react-redux'
//import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import  { useField } from './hooks'
import Notification from './components/Notification'


const App = (props) => {
  const store = props.store
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const username = useField('text')
  const password = useField('password')
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')

  const hook = () => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => { return b.likes - a.likes }))
    )
  }

  useEffect(hook, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)

      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      //const user = await loginService.logout('')
      window.localStorage.clear()
      setUser(null)
      /* KORJAA TÄHÄN setErrorMessage('Kirjauduttu ulos.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)*/
    } catch (exception) {
      /* KORJAA TÄHÄN setTimeout(() => {
        setErrorMessage(null)
      }, 5000)*/
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      //console.log('Mikä token käytössä: ', user.token)
      setUser(user)
      //setUsername('')
      //username.setValue('')
      username.reset()
      //setPassword('')
      //password.value = ''
      password.reset()
    } catch (exception) {
      /* KORJAA TÄHÄN setErrorMessage('Käyttäjätunnus tai salasana virheellinen. Otappa joku toinen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)*/
    }
    console.log('loggin in with', username)
  }

  const newBlogForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Lisää uusi blogi</button>
          <p> </p>
        </div>
        <div style={showWhenVisible}>
          <NewBlog
            user= {user}
            setBlogs={setBlogs}
            blogs={blogs}
            newTitle={newTitle}
            newAuthor={newAuthor}
            newUrl={newUrl}
            hook={hook}
            store={store}
          />
          <button className="newblog-button" onClick={() => setLoginVisible(false)}>Peruuta</button>
          <p> </p>
        </div>
      </div>
    )
  }
  /* */

  return (
    <div>

      <h2>Blogs</h2>
      <Notification />
      {user === null ?
        <LoginForm
          handleLogin={handleLogin} password={password} username={username} /> :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>kirjaudu ulos</button>
          <p> </p>
          {newBlogForm()}
          <BlogForm blogs={blogs} setBlogs={setBlogs} store={store} user={user} />
        </div>
      }
    </div>

  )
}

export default App