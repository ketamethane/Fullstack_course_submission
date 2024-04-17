const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  // const user = await User.findById(body.userId)

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url is missing' })
  }


  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    id: body.id,
    user: user._id    // note that I changed .id to ._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  // Check if the request body contains the 'likes' property
  if (!body.likes) {
    return response.status(400).json({ error: 'likes value is missing' })
  }

  // Update the blog post with the new likes value
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes: body.likes }, { new: true })

  if (!updatedBlog) {
    return response.status(404).json({ error: 'Blog post not found' })
  }

  response.json(updatedBlog)
})

module.exports = blogsRouter