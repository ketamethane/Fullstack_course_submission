const mongoose = require('mongoose')

if (process.argv.length<2) {
  console.log('give password as argument')
  process.exit(1)
}

// refer to .env file for code to manually connect to mongodb to add blog

mongoose.set('strictQuery',false)

mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  id: Number,
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('blog', blogSchema)



// const generateId = (max) => {
//   return Math.floor(Math.random() * max)
// }

if (process.argv.length===6) {
  const blog = new Blog({
    // 'id': generateId(100000000),
    'title': process.argv[2],
    'author': process.argv[3],
    'url': process.argv[4],
    'likes': parseInt(process.argv[5], 10)
  })

  blog.save().then(result => {
    console.log(result)
    console.log(`added ${blog.title} by ${blog.author} with url ${blog.url} with ${blog.likes} likes to blogList!`)
    mongoose.connection.close()
  })
}

// blog.save().then(result => {
//   console.log('blog saved!')
//   mongoose.connection.close()
// })

if (process.argv.length===2) {
  Blog.find().then(result => {
    console.log('blog list:')
    result.forEach(blog => {
      console.log(`${blog.name} ${blog.number}`)
    })
    mongoose.connection.close()
  })
}
