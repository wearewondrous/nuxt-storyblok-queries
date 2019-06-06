const logger = require("./logger")
const StoryblokClient = require("storyblok-js-client")
const { resolve } = require("path")

export default async function storyblokQueryModule(moduleOptions) {
  const defaultOptions = {
    accessToken: "",
    version: "published",
    defaultLanguage: "",
    cacheProvider: "memory"
  }

  const options = Object.assign(
    defaultOptions,
    this.options.storyblok,
    this.options.storyblokQuery,
    moduleOptions
  )

  // Check if accessToken is defined
  if (!options.accessToken) {
    logger.warn("No Access Token found in Module Options")
    return
  }

  const client = new StoryblokClient({
    accessToken: options.accessToken
  })

  const { data: spaceData } = await client.get(`cdn/spaces/me`)
  options.cacheVersion = spaceData.space.version

  const { language_codes } = spaceData.space
  if (language_codes.length) {
    // Check if defaultLanguage is defined
    if (!options.defaultLanguage) {
      logger.warn("No Default Language found in Module Options")
      return
    }

    language_codes.unshift(options.defaultLanguage)
    options.languages = language_codes
  }

  this.addPlugin({
    src: resolve(__dirname, "plugin.js"),
    options
  })
}


module.exports.meta = require("../package.json")
