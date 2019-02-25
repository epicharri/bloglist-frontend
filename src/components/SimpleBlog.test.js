import React from 'react'
import 'jest-dom/extend-expect'
import {
  render,
  cleanup
} from 'react-testing-library'
import SimpleBlog from './SimpleBlog'
import { fireEvent } from 'react-testing-library'
//import { isMainThread } from 'worker_threads'
//import { isMainThread } from 'worker_threads'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Testititle',
    author: 'Testiauthor',
    url: 'testiurl',
    likes: 1
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(
    component.container
  ).toHaveTextContent(
    'blog has 1 likes',
    'Testititle Testiauthor'
  )
})

it('Kokeillaan nyt tätä klikkaa kaksi kertaa testiä', async () => {
  const blog = {
    title: 'Testititle',
    author: 'Testiauthor',
    url: 'testiurl',
    likes: 0
  }

  const mockHandler = jest.fn()

  const  { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)

})