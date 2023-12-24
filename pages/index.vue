<script setup lang="ts">
import { computed, ref } from "vue";

let transcription = ref(null);

const { isLoading, isError, data, error } = useQuery({
  queryKey: ["feed"],
  queryFn: () => $fetch("/api/feed"), // Use $fetch with your api routes to get typesafety
});

const audioUrl = computed(() => {
  return data?.value?.rss?.channel?.item[0].enclosure["@_url"];
});

const transcribeAudio = async (url: string) => {
  const { data } = await useFetch("/api/transcribe", {
    method: "post",
    body: {
      url: url,
    },
  });

  console.log(data);

  transcription.value = data.value;
};
</script>

<template>
  <div>
    <h1>Nuxt Starter</h1>
    <p v-if="isLoading">Loading...</p>
    <!-- data?.rss?.channel?.item -->
    <div v-if="audioUrl">
      <p>{{ audioUrl }}</p>

      <Ubutton @click="transcribeAudio(audioUrl)">Transcribe Audio</Ubutton>

      <p class="result">{{ transcription }}</p>
    </div>
  </div>
</template>

<style scoped>
.result {
  white-space: pre-wrap;
}
</style>
