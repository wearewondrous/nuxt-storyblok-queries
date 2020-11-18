const { resolve } = require('path')
const StoryblokClient = require('storyblok-js-client')
const logger = require('./logger')

export default async function storyblokQueryModule (moduleOptions) {
  const defaultOptions = {
    accessToken: '',
    version: 'published',
    defaultLanguage: '',
    cacheProvider: 'memory'
  }

  const options = Object.assign(
    defaultOptions,
    this.options.storyblok,
    this.options.storyblokQueries,
    moduleOptions
  )

  // Check if accessToken is defined
  if (!options.accessToken) {
    logger.warn('No Access Token found in Module Options')
    return
  }

  const client = new StoryblokClient({
    accessToken: options.accessToken
  })

  const { data: spaceData } = await client.get('cdn/spaces/me')

  const { language_codes: languageCodes = [] } = spaceData.space
  if (languageCodes.length) {
    // Check if defaultLanguage is defined
    if (!options.defaultLanguage) {
      logger.warn('No Default Language found in Module Options')
      return
    }

    languageCodes.unshift(options.defaultLanguage)
    options.languages = languageCodes
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    options
  })
}

module.exports.meta = require('../package.json')
