import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders title, author, likes', () => {
  const blog = {
    title: 'söpö',
    author: 'söpömpi',
    likes: 4
  }
  const component = render(
    <SimpleBlog blog={blog} onClick={blog.likes++} />
  )

  expect(component.container).toHaveTextContent(
    'söpö' && 'söpömpi' && 5
  )
})

it('like -button works, if pushed 2 times', async () => {
  const blog = {
    title: 'söpö',
    author: 'söpömpi',
    likes: 4
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
