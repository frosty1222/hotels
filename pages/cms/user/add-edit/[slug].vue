<script setup>
const { restAPI } = useApi();
const route = useRoute();

const { data: resData } = await restAPI.cms.getUserById({
  params: {
    id: route.params.slug,
  },
});

definePageMeta({
  layout: "cms",
});
</script>

<template>
  <div><CmsAddEditUser :isEdit="true" :editData="resData?.user || {}" /></div>
</template>

<style scoped></style>
