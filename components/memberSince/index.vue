<template>
  <div class="mt-[30px] p-[20px] rounded-[20px] border border-gray-300 overflow-hidden shadow-sm bg-white">
    <div class="flex items-center justify-center">
      <nuxt-link to="/">
        <img alt="/images/u32.jpeg" class="w-[90px] h-[90px] rounded-full" src="/images/u32.jpeg">
      </nuxt-link>
    </div>
    <div class="text-center my-[5px]">
      <nuxt-link class="text-base leading-[26px] font-medium" to="/">
        modmix
      </nuxt-link>
      <p class="text-base leading-[26px] font-normal mt-[4px] text-[#5E6D77]">
        Member Since 2022
      </p>
      <button
          class="mt-[15px] rounded-full text-white py-[15px] px-[35px] bg-[#3B71FE] hover:bg-[rgba(59,113,254,0.9)] text-base">
        Ask a Question
      </button>
    </div>
  </div>
</template>