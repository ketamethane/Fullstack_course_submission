import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notifTitle, setNotifTitle] = useState('')
  const [notifAuthor, setNotifAuthor] = useState('')
  const [isError, setIsError] = useState(false)
  const [user, setUser] = useState(null)
  // const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // create add blog feature. login already done
  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('user token:', user.token)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setIsError(true)
      setTimeout(() => {
        setIsError(false)
        setErrorMessage(null)
      }, 5000)
    }
  }
  const loginForm = () => {
    // const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    // const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  // const loginForm = () => (
  //   <form onSubmit={handleLogin}>
  //     <div>
  //       username
  //         <input
  //         type="text"
  //         value={username}
  //         name="Username"
  //         onChange={({ target }) => setUsername(target.value)}
  //       />
  //     </div>
  //     <div>
  //       password
  //         <input
  //         type="password"
  //         value={password}
  //         name="Password"
  //         onChange={({ target }) => setPassword(target.value)}
  //       />
  //     </div>
  //     <button type="submit">login</button>
  //   </form>      
  // )

  // const noteForm = () => (
  //   <div></div>
  //   // <form onSubmit={addNote}>
  //   //   <input
  //   //     value={newNote}
  //   //     onChange={handleNoteChange}
  //   //   />
  //   //   <button type="submit">save</button>
  //   // </form>  
  // )

  const logout = function() {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setErrorMessage(null)
    setIsError(false)
  }


  const addBlog = (event) => {
    event.preventDefault()
    console.log('Add Blog', event.target)

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    // console.log('new person id after', newPerson.id)

    // const isPersonAlreadyAdded = persons.some(person => person.name === newPerson.name)

    // if (isPersonAlreadyAdded) {
    //   if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        
    //     // make a shallow copy of the person to update with that person's id, then update accordingly
    //     const addedPerson = persons.find(person => person.name === newPerson.name)
    //     const changedPerson = { ...addedPerson, number: newNum}
    //     console.log('changed person:', changedPerson)
    //     console.log('changed person id: ', changedPerson.id)
    //     personService.update(changedPerson.id, changedPerson)
    //     .then(response => {
    //       console.log('added person:',response)
    //       setPersons(persons.map(p => p.id !== changedPerson.id ? p : response))
    //       setNewName('')
    //       setNewNum('')
    //       setMessage(
    //         `Changed ${newPerson.name}'s number to ${newPerson.number}`
    //       )
    //       setTimeout(() => {
    //         setMessage(null)
    //       }, 5000)
    //     }
    //     )
    //     .catch(error => {
    //       console.log('error:', error)
    //       setIsError(true)
    //       setMessage(
    //         `Information of ${newPerson.name} has already been removed from server`
    //       )
    //       setTimeout(() => {
    //         setMessage(null)
    //         setIsError(false)
    //       }, 5000)
    //     }
    //     )
    //     return

    //   }
    //   // console.log(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)
    //   // alert(`${newPerson.name} is already added to phonebook`)
    //   // return
    // }

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

    // const isNumberAlreadyAdded = persons.some(person => person.number === newPerson.number)


    // if (isNumberAlreadyAdded) {
    //   console.log(`${newPerson.number} is already added to phonebook`)
    //   alert(`${newPerson.number} is already added to phonebook`)
    //   return
    // }

    // const newPersons = persons.concat(newPerson)

    blogService.create(newBlog)
      .then(response => {
        console.log(response, 'response')
        console.log('added new blog')
        setBlogs(blogs.concat(response))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setErrorMessage(
          `Added ${newBlog.name}`
        )
        setNotifTitle(newTitle)
        setNotifAuthor(newAuthor)
        setTimeout(() => {
          setNotifTitle('')
          setNotifAuthor('')
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        setIsError(true)
        setErrorMessage(
            error.response.data.error
          )
          setTimeout(() => {
            setIsError(false)
            setErrorMessage(null)
          }, 5000)
        console.log(error.response.data.error)
      })
  }
      

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }
    
  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setNewUrl(event.target.value)
  }

  return (
    <div>
      <h1>log in to application</h1>
      <Notification message={errorMessage} title={notifTitle} author={notifAuthor} isError={isError}/>

      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged-in
        <button onClick={logout}>Logout</button>
        </p>
        <Togglable buttonLabel="new note">
          <BlogForm onSubmit={addBlog} title={newTitle} titleHandle={handleTitleChange}
        author={newAuthor} authorHandle={handleAuthorChange} url={newUrl} urlHandle={handleUrlChange} />
        </Togglable>
      </div>
    }

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App