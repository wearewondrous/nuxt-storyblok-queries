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

describe('getSettings()', () => {
  beforeAll(async () => {
    await buildNuxt(config)
  })

  afterAll(async () => {
    await nuxt.close()
  })

  test('Fetch Settings in default language on Pageload', async () => {
    const html = await get('/')
    expect(html).toContain('__NUXT__')
    expect(html).toContain('og:title')
    expect(html).toContain('Storyblok Router')
  })
})
