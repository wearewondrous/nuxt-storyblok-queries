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

describe('getStory()', () => {
  beforeAll(async () => {
    await buildNuxt(config)
  })

  afterAll(async () => {
    await nuxt.close()
  })

  test('Render /', async () => {
    const html = await get('/')
    expect(html).toContain('Hello server')
  })

  test('Render / in different languages', async () => {
    const htmlFr = await get('/fr')
    expect(htmlFr).toContain('Hello French Server')

    const htmlDe = await get('/de')
    expect(htmlDe).toContain('Hello German Server')
  })
})
