<script setup lang="jsx">
import {
  NButton,
  NDataTable,
  NInput,
  NForm,
  NFormItem,
  NGi,
  NGrid,
  useMessage,
} from "naive-ui";

definePageMeta({
  layout: "cms",
});
</script>

<template>
  <div class="pt-6">
    <NuxtLink
      to="/cms/other/add-ask-question"
      class="block w-fit px-5 py-2 font-medium rounded-lg bg-green-600 text-white"
    >
      Add ask question
    </NuxtLink>
  </div>
</template>

<style scoped></style>
