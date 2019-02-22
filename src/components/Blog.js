import React, { useState } from 'react'
import '../index.css'


const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false)

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
      <button className="like">Like</button> <br />
          {blog.user && (`Blogin lisännyt: ${blog.user.name}`)}
        </div>}

    </div>
  )
}

export default Blog