<script setup>
const props = defineProps({
  to: String,
});
</script>

<template>
  <NuxtLink :to="props.to"><slot /></NuxtLink>
</template>
