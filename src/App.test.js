import React from 'react'
import {
  render, waitForElement
} from 'react-testing-library'
jest.mock('./services/blogs')
jest.mock('./services/user')
import App from './App'

describe('<App />', () => {
  it('if no user logged, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Kirjaudu sisään, ole hyvä:')
    )

    expect(component.container).toHaveTextContent(
      'käyttäjätunnus' && 'salasana'
    )
  })
})

describe('user logged and blogs will show', async () => {
  const component = render (
    <App />
  )
  component.render(<App />)
  await waitForElement(
    () => component.container.querySelector('.Blog')
  )

  const blogs = component.container.querySelectorAll('.Blog')
  expect(blogs.length).toBe(2)

})