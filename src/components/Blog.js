import React, { useState } from 'react'
import '../index.css'
import blogService from '../services/blogs'


const Blog = ({ blog, setErrorMessage, setBlogs, blogs }) => {

  const [visible, setVisible] = useState(false)

  const updateLikes = async () => {

    const changedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: (blog.likes + 1)
    }

    try {
      console.log('mitä hempskattia')
      const returnedBlog = await blogService.update(blog.id, changedBlog)
      setBlogs(blogs.map(oneBlog => oneBlog.id !== blog.id ? oneBlog : returnedBlog).sort((a,b) => {return b.likes - a.likes}))
      
    } catch (exception) {
      setErrorMessage('Likettäminen epäonnistui...')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className="Blog">
      <div onClick={() => setVisible(!visible)}>
        {visible ? `${blog.title} ` : `
     ${blog.title} `}
        {blog.author}
      </div>
      {visible &&
        <div>
          <a href={blog.url}>{blog.url}</a> <br />
          {blog.likes} likes
      <button className="like" onClick={updateLikes}>Like</button> <br />
          {blog.user && (`Blogin lisännyt: ${blog.user.name}`)}
        </div>}

    </div>
   
  )
}

export default Blog