<script lang="ts" setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const {t} = useI18n()

const config = useRuntimeConfig();

useHead(
    {
      title: "Hotel Search Halfmap"
    }
)

const settings = ref({
  filterPrice: {
    data: [0, 254],
    min: 0,
    max: 254
  },
  view: "grid",
  hotelHover: 0
})
const center = {lat: 40.689247, lng: -74.044502}
</script>
<template>
  <div class="font-dmsans">
    <div
        class="bg-white bg-center bg-no-repeat bg-cover relative pt-[151px] pb-[60px] bg-[url(/images/banner-search-form.png)]">
      <div class="container w-full max-w-[1290px] mx-auto">
        <div class="relative z-10 px-[80px]">
          <search-location/>
        </div>
      </div>
    </div>
    <div class="block">
      <div class="w-full max-w-[1290px] mx-auto">
        <div class="lg:pl-[40px] px-[12px] pb-[30px] flex flex-wrap">
          <div class="lg:w-[25%] lg:block hidden">
            <div class="py-[55px] lg:px-[25px] px-[10px]">
              <div class="bg-[#f7f8fa] rounded-[20px] p-[5px] mb-[30px]">
                <div class="font-bold text-[18px] leading-[26px] px-[15px] pt-[10px]">
                  Filter Price
                </div>
                <search-price class="p-[15px]"/>
              </div>
              <div class="bg-[#f7f8fa] rounded-[20px] p-[5px] mb-[30px]">
                <div class="font-bold text-[18px] leading-[26px] px-[15px] pt-[10px]">
                  Review Score
                </div>
                <search-hotel-star class="p-[15px]"/>
              </div>
              <div class="bg-[#f7f8fa] rounded-[20px] p-[5px] mb-[30px]">
                <div class="font-bold text-[18px] leading-[26px] px-[15px] pt-[10px]">
                  Categories
                </div>
                <search-facilities class="p-[15px]"/>
              </div>
              <div class="bg-[#f7f8fa] rounded-[20px] p-[5px] mb-[30px]">
                <div class="font-bold text-[18px] leading-[26px] px-[15px] pt-[10px]">
                  Durations
                </div>
                <search-facilities class="p-[15px]"/>
              </div>
              <div class="bg-[#f7f8fa] rounded-[20px] p-[5px] mb-[30px]">
                <div class="font-bold text-[18px] leading-[26px] px-[15px] pt-[10px]">
                  Languages
                </div>
                <search-facilities class="p-[15px]"/>
              </div>
            </div>
          </div>
          <div class="col-left dataarea flex-1 transition-opacity-ease-in-duration-400 lg:w-[75%] w-full">
            <div class="my-[40px] lg:pr-[40px] pr-[15px] flex justify-between items-center">
              <h2 class="font-normal text-base leading-[26px] text-[#5E6D77]">
                24 tours found
              </h2>
              <ul>
                <li class="inline-block">
                  <search-btn-dropdown label="Sort">
                    <template #body>
                      <div class="flex items-center">
                        <input id="default-radio-1" checked
                               class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                               name="default-radio" type="radio"
                               value="">
                        <label class="ms-2 font-medium text-gray-900 dark:text-gray-300 text-base"
                               for="default-radio-1">New hotel</label>
                      </div>
                      <div class="mt-[10px]">
                        <span class="text-base text-[#5E6D77]">Price</span>
                        <div class="flex items-center">
                          <input id="default-radio-2" checked
                                 class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                 name="default-radio" type="radio"
                                 value="">
                          <label class="ms-2 font-medium text-gray-900 dark:text-gray-300 text-base"
                                 for="default-radio-2">Low to high</label>
                        </div>
                        <div class="flex items-center">
                          <input id="default-radio-3" checked
                                 class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                 name="default-radio" type="radio"
                                 value="">
                          <label class="ms-2 font-medium text-gray-900 dark:text-gray-300 text-base"
                                 for="default-radio-3">High to low</label>
                        </div>
                      </div>
                      <div class="mt-[10px]">
                        <span class="text-base text-[#5E6D77]">Name</span>
                        <div class="flex items-center">
                          <input id="default-radio-4" checked
                                 class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                 name="default-radio" type="radio"
                                 value="">
                          <label class="ms-2 font-medium text-gray-900 dark:text-gray-300 text-base"
                                 for="default-radio-4">a - z</label>
                        </div>
                        <div class="flex items-center">
                          <input id="default-radio-5" checked
                                 class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                 name="default-radio" type="radio"
                                 value="">
                          <label class="ms-2 font-medium text-gray-900 dark:text-gray-300 text-base"
                                 for="default-radio-5">z - a</label>
                        </div>
                      </div>
                    </template>
                  </search-btn-dropdown>
                </li>
                <li class="ml-[27px] inline-block">
                <span class="mr-[15px] cursor-pointer" @click="settings.view = 'list'">
                  <font-awesome-icon :class="{'!text-[#3B71FE]': settings.view == 'list'}" :icon="['fas', 'list']"
                                     class="text-[#5E6D77]"/>
                </span>
                  <span class="cursor-pointer" @click="settings.view = 'grid'">
                  <font-awesome-icon :class="{'!text-[#3B71FE]': settings.view == 'grid'}"
                                     :icon="['fas', 'table-cells-large']"
                                     class="text-[#5E6D77]"/>
                </span>
                </li>
              </ul>
            </div>
            <div class="-mx-[12px] lg:pr-[35px] pr-[15px]">
              <TourPost
                  :grid-class="settings.view == 'grid' ? 'lg:w-1/3 w-full' : 'w-full'"
                  :view="settings.view"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.min-max-value:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  height: 1px;
  width: 10px;
  background: #dedede;
}

.col-right .inner::after {
  content: "";
  border: 5px solid #fff;
  display: inline-block;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
  bottom: -9px;
  position: absolute;
  left: 50%;
  margin-left: -6px;
}

.hotel-hover {
  background: #3B71FE !important;
  color: #ffffff;
}

.col-right .hotel-hover.inner::after {
  border: 5px solid #3B71FE;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
}

.col-right .inner:hover::after,
.col-right .inner:hover + ::after {
  border: 5px solid #3B71FE;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
}
</style>