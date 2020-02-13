import app from '../src/app'
import request from 'supertest'

describe('GET /', () => {
    let response
    test('verify hello world', async () => {
        const query_string = `
        query {
            hello
        }
      `
        response = await request(app)
            .post('/graphql')
            .send({ query: query_string })
        expect(response.body.data.hello).toBe("Hello World")
    })

    test('verify send many posts', async () => {
        const query_string = `
        query {
            posts {
                title
            }
        }
    `
        response = await request(app)
            .post('/graphql')
            .send({ query: query_string })
        expect(response.body.data.posts[0].title).toBe("My first blog post")
    })

    test('verify get one post by id', async () => {
        const query_string = `
        query {
            post(id:2) {
                title
            }
        }
    `
        response = await request(app)
            .post('/graphql')
            .send({ query: query_string })
        expect(response.body.data.post.title).toBe("Second blog post")
    })

    test('verify an author has posts', async () => {
        const query_string = `{
            author(id:"88d6bec2") {
              name
              posts {
                title
              }
            }
          }
          `
        response = await request(app)
            .post('/graphql')
            .send({ query: query_string })
        expect(response.body.data.author.posts.length).toBe(2)
    })

    test('verify send many posts has authors', async () => {
        const query_string = `{
            posts {
                title,
                author {
                    name  
                }
            }
          }
        `
        response = await request(app)
            .post('/graphql')
            .send({ query: query_string })
        // expect(response.body.data.posts[0].title).toBe("My first blog post")
        expect(response.body.data.posts[0].author.name).toBe("Xavier Decuyper")
    })
});
