import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    if (newTitle === '') {
      alert('Please enter a title')
      return
    }

    if (newAuthor === '') {
      alert('Please enter an author')
      return
    }

    if (newUrl === '') {
      alert('Please enter a url')
      return
    }

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title: <input value={newTitle}
          onChange={event => setNewTitle(event.target.value)}
          placeholder='Write your title here'
          id='title-input'
        />
      </div>
      <div>
      author: <input value={newAuthor}
          onChange={event => setNewAuthor(event.target.value)}
          placeholder='Write your author name here'
          id='author-input'
        />
      </div>
      <div>
        url: <input value={newUrl}
          onChange={event => setNewUrl(event.target.value)}
          placeholder='Write your blog url here'
          id='url-input'
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default BlogForm