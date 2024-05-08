import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  
  const addBlog = (event) => {
    event.preventDefault()

    if (newTitle === '') {
      alert(`Please enter a title`)
      return
    }

    if (newAuthor === '') {
      alert(`Please enter an author`)
      return
    }

    if (newUrl === '') {
      alert(`Please enter a url`)
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
        />
      </div>
      <div>
      author: <input value={newAuthor}
        onChange={event => setNewAuthor(event.target.value)}
        />
      </div>
      <div>
        url: <input value={newUrl}
        onChange={event => setNewUrl(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default BlogForm


// const PersonForm = ({onSubmit, title, titleHandle, author, authorHandle}) => {
//     return (
//         <form onSubmit={onSubmit}>
//         <div>
//           title: <input value={title}
//           onChange={titleHandle}
//           />
//         </div>
//         <div>
//         authorber: <input value={author}
//           onChange={authorHandle}
//           />
//         </div>
//         <div>
//           <button type="submit">add</button>
//         </div>
//       </form>
//     )
// }

// export default PersonForm