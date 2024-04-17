const Blog = require('../models/blog')
const User =require('../models/user')

const initialBlogs = [
  {
    title: 'Bling Bang Bang Born',
    author: 'Creepy Peanuts',
    url: 'www.mashle.com',
    likes: 100
  },
  {
    title: 'Rap God',
    author: 'Em',
    url: 'www.Em.com',
    likes: 10
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}