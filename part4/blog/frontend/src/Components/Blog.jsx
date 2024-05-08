import { useState } from "react"
// import TogglableDetails from "./TogglableDetails"

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
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
            likes {blog.likes} <button>like</button>

          </div>
          <div>{blog.user.name}</div>
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