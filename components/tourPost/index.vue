<script lang="ts" setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

interface IProps {
  gridClass?: string
  paddingBox?: string
  view?: string,
  itemHover?: number
}

const props = withDefaults(defineProps<IProps>(), {
  gridClass: 'lg:w-1/3 sm:w-1/2',
  paddingBox: 'px-[12px]',
  view: 'grid',
  itemHover: 0,
})

const emits = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="nav-content">
    <div class="block tab-pane pb-[30px]">
      <div class="row flex flex-wrap">
        <div v-for="item in 6" :key="item" :class="`${gridClass} ${paddingBox}`" class="tab-box w-full"
             @mouseleave="$emit('update:modelValue', 0)"
             @mouseover="$emit('update:modelValue', item)"
        >
          <div class="mb-[30px]">
            <div :class="{
                  'flex': view == 'list'
                }"
                 class="bg-[#fff] overflow-hidden rounded-[15px] shadow-sm md:shadow-md lg:shadow-lg">
              <div :class="{
                  'w-1/2': view == 'list'
                }" class="featured-image relative overflow-visible">
                <a class="block overflow-hidden" href="#">
                  <div
                      class="absolute top-[22px] right-[10px] w-[30px] h-[30px] text-white text-[21px] z-10 cursor-pointer">
                    <font-awesome-icon :icon="['far', 'heart']" class="text-[23px]"/>
                  </div>
                </a>
                <a :class="{
                  'h-full': view == 'list'
                }" class="block overflow-hidden hotel-box" href="#">
                  <img alt="/images/feature-12-768x512.png"
                       class="w-full h-full transition-all duration-1500 ease-in-out"
                       src="/images/feature-12-768x512.png">
                </a>
                <a :class="{
                  'bottom-2': view == 'list'
                }"
                   class="block overflow-hidden absolute -bottom-[16px] right-[20px] h-[35px] w-[35px] border border-solid border-gray-300 rounded-[50%]"
                   href="#">
                  <img alt="/images/u32.jpeg"
                       class="w-full h-full block transition-all duration-1500 ease-in-out max-h-full object-cover object-center"
                       src="/images/u32.jpeg">
                </a>
              </div>
              <div :class="{
                  'w-1/2': view == 'list'
                }" class="content-item relative p-[20px]">
                <div class="m-h-[72px] text-left">
                  <div
                      class="relative flex justify-start items-center gap-2 text-sm text-[#5E6D77] line-height-14 leading-[14px] mb-[10px]">
                    <font-awesome-icon :icon="['fas', 'location-dot']" class="-mt-1 text-base"/>
                    New Jersey
                  </div>
                  <h3 class="font-bold text-[18px] leading-[26px] mb-[5px] font-dmsans">
                    <nuxt-link class="hover:text-[rgba(59,113,254,0.9)]" to="/">
                      Start in Los Angeles and end in San Francisco
                    </nuxt-link>
                  </h3>
                  <div
                      class="flex justify-start items-center font-[100] leading-[22px] font-sm text-[#5E6D77] font-dmsans">
                    <span>
                      <font-awesome-icon :icon="['fas', 'star']" class="text-[#ffb21d] text-sm"/>
                    </span>
                    <span class="font-bold text-base leading-[26px] mx-[4px]">5</span>
                    <span class="summary text-sm leading-[22px] text-[#5E6D77] mt-0.5">
                      (2 Reviews)
                    </span>
                  </div>
                </div>
                <div
                    class="mt-[20px] pt-[20px] border-t border-solid border-gray-300 flex justify-between items-center">
                  <div
                      class="flex items-center font-normal text-sm leading-[22px] text-[#5E6D77] font-dmsans">
                    From
                    <span class="font-bold text-[#1A2B48] ml-[8px] mr-[4px] text-base">
                                      €150.00
                                    </span>
                    <span class="font-normal text-sm leading-[22px] text-[#5E6D77] font-dmsans">
                                      /night
                                    </span>
                  </div>
                  <div class="flex justify-between items-center gap-2 text-sm text-[#5E6D77]">
                    <font-awesome-icon :icon="['far', 'clock']"/>
                    full day
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="panigation mt-[10px] mb-[30px] text-center block">
      <ul class="block">
        <li class="text-[#1A2B48] mr-[10px] font-dmsans text-base w-[40px] h-[40px] inline-block rounded-[10px] border border-solid border-gray-300">
          <button
              class="flex flex-1 w-full h-full justify-center items-center font-[500]">
            <font-awesome-icon :icon="['fas', 'chevron-left']" class="text-[12px] font-medium"/>
          </button>
        </li>
        <li class="bg-[#3B71FE] text-[#1A2B48] !text-white mr-[10px] font-dmsans text-base w-[40px] h-[40px] inline-block rounded-[10px]">
          <button
              class="flex flex-1 w-full h-full justify-center items-center font-[500]">
            1
          </button>
        </li>
        <li class="text-[#1A2B48] mr-[10px] font-dmsans text-base w-[40px] h-[40px] inline-block rounded-[10px]">
          <button
              class="flex flex-1 w-full h-full justify-center items-center font-[500]">
            2
          </button>
        </li>
        <li class="text-[#1A2B48] mr-[10px] font-dmsans text-base w-[40px] h-[40px] inline-block rounded-[10px]">
          <button
              class="flex flex-1 w-full h-full justify-center items-center font-[500]">
            3
          </button>
        </li>
        <li class="text-[#1A2B48] mr-[10px] font-dmsans text-base w-[40px] h-[40px] inline-block rounded-[10px]">
          <button
              class="flex flex-1 w-full h-full justify-center items-center font-[500]">
            4
          </button>
        </li>
        <li class="text-[#1A2B48] mr-[10px] font-dmsans text-base w-[40px] h-[40px] inline-block rounded-[10px] border border-solid border-gray-300">
          <button
              class="flex flex-1 w-full h-full justify-center items-center font-[500]">
            <font-awesome-icon :icon="['fas', 'chevron-right']"
                               class="text-[12px] font-medium"/>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-content {
  .tab-pane {
    .hotel-box {
      img:hover {
        filter: brightness(100%) contrast(100%) saturate(100%) blur(0px) hue-rotate(0deg);
        transform: scale(1.1);
      }
    }
  }
}
</style>