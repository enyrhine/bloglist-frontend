import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import Blog from './Blog'
import App from '../App'

afterEach(cleanup)

test('renders title and author', () => {
  const blog = {
    title: 'söpö',
    author: 'söpömpi',
    url: 'https://www.fi',
    likes: 4
  }


  const component = render(
    <Blog key={blog.id}
      blog={blog}
      setErrorMessage={App.setErrorMessage}
      setBlogs={App.setBlogs}
      blogs={App.blogs}
      user={App.user}/>
  )

  expect(component.container).toHaveTextContent(
    'söpö' && 'söpömpi'
  )
})

it('Title pushed, more info appears', async () => {
  const blog = {
    title: 'söpö',
    author: 'söpömpi',
    url: 'https://www.fi',
    likes: 4
  }

  const { getByText } = render(
    <Blog key={blog.id}
      blog={blog}
      setErrorMessage={App.setErrorMessage}
      setBlogs={App.setBlogs}
      blogs={App.blogs}
      user={App.user}/>
  )

  const button = getByText('söpö')
  fireEvent.click(button)

  expect(getByText.container).toHaveTextContent(
    'söpö' && 'söpömpi' && 'https://www.fi' && 4
  )
})