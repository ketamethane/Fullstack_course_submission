// const { test, describe } = require('node:test')
// const assert = require('node:assert')
// const listHelper = require('../utils/list_helper')

// describe('Dummy', () => {
//   test('dummy returns one', () => {
//     const blogs = []

//     const result = listHelper.dummy(blogs)
//     assert.strictEqual(result, 1)
//   })
// })

// describe('total likes', () => {
//   const listWithOneBlog = [
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//       likes: 5,
//       __v: 0
//     }
//   ]

//   const listWithThreeBlogs = [
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//       likes: 5,
//       __v: 0
//     },
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//       likes: 10,
//       __v: 0
//     },
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//       likes: 25,
//       __v: 0
//     },
//   ]

//   test('of empty list is zero', () => {
//     const result = listHelper.totalLikes([])
//     assert.strictEqual(result, 0)
//   })

//   test('when list has only one blog, equals the likes of that', () => {
//     const result = listHelper.totalLikes(listWithOneBlog)
//     assert.strictEqual(result, 5)
//   })

//   test('of a bigger list is calculated right', () => {
//     const result = listHelper.totalLikes(listWithThreeBlogs)
//     assert.strictEqual(result, 40)
//   })
// })

// describe('Helper functions', () => {
//   const listWithThreeBlogs = [
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//       likes: 5,
//       __v: 0
//     },
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'That is not Dijkstra',
//       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//       likes: 25,
//       __v: 0
//     },
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//       likes: 25,
//       __v: 0
//     },
//   ]
//   test('top blog with most likes', () => {

//     const result = listHelper.favoriteBlog(listWithThreeBlogs)
//     console.log('most number of likes:', result)
//     assert.deepStrictEqual(result.likes, 25)
//   })

//   test('author with most blogs', () => {
//     const result = listHelper.mostBlogs(listWithThreeBlogs)
//     console.log('most blogs:', result)
//     assert.deepStrictEqual(result,
//       { author: 'Edsger W. Dijkstra',
//         blogs: 2
//       })
//   })

//   test('author with most likes', () => {
//     const result = listHelper.mostLikes(listWithThreeBlogs)
//     console.log('most likes:', result)
//     assert.deepStrictEqual(result,
//       { author: 'Edsger W. Dijkstra',
//         likes: 30
//       })
//   })
// })