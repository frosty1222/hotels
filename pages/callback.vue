<script setup>
const route = useRoute();

definePageMeta({
  layout: false,
});
</script>

<template>
  <div class="mt-20 flex flex-col items-center">
    <h2 class="font-bold text-2xl text-[#333]">
      Scan QR image to go to view detail
    </h2>
    <img :src="route.query.qr" class="mt-10 w-[300px]" />
  </div>
</template>
