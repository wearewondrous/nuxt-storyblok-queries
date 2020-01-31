const StoryblokClient = require("storyblok-js-client")

function removeLeadingSlash(str) {
  return str.replace(/^\/+/g, "")
}

function addTrailingSlash(str) {
  return str.replace(/\/?(\?|#|$)/, '/$1')
}

class StoryblokQueries {
  constructor(ctx) {
    this.ctx = ctx
    this.cacheVersion = <%= options.cacheVersion %>
    this.languages = <%= JSON.stringify(options.languages || []) %>
    this.version = "<%= options.version %>"
    this.client = new StoryblokClient({
      accessToken: "<%= options.accessToken %>",
      cache: {
        clear: "auto",
        type: "<%= options.cacheProvider || 'memory' %>"
      },
    })
  }

  get hasLanguages () {
    return this.languages.length > 0
  }

  getStory(path, options = {}) {
    if (this.hasLanguages && !options.lang) {
      options.lang = this.getCurrentLang()
    }

    path = this._getPath(path, options)
    return this._loadData({ path })
  }

  getCurrentStory(options = {}) {
    const { route } = this.ctx

    if (this.hasLanguages && !options.lang) {
      options.lang = this.getCurrentLang()
    }

    let path = route.name === "index" ? "home" : route.path
    path = this._getPath(path, options)

    return this._loadData({ path })
  }

  getSettings(lang = "", options = {}) {
    const path = this._getPath(`${lang}/${options.path || "settings"}`)
    return this._loadData({ path })
  }

  getCurrentSettings(options = {}) {
    const lang = this.getCurrentLang()
    return this.getSettings(lang, options)
  }

  getStoryCollection(path, options = {}) {
    const lang = this.getCurrentLang()
    let startsWith = this._getPath(`${lang}/${path}`, options)
    if (!lang) {
      startsWith = this._getPath(`${path}`, options)
    }
    const startpage = options.startpage || false

    return this._loadData({ startsWith, startpage, options })
  }

  getDatasource(path) {
    const datatype = "datasource_entries"
    const datasource = path
    return this._loadData({ datatype, datasource })
  }

  getCurrentLang() {
    return this._getLang(this.ctx.route.path)
  }

  getMode() {
    if (this.version !== "auto") {
      return this.version
    }

    let mode = "published"
    if (
      this.ctx.query._storyblok ||
      (typeof window !== "undefined" &&
        window.localStorage.getItem("_storyblok_draft_mode"))
    ) {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("_storyblok_draft_mode", "1")
        if (window.location === window.parent.location) {
          window.localStorage.removeItem("_storyblok_draft_mode")
        }
      }
      mode = "draft"
    }

    return mode
  }

  renderRichText(richTextContent) {
    if (richTextContent) {
      return this.client.richTextResolver.render(richTextContent)
    }
  }

  _loadData({ datatype = "stories", path = "", startsWith, startpage = true, datasource = "", options = {} }) {
    options = {
      ...options,
      version: this.getMode(),
      cv: this.cacheVersion
    }

    if (!startpage) {
      options.is_startpage = 0
    }

    if (startsWith) {
      options.starts_with = addTrailingSlash(startsWith)
    }

    if (datasource) {
      options.datasource = datasource
    }

    return this.client
      .get(`cdn/${datatype}/${path}`, options)
      .then(res => {
        return res.data
      })
      .catch(res => {
        if (!res.response) {
          console.error(res)
          this.ctx.error({
            statusCode: 404,
            message: "Failed to receive content from api"
          })
        } else {
          console.error(`Request for : ${res.response.config.url}`)
          console.error(res.response.data)
          this.ctx.error({
            statusCode: res.response.status,
            message: res.response.data
          })
        }
      })
  }

  _getPath(path, options) {
    const lang = this._getLang(path, options)
    const langPrefix = lang && lang !== this.languages[0] ? `${lang}/` : ""

    if (lang) {
      path = this._extractLangFromPath(path)
    }

    return `${langPrefix}${path}`
  }

  _getLang(path, options = {}) {
    if (!this.hasLanguages) {
      return ""
    }

    if (options.lang) {
      return options.lang
    }

    const normalizedPath = addTrailingSlash(
      removeLeadingSlash(path)
    )

    const lang = this.languages.find((lang) => {
      return normalizedPath.indexOf(`${lang}/`) === 0
    })

    return lang ? lang : this.languages[0]
  }

  _extractLangFromPath(path) {
    const lang = this._getLang(path)
    const normalizedPath = removeLeadingSlash(path)

    if (lang && normalizedPath.indexOf(lang) === 0) {
      return normalizedPath.replace(new RegExp(`${lang}/`, "i"), "")
    }

    return normalizedPath
  }
}

export default (ctx, inject) => {
  const storyblok = new StoryblokQueries(ctx)

  ctx.$storyblok = storyblok
  inject("storyblok", storyblok)
}
