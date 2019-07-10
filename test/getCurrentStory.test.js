jest.setTimeout(60000)

const { Nuxt, Builder } = require('nuxt-edge')
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

describe('getCurrentStory()', () => {
  beforeAll(async () => {
    await buildNuxt(config)
  })

  afterAll(async () => {
    await nuxt.close()
  })

  test('Render /about', async () => {
    const html = await get('/about')
    expect(html).toContain('About')
  })

  test('Render /about in different languages', async () => {
    const htmlFr = await get('/fr/about')
    expect(htmlFr).toContain('About')
    expect(htmlFr).toContain('French')

    const htmlDe = await get('/de/about')
    expect(htmlDe).toContain('About')
    expect(htmlDe).toContain('German')
  })
})
