import { useState, useEffect, useRef } from 'react'
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
  const [errorMessage, setErrorMessage] = useState(null)
  const [notifTitle, setNotifTitle] = useState('')
  const [notifAuthor, setNotifAuthor] = useState('')
  const [isError, setIsError] = useState(false)
  const [user, setUser] = useState(null)
  // const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
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

  const logout = function() {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
    // setNewTitle('')
    // setNewAuthor('')
    // setNewUrl('')
    setErrorMessage(null)
    setIsError(false)
  }


  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    // const isNumberAlreadyAdded = persons.some(person => person.number === newPerson.number)


    // if (isNumberAlreadyAdded) {
    //   console.log(`${newPerson.number} is already added to phonebook`)
    //   alert(`${newPerson.number} is already added to phonebook`)
    //   return
    // }

    // const newPersons = persons.concat(newPerson)

    blogService.create(blogObject)
      .then(response => {
        console.log(response, 'response')
        console.log('added new blog')
        setBlogs(blogs.concat(response))
        // setNewTitle('')
        // setNewAuthor('')
        // setNewUrl('')
        setErrorMessage(
          `Added ${blogObject.name}`
        )
        setNotifTitle(blogObject.title)
        setNotifAuthor(blogObject.author)
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

  // parameter: adding in new object with one more like
  const addLike = (blogId) => {
    const blogToUpdate = blogs.find(blog => blog.id === blogId);
    if (!blogToUpdate) return;
  
    const updatedBlog = {
     ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    };

    console.log('updated blog:', updatedBlog)
  
    blogService.update(blogId, updatedBlog)
     .then(response => {
        console.log(response, 'response');
        console.log('updated blog with one more like');
        setBlogs(blogs.map(blog => blog.id === blogId? response : blog));
        setErrorMessage(`Added ${blogToUpdate.title}`);
        setNotifTitle(blogToUpdate.title);
        setNotifAuthor(blogToUpdate.author);
        setTimeout(() => {
          setNotifTitle('');
          setNotifAuthor('');
          setErrorMessage(null);
        }, 5000);
      })
     .catch(error => {
        setIsError(true);
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setIsError(false);
          setErrorMessage(null);
        }, 5000);
        console.log(error.response.data.error);
      });
  };


  // const sortBlogs = () => {
  //   setBlogs(blogs.sort())
  // }
      

  // const handleTitleChange = (event) => {
  //   console.log(event.target.value)
  //   setNewTitle(event.target.value)
  // }
  // const handleAuthorChange = (event) => {
  //   console.log(event.target.value)
  //   setNewAuthor(event.target.value)
  // }
    
  // const handleUrlChange = (event) => {
  //   console.log(event.target.value)
  //   setNewUrl(event.target.value)
  // }
  
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
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
    }

      <h2>blogs</h2>
      {/* <button onClick={sortBlogs}>Sort Blogs!</button> */}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={addLike}/>
      )}
    </div>
  )
}

export default App