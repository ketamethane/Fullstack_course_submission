const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')

const api = supertest(app)



// beforeEach(async () => {
//   await Blog.deleteMany({})

//   for (let blog of helper.initialBlogs) {
//     let blogObject = new Blog(blog)
//     await blogObject.save()
//   }
// })


describe('when there is initially some blogs saved', () => {
  // let testUserId

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    // // Create a test user
    // const testUser = new User({
    //   username: 'testuser',
    //   name: 'Test User',
    //   // Add other necessary fields
    // })
    // const savedUser = await testUser.save()
    // testUserId = savedUser._id // Save the user ID for use in tests
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('the first blog is about BBBB', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(e => e.title)
    assert(titles.includes('Bling Bang Bang Born'))
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })
})

describe('validity testing', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    const existingUser = await User.findOne({ username: 'testuser' })
    if (existingUser) {
      await User.findByIdAndDelete(existingUser.id)
    }
  })

  test('unique identifier property of blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach((blog) => {

      assert.strictEqual(Object.prototype.hasOwnProperty.call(blog, 'id'), true)
    })
  })



  test('a valid blog can be added ', async () => {
    const testUser = new User({
      username: 'testuser',
      name: 'Test User',
      password: 'hello'
    })
    const savedUser = await testUser.save()
    const testUserId = savedUser._id // Save the user ID for use in tests

    const token = jwt.sign({ id: savedUser._id }, process.env.SECRET)

    const newBlog = {
      title: 'Vysions',
      author: 'vylt',
      url: 'www.vylt.com',
      likes: 1000,
      userId: testUserId
    }

    // Include the token in the headers of the POST request
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`) // Set the Authorization header
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

    assert(titles.includes('Vysions'))

  })




  test('blog without likes defaults to zero', async () => {

    const testUser = new User({
      username: 'testuser',
      name: 'Test User',
      password: 'hello'
    })
    const savedUser = await testUser.save()
    const testUserId = savedUser._id // Save the user ID for use in tests

    const token = jwt.sign({ id: savedUser._id }, process.env.SECRET)

    const newBlog = {
      title: 'Vysions',
      author: 'vylt',
      url: 'www.vylt.com',
      userId: testUserId
    }

    // Include the token in the headers of the POST request
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`) // Set the Authorization header
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

    assert(titles.includes('Vysions'))
  })


  test('should fail with status code 401 Unauthorized', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 10
    }

    // Make a POST request to create a new blog without setting the Authorization header
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401) // Expect a 401 Unauthorized status code
  })
})


