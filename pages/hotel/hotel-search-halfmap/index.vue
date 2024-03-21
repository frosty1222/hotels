<script lang="ts" setup>
import {CustomMarker, GoogleMap} from 'vue3-google-map'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import { useMessage } from 'naive-ui';
const { restAPI } = useApi();
const userStore = useUserStore();
const message = useMessage();
const route = useRoute();
const config = useRuntimeConfig();
const {t} = useI18n()
useHead(
    {
      title: "Hotel Search Halfmap"
    }
)
let hotelData = [];
const { data: resHotel } = await restAPI.cms.getSVHotel();
if (resHotel.value?.success) {
  hotelData = resHotel.value?.data;
}
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
        class="bg-white flex items-center justify-center relative py-[30px] lg:px-0 px-[20px] border-b border-solid border-gray-300">
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
          <search-btn-filter label="Review score">
            <template #body>
              <ul class="w-full">
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Exellent
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Verry good
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Average
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Poor
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Terrible
                  </label>
                </li>
              </ul>
            </template>
          </search-btn-filter>
        </li>
        <li class="inline-block mr-[14px]">
          <search-btn-filter label="Hotel star">
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
          <search-btn-filter label="Facilities">
            <template #body>
              <ul class="w-full">
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Best value
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Boutique
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Budget
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Business
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Charming
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Classic
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Green
                  </label>
                </li>
              </ul>
            </template>
          </search-btn-filter>
        </li>
        <li class="inline-block mr-[14px]">
          <search-btn-filter label="Hotel Theme">
            <template #body>
              <ul class="w-full">
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Best value
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Boutique
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Budget
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Business
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Charming
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Classic
                  </label>
                </li>
                <li class="flex justify-start items-center font-normal text-base leading-[26px] text-[#5E6D77] my-[5px] cursor-pointer">
                  <input class="rounded-[5px] w-[20px] h-[20px] focus:ring-0 outline-none" type="checkbox">
                  <label class="ml-[14px]">
                    Green
                  </label>
                </li>
              </ul>
            </template>
          </search-btn-filter>
        </li>
      </ul>
    </div>
    <div class="block">
      <div class="lg:pl-[40px] px-[12px] pb-[30px] flex flex-wrap">
        <div class="col-left dataarea flex-1 transition-opacity-ease-in-duration-400 lg:w-1/2 w-full">
          <div class="my-[40px] lg:pr-[40px] pr-[15px] flex justify-between items-center">
            <h2 class="font-normal text-base leading-[26px] text-[#5E6D77]">
              24 hotels found
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
            <GoogleMap
                :api-key="config.public.apiKeyGoogleMap"
                :center="{lat: 51.093048, lng: 6.842120}"
                :zoom="7"
            />

            <HotelPost
                :grid-class="settings.view == 'grid' ? 'lg:w-1/2 w-full' : 'w-full'"
                :view="settings.view"
                style="
                height: calc(100vh - 80px);
                width: auto;
                overflow-y: scroll;
                overflow-x: hidden;
                ::-webkit-scrollbar {width: 1px;}
                ::-webkit-scrollbar-track {background: #f1f1f1;}
                "
                @update:model-value="mouseHover"
            />
          </div>
        </div>
        <div
            class="col-right lg:block hidden flex-1 relative overflow-hidden">
          <GoogleMap
              :api-key="config.public.apiKeyGoogleMap"
              :center="center"
              :zoom="15"
              class="top-0 right-0 h-full relative"
          >
            <CustomMarker :options="{ position: center, anchorPoint: 'BOTTOM_CENTER' }">
              <div>
                <div :class="{'hotel-hover': settings.hotelHover > 0}"
                     class="inner hover:bg-[#3B71FE] hover:text-white bg-white rounded-[50px] font-bold text-sm leading-[14px] text-center text-[#232323] px-[10px] pt-[13px] pb-[11px] relative font-dmsans transition-opacity-ease-in-duration-200 shadow-md"
                     @click="showHotel">
                  $155.00
                </div>
                <div v-if="isShow"
                     class="tab-box min-w-[300px] absolute mt-[10px]">
                  <div class="mb-[30px]">
                    <div
                        class="bg-[#fff] overflow-hidden rounded-[15px] z-10 shadow-sm md:shadow-md lg:shadow-lg">
                      <div class="featured-image relative z-10 overflow-visible">
                        <a class="block overflow-hidden" href="#">
                          <div
                              class="absolute top-[22px] right-[10px] w-[30px] h-[30px] text-white text-[21px] z-10 cursor-pointer">
                            <font-awesome-icon :icon="['far', 'heart']" class="text-[23px]"/>
                          </div>
                        </a>
                        <a class="block overflow-hidden" href="#">
                          <img alt="/images/feature-12-768x512.png" class="w-full"
                               src="/images/feature-12-768x512.png">
                        </a>
                        <a class="block overflow-hidden absolute -bottom-[16px] right-[20px] h-[35px] w-[35px] border border-solid border-gray-300 rounded-[50%] z-20"
                           href="#">
                          <img alt="/images/u32.jpeg"
                               class="w-full h-full block transition-all duration-1500 ease-in-out max-h-full object-cover object-center"
                               src="/images/u32.jpeg">
                        </a>
                      </div>
                      <div class="content-item relative z-10 p-[20px]">
                        <div class="m-h-[72px] text-left">
                          <div class="relative line-height-14 leading-[14px] mb-[5px]">
                            <font-awesome-icon :icon="['fas', 'star']"
                                               class="text-[#FA5636] text-[10px]"/>
                            <font-awesome-icon :icon="['fas', 'star']"
                                               class="text-[#FA5636] text-[10px]"/>
                            <font-awesome-icon :icon="['fas', 'star']"
                                               class="text-[#FA5636] text-[10px]"/>
                            <font-awesome-icon :icon="['fas', 'star']"
                                               class="text-[#FA5636] text-[10px]"/>
                            <font-awesome-icon :icon="['fas', 'star']"
                                               class="text-[#FA5636] text-[10px]"/>
                          </div>
                          <h3 class="font-bold text-[18px] leading-[26px] mb-[5px] font-dmsans">
                            <nuxt-link class="hover:text-[rgba(59,113,254,0.9)]" to="/">
                              Castello Casole Hotel
                            </nuxt-link>
                          </h3>
                          <div
                              class="flex items-center font-[100] leading-[22px] font-sm text-[#5E6D77] font-dmsans">
                            <span>New York City</span>
                          </div>
                        </div>
                        <div class="mt-[20px] pt-[20px] border-t border-solid border-gray-300">
                          <div class="review mb-[10px] text-sm font-normal text-left">
                                    <span
                                        class="bg-[#f9fbff] border border-solid border-gray-300 rounded-[5px] font-bold text-sm leading-[20px] text-[#3B71FE] mr-[12px] py-[4px] px-[6px] relative">
                                      5 <span class="relative -top-[1px]">/</span> 5
                                    </span>
                            <span
                                class="font-bold text-sm leading-[20px] text-[#1A2B48] mr-[5px]">Excellent</span>
                            <span
                                class="font-normal text-sm leading-[22px] text-[#5E6D77]">(3 Reviews)</span>
                          </div>
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CustomMarker>
          </GoogleMap>
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