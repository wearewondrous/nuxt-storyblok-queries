jest.setTimeout(60000)

const { Nuxt, Builder } = require('nuxt')
const request = require('request-promise-native')
const getPort = require('get-port')

const config = require('../example/nuxt.config')
config.dev = false

let nuxt, port

const url = path => `http://localhost:${port}${path}`
const get = path => request(url(path))
const buildNuxt = async (config) => {
  nuxt = new Nuxt(config)
  await nuxt.ready()
  await new Builder(nuxt).build()
  port = await getPort()
  await nuxt.listen(port)
}

describe('getStoryCollection()', () => {
  beforeAll(async () => {
    await buildNuxt(config)
  })

  afterAll(async () => {
    await nuxt.close()
  })

  test('Render /blog', async () => {
    const html = await get('/blog')
    expect(html).toContain('<h1>Blog</h1>')
  })

  test('Render /blog with blog posts', async () => {
    const html = await get('/blog')

    expect(html).toContain('<h2>Post One</h2>')
    expect(html).toContain('<h2>Post Two</h2>')
    expect(html).not.toContain('<h2>Blog Posts</h2>')
  })

  test('Render /blog with blog posts and Startpage', async () => {
    const html = await get('/blog?startpage=1')

    expect(html).toContain('<h2>Post One</h2>')
    expect(html).toContain('<h2>Post Two</h2>')
    expect(html).toContain('<h2>Blog Posts</h2>')
  })
})
