<script setup>
const getFeed = async () => {
  const response = await useFetch("/api/feed");

  console.log(response.data.value);
};
</script>

<template>
  <div>
    <h1>Nuxt Starter</h1>

    <button @click="getFeed">Get Feed</button>
  </div>
</template>
