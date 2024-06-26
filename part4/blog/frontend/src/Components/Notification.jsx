const Notification = ({ message, title, author, isError }) => {

  if (isError === true) {
    const errorMsg = {
      color: 'red',
      backgroundColor: 'lightred',
      fontSize: 20,
      padding: 40,
    }
    return (
      <div style={errorMsg}>
        {message}
      </div>
    )

  }

  const addMsg = {
    color: 'green',
    fontSize: 16
  }
  if (message === null) {
    return null
  }

  return (
    <div style={addMsg}>
      A new blog {title} by {author} is added!
    </div>
  )
}


export default Notification