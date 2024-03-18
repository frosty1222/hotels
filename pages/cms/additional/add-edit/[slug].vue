<script setup>
const data = {};

definePageMeta({
  layout: "cms",
});
</script>

<template>
  <div><CmsAddEditAdditional :isEdit="true" :editData="data" /></div>
</template>

<style scoped></style>
