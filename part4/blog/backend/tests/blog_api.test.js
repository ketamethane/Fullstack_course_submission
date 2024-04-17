const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)



// beforeEach(async () => {
//   await Blog.deleteMany({})

//   for (let blog of helper.initialBlogs) {
//     let blogObject = new Blog(blog)
//     await blogObject.save()
//   }
// })


describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
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


  describe('validity testing', () => {
    beforeEach(async () => {
      await Blog.deleteMany({})
      await Blog.insertMany(helper.initialBlogs)
    })

    test('unique identifier property of blog posts is named id', async () => {
      const response = await api.get('/api/blogs')

      response.body.forEach((blog) => {

        assert.strictEqual(Object.prototype.hasOwnProperty.call(blog, 'id'), true)
      })
    })



    test('a valid blog can be added ', async () => {
      const newBlog = {
        title: 'Vysions',
        author: 'vylt',
        url: 'www.vylt.com',
        likes: 1000
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      const titles = response.body.map(r => r.title)

      assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

      assert(titles.includes('Vysions'))
    })

    test('blog without likes defaults to zero', async () => {
      const newBlog = {
        title: 'violet',
        author: 'vylt',
        url: 'www.vylt.com'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      const createdBlog = response.body.find(blog => blog.title === newBlog.title)

      // Verify the blog has zero likes
      assert.strictEqual(createdBlog.likes, 0)
    })
  })

  describe('Error 400 tests', () => {
    beforeEach(async () => {
      await Blog.deleteMany({})
      await Blog.insertMany(helper.initialBlogs)
    })
    test('missing title property results in 400 Bad Request', async () => {
      const newBlog = {
        author: 'Test Author',
        url: 'http://test.com',
        // Intentionally omit the 'title' property
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })


    // Test for missing 'url' property
    test('missing url property results in 400 Bad Request', async () => {
      const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        // Intentionally omit the 'url' property
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
  })


  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(r => r.title)
      assert(!titles.includes(blogToDelete.title))
    })

    test('fails with status code 404 if id does not exist', async () => {
      const nonExistingId = await helper.nonExistingId()

      await api
        .delete(`/api/notes/${nonExistingId}`)
        .expect(404)
    })
  })

  describe('PUT /api/blogs/:id', () => {
    test('should update the number of likes for a blog post', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      // Send a PUT request to update the number of likes
      const updatedBlog = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({ likes: 10 })
        .expect(200)

      assert.strictEqual(updatedBlog.body.likes, 10)
    })

    test('fails when likes property is missing', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({})
        .expect(400)

      assert.strictEqual(response.body.error, 'likes value is missing')
    })
  })
})


after(async () => {
  await mongoose.connection.close()
})