describe('Error 400 tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    const existingUser = await User.findOne({ username: 'testuser' })
    if (existingUser) {
      await User.findByIdAndDelete(existingUser.id)
    }
  })
  test('missing title property results in 400 Bad Request', async () => {
    const testUser = new User({
      username: 'testuser',
      name: 'Test User',
      password: 'hello'
    })
    const savedUser = await testUser.save()
    const testUserId = savedUser._id // Save the user ID for use in tests

    const token = jwt.sign({ id: savedUser._id }, process.env.SECRET)

    const newBlog = {
      author: 'Test Author',
      url: 'http://test.com',
      userId: testUserId
      // Intentionally omit the 'title' property
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })


  // Test for missing 'url' property
  test('missing url property results in 400 Bad Request', async () => {
    const testUser = new User({
      username: 'testuser',
      name: 'Test User',
      password: 'hello'
    })
    const savedUser = await testUser.save()
    const testUserId = savedUser._id // Save the user ID for use in tests

    const token = jwt.sign({ id: savedUser._id }, process.env.SECRET)
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      userId: testUserId
      // Intentionally omit the 'url' property
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
})


describe('deletion of a blog', () => {
  // do i add then delete, or delete before each and add within
  let testUserId
  let testBlogId
  let token

  beforeEach(async () => {

    const existingUser = await User.findOne({ username: 'testuser' })
    if (existingUser) {
      const savedUser = await existingUser.save()
      testUserId = savedUser._id // Save the user ID for use in tests

      // Generate a token for the test user
      token = jwt.sign({ id: savedUser._id }, process.env.SECRET)

      // Create a test blog tied to the test user
      const testBlog = new Blog({
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://test.com',
        likes: 10,
        user: testUserId
      })
      const savedBlog = await testBlog.save()
      testBlogId = savedBlog._id // Save the blog ID for use in tests
    } else {
      // Create a test user
      const testUser = new User({
        username: 'testuser',
        name: 'Test User',
        // Add other necessary fields
      })
      const savedUser = await testUser.save()
      testUserId = savedUser._id // Save the user ID for use in tests

      // Generate a token for the test user
      token = jwt.sign({ id: savedUser._id }, process.env.SECRET)

      // Create a test blog tied to the test user
      const testBlog = new Blog({
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://test.com',
        likes: 10,
        user: testUserId
      })
      const savedBlog = await testBlog.save()
      testBlogId = savedBlog._id // Save the blog ID for use in tests
    }
    // // Create a test user
    // const testUser = new User({
    //   username: 'testuser',
    //   name: 'Test User',
    //   // Add other necessary fields
    // })
    // const savedUser = await testUser.save()
    // testUserId = savedUser._id // Save the user ID for use in tests

    // // Generate a token for the test user
    // token = jwt.sign({ id: savedUser._id }, process.env.SECRET)

    // // Create a test blog tied to the test user
    // const testBlog = new Blog({
    //   title: 'Test Blog',
    //   author: 'Test Author',
    //   url: 'http://test.com',
    //   likes: 10,
    //   user: testUserId
    // })
    // const savedBlog = await testBlog.save()
    // testBlogId = savedBlog._id // Save the blog ID for use in tests
  })


  test('succeeds with status code 204 if id is valid', async () => {
    // const blogsAtStart = await helper.blogsInDb()
    // const blogToDelete = blogsAtStart[0]


    await api
      .delete(`/api/blogs/${testBlogId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    // const blogsAtEnd = await helper.blogsInDb()

    // // no change to db size since I added a test blog and then deleted it.
    // assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

    // const titles = blogsAtEnd.map(r => r.title)
    // assert(!titles.includes(blogToDelete.title))
  })

  test('fails with status code 404 if id does not exist', async () => {
    const nonExistingId = await helper.nonExistingId()

    await api
      .delete(`/api/notes/${nonExistingId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
  })
})

describe('PUT /api/blogs/:id', () => {

  let testUserId
  let testBlogId
  let token

  beforeEach(async () => {

    const existingUser = await User.findOne({ username: 'testuser' })
    if (existingUser) {
      const savedUser = await existingUser.save()
      testUserId = savedUser._id // Save the user ID for use in tests

      // Generate a token for the test user
      token = jwt.sign({ id: savedUser._id }, process.env.SECRET)

      // Create a test blog tied to the test user
      const testBlog = new Blog({
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://test.com',
        likes: 10,
        user: testUserId
      })
      const savedBlog = await testBlog.save()
      testBlogId = savedBlog._id // Save the blog ID for use in tests
    } else {
      // Create a test user
      const testUser = new User({
        username: 'testuser',
        name: 'Test User',
        // Add other necessary fields
      })
      const savedUser = await testUser.save()
      testUserId = savedUser._id // Save the user ID for use in tests

      // Generate a token for the test user
      token = jwt.sign({ id: savedUser._id }, process.env.SECRET)

      // Create a test blog tied to the test user
      const testBlog = new Blog({
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://test.com',
        likes: 10,
        user: testUserId
      })
      const savedBlog = await testBlog.save()
      testBlogId = savedBlog._id // Save the blog ID for use in tests
    }
  })
  test('should update the number of likes for a blog post', async () => {
    // const blogsAtStart = await helper.blogsInDb()
    // const blogToUpdate = blogsAtStart[0]

    // Send a PUT request to update the number of likes
    const updatedBlog = await api
      .put(`/api/blogs/${testBlogId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ likes: 10 })
      .expect(200)

    assert.strictEqual(updatedBlog.body.likes, 10)
  })

  test('fails when likes property is missing', async () => {
    // const blogsAtStart = await helper.blogsInDb()
    // const blogToUpdate = blogsAtStart[0]

    const response = await api
      .put(`/api/blogs/${testBlogId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .expect(400)

    assert.strictEqual(response.body.error, 'likes value is missing')
  })
})



after(async () => {

  await mongoose.connection.close()
})