import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  // const inputs = screen.getAllByRole('textbox')

  // const input = screen.getByRole('textbox')
  const sendButton = screen.getByText('add')

  const inputTitle = screen.getByPlaceholderText('Write your title here')
  const inputAuthor = screen.getByPlaceholderText('Write your author name here')
  const inputUrl = screen.getByPlaceholderText('Write your blog url here')

  // userEvent.type(inputTitle, 'test-title')
  // userEvent.type(inputAuthor, 'test-author')
  // userEvent.type(inputUrl, 'test-url')
  await user.type(inputTitle, 'test-title')
  await user.type(inputAuthor, 'test-author')
  await user.type(inputUrl, 'test-url')

  await user.click(sendButton)
  // userEvent.click(sendButton)

  console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test-title')
  expect(createBlog.mock.calls[0][0].author).toBe('test-author')
  expect(createBlog.mock.calls[0][0].url).toBe('test-url')
})