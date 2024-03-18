<script setup>
const data = {};

definePageMeta({
  layout: "cms",
});
</script>

<template>
  <div><CmsAddEditServices :isEdit="true" :editData="data" /></div>
</template>

<style scoped></style>
