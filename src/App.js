import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import  { useField } from './hooks'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message === 'Uusi blogi lisätty!' || message === 'Kirjauduttu ulos.') {
    return (
      <div className="update">
        {message}
      </div>
    )
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const username = useField('text')
  const password = useField('password')
  //const username = useField('text')


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

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    blogService.setToken(user.token)
    console.log('Mikä token käytössä: ', user.token, user.name)
    try {
      const returnedBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(returnedBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      hook()
      setErrorMessage(
        'Uusi blogi lisätty!'
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage('Blogin lisääminen epäonnistui! Täytä kaikki kentät.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    //console.log('Miksi ei onnistu blogin lisäys: ', blogObject)
  }

  const handleAuthor = (event) => {
    event.preventDefault()
    setNewAuthor(event.target.value)
  }

  const handleUrl = (event) => {
    event.preventDefault()
    setNewUrl(event.target.value)
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      //const user = await loginService.logout('')
      window.localStorage.clear()
      setUser(null)
      setErrorMessage('Kirjauduttu ulos.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    } catch (exception) {
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
        //username.value(''), password.value
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
      setErrorMessage('Käyttäjätunnus tai salasana virheellinen. Otappa joku toinen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('loggin in with', username)
  }

  const blogForm = () => {
    return (<div>
      {blogs
        .map(blog =>
          <Blog key={blog.id}
            blog={blog}
            setErrorMessage={setErrorMessage}
            setBlogs={setBlogs}
            blogs={blogs}
            user={user}
          />)}


    </div>

    )
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
            addBlog={addBlog}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            newAuthor={newAuthor}
            newUrl={newUrl}
            handleAuthor={handleAuthor}
            handleUrl={handleUrl} />
          <button className="newblog-button" onClick={() => setLoginVisible(false)}>Peruuta</button>
          <p> </p>
        </div>
      </div>
    )
  }

  return (
    <div>

      <h2>Blogs</h2>
      <Notification message={errorMessage} />
      {user === null ?
        <LoginForm
          handleLogin={handleLogin} password={password} username={username} /> :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>kirjaudu ulos</button>
          <p> </p>
          {newBlogForm()}
          {blogForm()}
        </div>
      }
    </div>

  )
}

export default App