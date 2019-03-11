import React, { useState } from 'react'
import '../index.css'
import blogService from '../services/blogs'
import { createNotification } from '../reducers/notificationReducer'
//import { connect } from 'react-redux'

const Blog = ({ blog, setBlogs, blogs, user, store }) => {
  const [visible, setVisible] = useState(false)
  const updateLikes = async () => {

    const changedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      console.log('mitä hempskattia')
      const returnedBlog = await blogService.update(changedBlog)
      setBlogs(blogs.map(oneBlog => oneBlog.id !== blog.id ? oneBlog : returnedBlog).sort((a, b) => { return b.likes - a.likes }))

    } catch (exception) {
      store.dispatch(createNotification('Likettäminen epäonnistui...', 3))
    }
  }

  const deleteBlog = async (event) => {
    event.preventDefault()
    const id = event.target.value
    blogService.setToken(user.token)

    const blogNimi = blogs.find(idBlog => { return '' + idBlog.id === id })
    const saakoPoistaa = window.confirm(`Saako poistaa ${blogNimi.title}?`)
    try {
      if (saakoPoistaa) {
        await blogService.deleteBlog(id)
        setBlogs(blogs.filter(b => (b.id !== id) && b).sort((a, b) => { return b.likes - a.likes }))
        store.dispatch(createNotification('Tiedot poistettu onnistuneesti!', 3))
      }
    } catch (exception) {
      store.dispatch(createNotification('Poistaminen epäonnistui..', 3))
    }
  }

  return (
    <div className="Blog">
      <div onClick={() => setVisible(!visible)}>
        {visible ? `${blog.title} ` : `
     ${ blog.title} `}
        {blog.author}
      </div>
      {visible &&
        <div>
          <a href={blog.url}>{blog.url}</a> <br />
          {blog.likes} likes
          <button className="like" onClick={updateLikes}>Like</button> <br />
          {blog.user && (`Blogin lisännyt: ${blog.user.name}`)}
          {user.name === (blog.user && blog.user.name) ?
            <button value={blog.id} onClick={deleteBlog}>Poista</button> : ''}
        </div>}
    </div>
  )
}

/*const mapDispatchToProps = {
  createNotification
}

export default connect(
  mapDispatchToProps
)(Blog)*/

export default Blog