<script setup>
import { NPagination } from "naive-ui";

const { options } = defineProps({
  options: { type: Object, default: {} },
});
</script>

<template>
  <div>
    <NPagination v-bind="options" />
  </div>
</template>
