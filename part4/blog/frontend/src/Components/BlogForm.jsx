const BlogForm = ({onSubmit, title, titleHandle, author, authorHandle, url, urlHandle}) => {
  return (
      <form onSubmit={onSubmit}>
      <div>
        title: <input value={title}
        onChange={titleHandle}
        />
      </div>
      <div>
      author: <input value={author}
        onChange={authorHandle}
        />
      </div>
      <div>
        url: <input value={url}
        onChange={urlHandle}
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