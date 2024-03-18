<script setup>
const route = useRoute();

const data = JSON.parse(route.query.data);

definePageMeta({
  layout: "cms",
});
</script>

<template>
  <div><CmsAddEditStory :isEdit="true" :editData="data || {}" /></div>
</template>

<style scoped></style>
