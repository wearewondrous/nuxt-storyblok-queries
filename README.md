# Nuxt Storyblok Queries

[![CircleCI](https://circleci.com/gh/wearewondrous/nuxt-storyblok-queries.svg?style=svg&circle-token=53485e7e4fa60a611464761450c6230f5bafe9ff)](https://circleci.com/gh/wearewondrous/nuxt-storyblok-queries)
[![Standard JS][standard-js-src]][standard-js-href]

> Nuxt.js module to simplify queries to the Storyblok API

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add the `nuxt-storyblok-queries` dependency with `yarn` or `npm` to your project
2. Add `nuxt-storyblok-queries` to the `modules` section of `nuxt.config.js`
3. Configure it:

```js
{
  modules: [
    ['nuxt-storyblok-queries', {
      // Module option here
    }]
  ]
}
```

### Using top level options

```js
{
  modules: [
    'nuxt-storyblok-queries'
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

- Default: `'published'`

Version of the Storyblok Content. Use 'draft' for the preview Access Token.

### `defaultLanguage`

- Default: `''`

Optional. If your Storyblok Site has multiple languages, set `defaultLanguage` to the key of your Storyblok default language.


## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) {{ author }}

<!-- Badges -->
[standard-js-src]: https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square
[standard-js-href]: https://standardjs.com