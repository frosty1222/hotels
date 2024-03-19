<script setup>
import { useMessage } from "naive-ui";

const { restAPI } = useApi();
const message = useMessage();

const testData = {
  first_name: "van dong",
  last_name: "dong",
  email: "dong@gmail.com",
  phone: "0123353454",
  spr: "ha noi", //State/Province/Region
  address_line1: "xuan phương",
  address_line2: "nam tu liem",
  city: "Ha noi",
  zip_code: "100000",
  country: "viet nam",
  special_requirement: "nothing",
  payment_method: "vnp",
  check_in: "2014-03-11",
  check_out: "2014-03-15",
  total_price: 1000000,
  adult: 2,
  children: 2,
  room_id: 1,
  hotel_id: 2,
};

async function handleSubmit() {
  const { data: resData } = await restAPI.customer.createPaymentHotel({
    body: testData,
  });

  if (resData.value?.success) {
    const url = resData.value?.payment_url || "#";
    return navigateTo(url, {
      external: true,
    });
  } else message.error("Tạo yêu cầu thất bại!");
}

definePageMeta({
  layout: false,
});
</script>

<template>
  <div class="mt-32 flex justify-center">
    <button
      class="px-10 py-2 rounded-xl text-white bg-green-500"
      @click="handleSubmit"
    >
      Thanh toán VNPAY
    </button>
  </div>
</template>
