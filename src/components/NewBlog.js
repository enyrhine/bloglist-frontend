import React from 'react'
import '../index.css'

const NewBlog = ({ addBlog, newTitle, newAuthor, newUrl }) => {

  return (
    <div className="newblog"><h2>Uusi blogi</h2>
      <form onSubmit={addBlog}>
        <div>
          Title: <input className="input-blog"
            type={newTitle.type}
            value={newTitle.value}
            name={'Title'}
            onChange={newTitle.onChange} />

        </div>
        <div>
          Author: <input className="input-blog"
            type={newAuthor.type}
            value={newAuthor.value}
            onChange={newAuthor.onChange} />
        </div>
        <div>
          url: <input className="input-blog"
            type={newUrl.type}
            value={newUrl.value}
            onChange={newUrl.onChange} />
        </div>
        <div>
          <button type="submit">Lisää</button>
          <p> </p>
        </div>
      </form></div>

  )
}

export default NewBlog