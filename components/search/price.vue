<script lang="ts" setup>
const settings = ref({
  filterPrice: {
    data: [0, 254],
    min: 0,
    max: 254
  },
})
</script>
<template>
  <div
      class="rounded-[20px] mt-[10px] text-sm text-[#212529] text-left">
    <div class="h-[55px]">
      <slider-input-min-max
          v-model:model-value="settings.filterPrice.data"
          :max="254"
          :min="0"
          @update:model-value="filterPriceReturn"
      />
    </div>
    <div class="min-max-value flex items-center justify-between relative">
      <div
          class="w-[44%] py-[4px] px-[12px] bg-white border border-solid border-gray-300 rounded-[10px] font-normal text-sm leading-[22px] text-[#5E6D77]">
        Min price
        <span class="block font-normal text-sm leading-[20px]">${{ settings.filterPrice.min }}</span>
      </div>
      <div
          class="w-[44%] py-[4px] px-[12px] bg-white border border-solid border-gray-300 rounded-[10px] font-normal text-sm leading-[22px] text-[#5E6D77]">
        Min price
        <span class="block font-normal text-sm leading-[20px]">${{ settings.filterPrice.max }}</span>
      </div>
    </div>
    <div
        class="price-action flex items-center justify-between pt-[20px] mt-[20px] border-t border-solid border-gray-300">
      <a class="font-normal text-base text-[#3B71FE] underline" href="#">Clear</a>
      <button
          class="bg-[#3B71FE] rounded-[50px] font-normal text-base leading-[20px] text-white py-[13px] px-[22px]">
        Apply
      </button>
    </div>
  </div>
</template>