import { useState, useEffect } from "react"
import blogService from '../services/blogs'
// import TogglableDetails from "./TogglableDetails"

const Blog = ({ blog, handleLike }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [user, setUser] = useState(blog.user.name)
  
  // useEffect(() => {
  //   blogService.getAll().then(blogs =>
  //     setBlogs( blogs )
  //   )  
  // }, [])

  const hideWhenVisible = { 
    display: detailsVisible ? 'none' : '',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showWhenVisible = { 
    display: detailsVisible ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // how to extract the service component out when I need to immediately reflect it in FE?
  const addLike = () => {
    handleLike(blog.id)
    setUser(blog.user.name)
  }
    



  // use blogService.update() to give the like functionality
  // put to the Blog's id that is the endpoint

  return (
    <div>
        <div style={hideWhenVisible}>
        {blog.title} {blog.author} 
          <button onClick={() => setDetailsVisible(true)}>show</button>
        </div>
        <div style={showWhenVisible}>
          {blog.title} {blog.author}
          <button onClick={() => setDetailsVisible(false)}>hide</button>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={() => addLike()}>like</button>

          </div>
          <div>{user}</div>
        </div>
      </div>
    // <div style={blogStyle}>
    //   <div>
    //     <span>{blog.title}</span> <span>{blog.author}</span>
    //     <TogglableDetails buttonLabel="view" ref={blogDetailsRef}>
          // <div>{blog.url}</div>
          // <div>likes {blog.likes}</div>
          // <div>{blog.user.name}</div>
    //     </TogglableDetails>
    //   </div>
    // </div>
  )
}

export default Blog