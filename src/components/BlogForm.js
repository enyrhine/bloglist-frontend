import React from 'react'
import '../index.css'
import Blog from './Blog'

const BlogForm = ({ blogs, setBlogs, store, user }) => {
  return (<div>
    {blogs
      .map(blog =>
        <Blog key={blog.id}
          blog={blog}
          setBlogs={setBlogs}
          blogs={blogs}
          user={user}
          store={store}
        />)}
  </div>

  )
}

export default BlogForm