<template>
  <div>
    <h1>Blog</h1>
    <article v-for="post in posts" :key="post._uid">
      <h2>{{ post.content.title }}</h2>
      <p>{{ post.content.text }}</p>
    </article>
  </div>
</template>

<script>
export default {
  async asyncData({ route, query, store, $storyblok }) {
    const startpage = query.startpage === "1";

    const { stories } = await $storyblok.getStoryCollection("blog", {
      startpage
    });

    return {
      posts: stories
    };
  }
};
</script>
