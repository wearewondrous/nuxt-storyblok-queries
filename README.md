# Nuxt Storyblok Queries

[![NPM](https://img.shields.io/npm/v/@wearewondrous/nuxt-storyblok-queries.svg)](https://www.npmjs.com/package/@wearewondrous/nuxt-storyblok-queries)
[![CircleCI](https://circleci.com/gh/wearewondrous/nuxt-storyblok-queries.svg?style=shield&circle-token=53485e7e4fa60a611464761450c6230f5bafe9ff)](https://circleci.com/gh/wearewondrous/nuxt-storyblok-queries)
[![Standard JS][standard-js-src]][standard-js-href]

> Nuxt.js module to simplify queries to the Storyblok API

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add the `@wearewondrous/nuxt-storyblok-queries` dependency with `yarn` or `npm` to your project
2. Add `@wearewondrous/nuxt-storyblok-queries` to the `modules` section of `nuxt.config.js`
3. Configure it:

```js
{
  modules: [
    ['@wearewondrous/nuxt-storyblok-queries', {
      // Module options here
    }]
  ]
}
```

### Using top level options

```js
{
  modules: [
    '@wearewondrous/nuxt-storyblok-queries'
  ],
  storyblokQueries: [
    // Module options here
  ]
}
```

## Options

### `accessToken`

- Default: `this.options.storyblok || ''`

Access Token for the StoryBlok API. Not needed if you already have installed the [Storyblok Nuxt.js module](https://github.com/storyblok/storyblok-nuxt)

### `cacheProvider`

- Default: `'memory'`

Cache Provider for the StoryBlok API. Not needed if you already have installed the [Storyblok Nuxt.js module](https://github.com/storyblok/storyblok-nuxt) 

### `version`

- Default: `'auto'`

Version of the Storyblok Content. Use 'draft' together with the preview Access Token.

### `defaultLanguage`

- Default: `''`

Optional. If your Storyblok Site has multiple languages, set `defaultLanguage` to the key of your Storyblok default language.

## Usage

This modules adds a simple API to query your Storyblok Content.

* [$storyblok.getStory()](#storyblokgetstorypath-options)
* [$storyblok.getCurrentStory()](#storyblokgetcurrentstoryoptions)
* [$storyblok.getStoryCollection()](#storyblokgetstorycollectionpath-options)
* [$storyblok.getSettings()](#storyblokgetsettingslang-options)
* [$storyblok.getCurrentSettings()](#storyblokgetcurrentsettingsoptions)
* [$storyblok.getDatasource()](#storyblokgetdatasourcepath)

### `$storyblok.getStory(path, options)`

Fetches the story by the given path. The Language gets automatically detected or can be specified in the options parameter.

```js
export default {
  async asyncData({ $storyblok }) {
    const story = await $storyblok.getStory("home")

    return story
  }
}
```

#### with Options
```js
export default {
  async asyncData({ $storyblok }) {
    const story = await $storyblok.getStory("home", {
      lang: "de"
    })

    return story
  }
}
```

### `$storyblok.getCurrentStory(options)`

Fetches the story by the current Route. The Language gets automatically detected but can also be specified in the options parameter.

```js
export default {
  async asyncData({ $storyblok, route }) {
    console.log(route.path) // -> /story
    const story = await $storyblok.getCurrentStory()

    return story
  }
}
```

#### with Options
```js
export default {
  async asyncData({ $storyblok, route }) {
    console.log(route.path) // -> /story
    const story = await $storyblok.getCurrentStory({
      lang: "de"
    })

    return story
  }
}
```

### `$storyblok.getStoryCollection(path, options)`

Fetches all Stories matching the given path. The Language gets automatically detected but can also be specified in the options parameter.

```js
export default {
  async asyncData({ $storyblok, route }) {
    const collection = await $storyblok.getStoryCollection("blog")

    return collection
  }
}
```

#### with Options
```js
export default {
  async asyncData({ $storyblok, route }) {
    const collection = await $storyblok.getStoryCollection("blog", {
      lang: "de",
      startpage: true // if true, startpage of collection gets fetched as well
    })

    return collection
  }
}
```


### `$storyblok.getSettings(lang, options)`

Fetches the settings page of the given language. The path for the settings route can be specified in the options parameter or falls back to `/settings`.

```js
export default {
  async asyncData({ $storyblok, route }) {
    const settings = await $storyblok.getSettings("de")

    return {
      //...
      settings
    }
  }
}
```

#### with Options
```js
export default {
  async asyncData({ $storyblok, route }) {
    const settings = await $storyblok.getSettings("de", {
      path: "global"
    })

    return {
      //...
      settings
    }
  }
}
```


### `$storyblok.getCurrentSettings(options)`

Fetches the settings page of the current language detected by the current route. The path for the settings route can be specified in the options parameter or falls back to `/settings`.

```js
export default {
  async asyncData({ $storyblok, route }) {
    const settings = await $storyblok.getCurrentSettings()

    return {
      //...
      settings
    }
  }
}
```

#### with Options
```js
export default {
  async asyncData({ $storyblok, route }) {
    const settings = await $storyblok.getCurrentSettings({
      path: "global"
    })

    return {
      //...
      settings
    }
  }
}
```


### `$storyblok.getDatasource(path)`

Fetches the datasource by the given path.

```js
export default {
  async asyncData({ $storyblok, route }) {
    const datasource = await $storyblok.getDatasource("users")

    return {
      //...
      datasource
    }
  }
}
```


### `$storyblok.renderRichText(richTextContent)`

Renders the Storyblok richtext field content and returns an HTML string.

```html
<div v-html="$storyblok.getRichTest(story.content.rich_text)" />
```


## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) [WONDROUS LTD](https://www.wearewondrous.com/)

<!-- Badges -->
[standard-js-src]: https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square
[standard-js-href]: https://standardjs.com
