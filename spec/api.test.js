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

    //   test('verify send many posts has authors', async () => {
    //     const query_string = `{
    //         posts{
    //         title,
    //         author {
    //             name  
    //         }
    //       }
    //       }`
    //     response = await request(app)
    //       .post('/graphql').send({ query: query_string })
    //     expect(response.body.data.posts[0].title).toBe("My first blog post")
    //     console.log(response.body)
    //   })
});
