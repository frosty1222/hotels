<script lang="ts" setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const config = useRuntimeConfig();
const {t} = useI18n()
useHead(
    {
      title: "Tour Search Halfmap"
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

const filterPriceReturn = (value: number[]) => {
  settings.value.filterPrice.min = value[0];
  settings.value.filterPrice.max = value[1];
}

const center = {lat: 40.689247, lng: -74.044502}

const isShow = ref(false)

const showHotel = () => isShow.value = !isShow.value

const mouseHover = (value: number) => {
  settings.value.hotelHover = value;
}
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
    <div
        class="bg-[#f7f8fa] flex items-center justify-center relative py-[30px] lg:px-0 px-[20px] border-b border-solid border-gray-300">
      <div class="font-medium text-sm leading-[20px] text-[#3B71FE] mr-[15px] hidden"></div>
      <ul class="m-0 lg:p-0 py-[16px] px-[15px] w-auto flex sm:ov">
        <li class="inline-block mr-[14px]">
          <search-btn-filter label="Filter price">
            <template #body>
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
            </template>
          </search-btn-filter>
        </li>
        <li class="inline-block mr-[14px]">
          <search-btn-filter label="Review Score">
            <template #body>
              <ul class="w-full">
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    <font-awesome-icon :icon="['fas', 'star']" class="text-[12px] text-[#FA5636]"/>
                    <font-awesome-icon :icon="['fas', 'star']" class="text-[12px] text-[#FA5636]"/>
                    <font-awesome-icon :icon="['fas', 'star']" class="text-[12px] text-[#FA5636]"/>
                    <font-awesome-icon :icon="['fas', 'star']" class="text-[12px] text-[#FA5636]"/>
                    <font-awesome-icon :icon="['fas', 'star']" class="text-[12px] text-[#FA5636]"/>
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    <font-awesome-icon :icon="['fas', 'star']" class="text-[12px] text-[#FA5636]"/>
                    <font-awesome-icon :icon="['fas', 'star']" class="text-[12px] text-[#FA5636]"/>
                    <font-awesome-icon :icon="['fas', 'star']" class="text-[12px] text-[#FA5636]"/>
                    <font-awesome-icon :icon="['fas', 'star']" class="text-[12px] text-[#FA5636]"/>
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    <font-awesome-icon :icon="['fas', 'star']" class="text-[12px] text-[#FA5636]"/>
                    <font-awesome-icon :icon="['fas', 'star']" class="text-[12px] text-[#FA5636]"/>
                    <font-awesome-icon :icon="['fas', 'star']" class="text-[12px] text-[#FA5636]"/>
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    <font-awesome-icon :icon="['fas', 'star']" class="text-[12px] text-[#FA5636]"/>
                    <font-awesome-icon :icon="['fas', 'star']" class="text-[12px] text-[#FA5636]"/>
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    <font-awesome-icon :icon="['fas', 'star']" class="text-[12px] text-[#FA5636]"/>
                  </label>
                </li>
              </ul>
            </template>
          </search-btn-filter>
        </li>
        <li class="inline-block mr-[14px]">
          <search-btn-filter label="Categories">
            <template #body>
              <ul class="w-full">
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    City trips
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Ecotourism
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Escorted Tour
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Group Tour
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Hosted tours
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Ligula
                  </label>
                </li>
              </ul>
            </template>
          </search-btn-filter>
        </li>
        <li class="inline-block mr-[14px]">
          <search-btn-filter label="Duration">
            <template #body>
              <ul class="w-full">
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    0 – 3 hours
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    3 – 5 hours
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    5 – 7 hours
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Fullday (+7hours)
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Multi day
                  </label>
                </li>
              </ul>
            </template>
          </search-btn-filter>
        </li>
      </ul>
    </div>
    <div class="max-w-[1290px] mx-auto">
      <div class="block">
        <div class="lg:pl-[40px] px-[12px] pb-[30px] flex flex-wrap">
          <div class="col-left dataarea flex-1 transition-opacity-ease-in-duration-400 w-full">
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
                  @update:model-value="mouseHover"
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