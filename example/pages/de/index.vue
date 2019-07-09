<template>
  <div>
    <h1>{{ story.content.title }}</h1>
    <p>
      {{ story.content.text }}
    </p>
  </div>
</template>

<script>
export default {
  async asyncData({ $storyblok }) {
    const story = await $storyblok.getStory('home')

    return story
  }
}
</script>
