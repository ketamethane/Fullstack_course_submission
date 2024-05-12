/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

// test('renders content', () => {
//   const blog = {
//     title: 'bbbb',
//     author: 'creepy peanuts',
//     url: 'www.mashle.com',
//     user: {
//       name: 'testname'
//     }
//   }

//   const { container }= render(<Blog blog={blog} currentUser={'testname'}/>)

//   const element = screen.getByText(`${blog.title} ${blog.author}`)
//   screen.debug(element)
//   expect(element).toBeDefined()

//   const urlElement = screen.queryByText(blog.url)
//   expect(urlElement).not.toBeInTheDocument()

//   const likesElement = screen.queryByText(`likes ${blog.likes}`)
//   expect(likesElement).not.toBeInTheDocument()

//   // const div = container.querySelector('.blog')
//   // expect(div).toHaveTextContent(
//   //   `${blog.title} ${blog.author}`
//   // )

//   // // Render the Blog component directly
//   // render(<Blog blog={blog} currentUser={'testname'} />)

//   // // Use a more specific query, such as getByTestId or getByRole
//   // // Ensure your Blog component has a unique testID or role
//   // const element = screen.getByTestId('unique-blog-title')
//   // expect(element).toBeDefined()

//   // screen.debug()
// })

// test('check blog url and number of likes', async () => {
//   const blog = {
//     title: 'bbbb',
//     author: 'creepy peanuts',
//     url: 'www.mashle.com',
//     user: {
//       name: 'testname'
//     },
//     likes: 0
//   }

//   const mockHandler = vi.fn()

//   render(
//     <Blog blog={blog} currentUser={'testname'} toggleDetails={mockHandler}/>
//   )

//   const user = userEvent.setup()
//   const button = screen.getByText('Show Details')
//   await user.click(button)

//   // Check if the URL is now visible
//   const urlElement = screen.getByText(blog.url)
//   expect(urlElement).toBeInTheDocument()

//   // Check if the likes are now visible
//   const likesElement = screen.getByText(`likes ${blog.likes}`)
//   expect(likesElement).toBeInTheDocument()

//   // you can't mock an internal function. BUT you can mock the state change as
//   // a result of this function
//   // expect(mockHandler.mock.calls).toHaveLength(1)
// })

test('liking blog twice', async () => {
  const blog = {
    title: 'bbbb',
    author: 'creepy peanuts',
    url: 'www.mashle.com',
    user: {
      name: 'testname'
    },
    likes: 0
  }

  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} currentUser={'testname'} handleLike={mockHandler}/>
  )

  const user = userEvent.setup()
  const button = screen.getByText('Show Details')
  await user.click(button)

  // Check if the likes are now visible
  const likesElementBefore = screen.getByText(`likes ${blog.likes}`)
  expect(likesElementBefore).toBeInTheDocument()

  const likeButton = screen.getByText('like')
  for (var i=0; i < 2 ;i++) {
    await user.click(likeButton)
  }

  // const likesElementAfter = screen.getByText(`likes ${blog.likes + 2}`, { exact: false })
  // expect(likesElementAfter).toBeInTheDocument()

  expect(mockHandler.mock.calls).toHaveLength(2)

})