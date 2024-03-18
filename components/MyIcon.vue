<script setup>
const props = defineProps({
  name: String,
});
</script>

<template>
  <Icon :name="props.name" />
</template>
