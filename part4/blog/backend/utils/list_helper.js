const dummy = (blogs) => {
  return 1
}

const totalLikes = array => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return array.length === 0
    ? 0
    : array.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((maxBlog, currentBlog) => {
    return (maxBlog.likes > currentBlog.likes) ? maxBlog : currentBlog
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}