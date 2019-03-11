import React from 'react'
import '../index.css'
import blogService from '../services/blogs'
import { createNotification } from '../reducers/notificationReducer'
//import { connect } from 'react-redux'

const NewBlog = ( props ) => {
  const store = props.store
  const { user, setBlogs, blogs, newTitle, newAuthor, newUrl, hook } = props

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value
    }
    blogService.setToken(user.token)
    console.log('Mikä token käytössä: ', user.token, user.name)
    try {
      const returnedBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(returnedBlog))
      newAuthor.reset()
      newTitle.reset()
      newUrl.reset()
      hook()
      store.dispatch(createNotification('Uusi blogi lisätty!', 5))
    } catch (exception) {
      store.dispatch(createNotification('Blogin lisääminen epäonnistui! Täytä kaikki kentät.', 5)
      )}
  }

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

/*const mapDispatchToProps = {
  createNotification
}

export default connect(
  mapDispatchToProps
)(NewBlog)*/

export default NewBlog