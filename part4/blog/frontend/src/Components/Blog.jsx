import { useState, useEffect } from 'react'
// import TogglableDetails from "./TogglableDetails"

const Blog = ({ blog, handleLike, currentUser, deleteHandle }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [user, setUser] = useState(blog.user.name)


  // how do i best handle loading the user/creator of blog after liking it?
  // setting state?

  // how do I show the user and remove button after directly adding a blog?
  // surely having blogs as a dependency in the useEffect hook in App is not the way to go?
  // or else, how would I modify it without refreshing the page?

  // useEffect(() => {
  //     setUser(blog.user.name)
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

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteHandle(blog.id) // Call the delete function
    }
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
        {currentUser && currentUser.username === blog.user.username && (
          <button onClick={handleDelete}>Delete</button>
        )}
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