<script setup lang="ts">
import { computed, ref } from "vue";
import { useDayjs } from "#dayjs";

const dayjs = useDayjs();

let text = ref(null);

const { isLoading, isError, data, error } = useQuery({
  queryKey: ["feed"],
  queryFn: () => $fetch("/api/feed"), // Use $fetch with your api routes to get typesafety
});

const feedItem = computed(() => {
  return data?.value?.rss?.channel?.item[0];
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

  text.value = data.value;
};
</script>
<template>
  <div>
    <p v-if="isLoading">Loading...</p>
    <!-- data?.rss?.channel?.item -->
    <div v-if="audioUrl">
      <p>{{ audioUrl }}</p>

      <button class="btn btn-primary" @click="transcribeAudio(audioUrl)">
        Transcribe Audio
      </button>

      <p>{{ dayjs(feedItem.pubDate).format("MMMM D, YYYY") }}</p>
      <p>{{ feedItem.title }}</p>
      <p>{{ feedItem["dc:creator"] }}</p>
      <p class="result">{{ text }}</p>
    </div>
  </div>
</template>

<style scoped>
.result {
  white-space: pre-wrap;
}
</style>
