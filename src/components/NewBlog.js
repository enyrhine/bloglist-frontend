import React from 'react'
import '../index.css'

const NewBlog = ({ addBlog, newTitle, setNewTitle, newAuthor, handleAuthor, newUrl, handleUrl }) => {

  return (
    <div className="newblog"><h2>Uusi blogi</h2>
      <form onSubmit={addBlog}>
        <div>
          Title: <input className="input-blog"
            value={newTitle}
            name={'Title'}
            onChange={({ target }) => setNewTitle(target.value)} />

        </div>
        <div>
          Author: <input className="input-blog"
            value={newAuthor}
            onChange={handleAuthor} />
        </div>
        <div>
          url: <input className="input-blog"
            value={newUrl}
            onChange={handleUrl} />
        </div>
        <div>
          <button type="submit">Lisää</button>
          <p> </p>
        </div>
      </form></div>

  )
}

export default NewBlog