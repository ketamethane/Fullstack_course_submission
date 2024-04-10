
const _ = require('lodash')
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


const mostBlogs = (blogs) => {
  const groupedBlogs = _.groupBy(blogs, 'author')

  const topAuthor = _.maxBy(Object.keys(groupedBlogs), (author) => groupedBlogs[author].length)

  return {
    author: topAuthor,
    blogs: groupedBlogs[topAuthor].length
  }
}

const mostLikes = (blogs) => {
  const groupedBlogs = _.groupBy(blogs, 'author')

  const authorLikes = _.mapValues(groupedBlogs, (blogs) => _.sumBy(blogs, 'likes'))

  const topAuthor = _.maxBy(_.entries(authorLikes), ([, likes]) => likes)

  return {
    author: topAuthor[0],
    likes: topAuthor[1]
  }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}