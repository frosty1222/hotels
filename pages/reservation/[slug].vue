<script setup>
import { useMessage } from "naive-ui";

const { restAPI } = useApi();
const route = useRoute();
const message = useMessage();

const { data: resData } = await restAPI.customer.getReserHotelDetail({
  params: {
    id: route.params.slug,
    type: route.query.type,
  },
});

if (!resData.value?.success) message.error("Lấy dữ liệu thất bại!");
const data = resData.value?.data;

definePageMeta({
  layout: false,
});
</script>

<template>
  <h1 class="text-2xl font-bold text-center">Detail</h1>
  <div class="w-[40%] mx-auto">
    <p class="">{{ data }}</p>
  </div>
</template>
