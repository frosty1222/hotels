<script lang="ts" setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import {onBeforeUnmount, onMounted, ref} from "vue";
import {Carousel, Slide} from "vue3-carousel";
import {initFlowbite} from 'flowbite'
import { useMessage } from "naive-ui";
const { restAPI } = useApi();
const message = useMessage();
const route = useRoute();
useHead(
    {
      title: "Activity Detail"
    }
)
let activityDataAll:any = []
const { data: resActivityAll } = await restAPI.cms.getSVActivity();
if (resActivityAll.value?.success) {
  activityDataAll = resActivityAll.value?.data;
  console.log("activityDataAll",activityDataAll)
}
const config = useRuntimeConfig();

const {t} = useI18n()

const settings = ref({
  dateCheckout: {
    data: [],
  },
  guests: {
    isShow: false,
    guestTotal: 1,
    roomTotal: 1,
    adult: 1,
    children: 0,
  },
  dateCheckin: {
    data: [],
    isShow: false
  },
  dateCheckout: {
    data: [],
    isShow: false
  },
  isShowFormReview: false,
})
let activityData:any = []
let params = {
  service_id:Number(route.params?.id) || 0,
  service_type:route.query?.type || ""
}
const { data: resActivity } = await restAPI.cms.getServicesByType(params);
if (resActivity.value?.success) {
  console.log("resActivity",resActivity.value?.data)
  activityData = resActivity.value?.data;
}
const stMainMenu = ref<HTMLElement | null>(null);
const stMainMenuDateCheckin = ref<HTMLElement | null>(null);
const stMainMenuDateCheckOut = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent): void => {
  if (stMainMenu.value && !stMainMenu.value.contains(event.target as Node)) {
    if (settings.value.guests.isShow) {
      settings.value.guests.isShow = false;
    }
  }

  if (stMainMenuDateCheckin.value && !stMainMenuDateCheckin.value.contains(event.target as Node)) {
    if (settings.value.dateCheckin.isShow) {
      settings.value.dateCheckin.isShow = false;
    }
  }

  if (stMainMenuDateCheckOut.value && !stMainMenuDateCheckOut.value.contains(event.target as Node)) {
    if (settings.value.dateCheckout.isShow) {
      settings.value.dateCheckout.isShow = false;
    }
  }
};

const action = ref(null);
const currentSlide = ref(0)
const isFirstSlide = ref(true)
const isLastSlide = ref(false)

const actionSlide = (next: boolean) => {
  if (next) {
    action.value?.next()
  } else {
    action.value?.prev();
  }
  action.value?.updateSlideWidth();
  currentSlide.value = action.value?.data.currentSlide.value
  isFirstSlide.value = action.value?.data.minSlide.value == currentSlide.value;
  isLastSlide.value = action.value?.data.maxSlide.value == Math.ceil(currentSlide.value);
  if (currentSlide.value > action.value?.data.maxSlide.value) {
    currentSlide.value = action.value?.data.maxSlide.value
  } else if (currentSlide.value < action.value?.data.minSlide.value) {
    currentSlide.value = action.value?.data.minSlide.value
  }
  action.value?.updateSlideWidth();
}

const slideModel = ref(1)

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  action.value?.updateSlideWidth()
  initFlowbite();
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="overflow-hidden">
    <div class="banner">
      <div
          class="background-breadcrumb bg-white bg-center bg-no-repeat bg-cover relative lg:pt-[151px] pt-[100px] lg:pb-[60px] pb-0 bg-[url(/images/banner-search-form.png)]">
        <div class="container w-full max-w-[1290px] mx-auto">
          <div class="relative z-10 lg:px-[80px] px-[15px]">
            <h1 class="text-white lg:text-[36px] text-[24px] lg:leading-[46px] leading-[24px] font-bold">Room Sheraton
              Hotel
            </h1>
            <div class="lg:py-[20px] pt-[10px] pb-[20px]">
              <div class="max-w-[1290px]">
                <ul class="block w-full relative">
                  <li class="inline-block lg:text-base text-sm lg:px-[20px] px-[10px] font-[500] text-white breadcrumb-element">
                    Home
                  </li>
                  <li class="inline-block lg:text-base text-sm lg:px-[20px] px-[10px] font-[500] text-white breadcrumb-element">
                    United
                    States
                  </li>
                  <li class="inline-block lg:text-base text-sm lg:px-[20px] px-[10px] font-[500] text-white breadcrumb-element">
                    California
                  </li>
                  <li class="inline-block lg:text-base text-sm lg:px-[20px] px-[10px] font-[500] text-[rgba(255,255,255,.6)] breadcrumb-element">
                    {{ activityData?.name}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container max-w-[1290px] lg:px-0 px-[20px] mx-auto">
      <div class="pt-[48px]">
        <div class="flex justify-between items-center">
          <div class="left flex items-center">
            <div class="ml-[10px] text-base text-[#5E6D77] mr-[10px]">
              <font-awesome-icon :icon="['fas', 'star']"
                                 class="text-[#ffb21d] mr-[5px]"/>
              (3 Reviews)
            </div>
            <div class="h-[3px] w-[3px] bg-[#c4c4c4] rounded-full inline-block"></div>
            <div class="ml-[10px] text-base text-[#5E6D77]">
              {{  activityData?.location_name }}
            </div>
          </div>
          <div class="right flex gap-3">
            <a class="rounded-full h-[44px] w-[44px] shadow-sm text-base bg-white leading-[44px] border border-gray-300 flex items-center justify-center"
               href="#">
              <font-awesome-icon :icon="['fas', 'play']" class="text-[#5E6D77]"/>
            </a>
            <a class="rounded-full h-[44px] w-[44px] shadow-sm text-base bg-white leading-[44px] border border-gray-300 flex items-center justify-center"
               href="#">
              <font-awesome-icon :icon="['fas', 'share']" class="text-[#5E6D77]"/>
            </a>
            <a class="rounded-full h-[44px] w-[44px] shadow-sm text-base bg-white leading-[44px] border border-gray-300 flex items-center justify-center"
               href="#">
              <font-awesome-icon :icon="['fas', 'heart']" class="text-[#5E6D77]"/>
            </a>
          </div>
        </div>
      </div>
      <div class="-mx-[20px]">
        <gallery :dataImage="activityData?.imageLink"/>
      </div>
      <div class="flex">
        <div class="lg:w-2/3 w-full lg:px-[12px]">
          <div class="flex flex-wrap justify-between items-start">
            <div
                class="grid lg:grid-cols-4 grid-cols-2 border-b border-gray-300 lg:justify-start justify-between lg:gap-10 gap-5 items-center w-full mt-[50px] mb-[40px] pb-[40px]">
              <p class="pr-[10px] text-center flex justify-start items-center gap-2">
                <span
                    class="border border-gray-300 shadow-sm md:shadow rounded-[10px] p-[1px] w-[50px] h-[50px] flex items-center justify-center text-center cursor-pointer mb-[6px]">
                  <font-awesome-icon :icon="['far', 'clock']"
                                     class="text-[20px] text-[#5E6D77]"/>
                </span>
                <br>
                <div class="flex flex-col justify-start items-start">
                  <span class="font-bold text-base leading-[26px] text-left w-full">Duration</span>
                  <span class="font-normal text-sm leading-[22px] text-[#5E6D77] text-left w-full">
                    S: 260m
                    <sup>2</sup>
                  </span>
                </div>
              </p>
              <p class="pr-[10px] text-center flex justify-start items-center gap-2">
                <span
                    class="border border-gray-300 shadow-sm md:shadow rounded-[10px] p-[1px] w-[50px] h-[50px] flex items-center justify-center text-center cursor-pointer mb-[6px]">
                  <font-awesome-icon :icon="['fas', 'shoe-prints']" class="text-[20px] text-[#5E6D77]"/>
                </span>
                <br>
                <div class="flex flex-col justify-start items-start">
                  <span class="font-bold text-base leading-[26px] text-left w-full">Tour Type</span>
                  <span class="font-normal text-sm leading-[22px] text-[#5E6D77] text-left w-full">
                    Daily Tour
                  </span>
                </div>
              </p>
              <p class="pr-[10px] text-center flex justify-start items-center gap-2">
                <span
                    class="border border-gray-300 shadow-sm md:shadow rounded-[10px] p-[1px] w-[50px] h-[50px] flex items-center justify-center text-center cursor-pointer mb-[6px]">
                  <font-awesome-icon :icon="['fas', 'user-group']" class="text-[20px] text-[#5E6D77]"/>
                </span>
                <br>
                <div class="flex flex-col justify-start items-start">
                  <span class="font-bold text-base leading-[26px] text-left w-full">Tour Type</span>
                  <span class="font-normal text-sm leading-[22px] text-[#5E6D77] text-left w-full">
                    5 people
                  </span>
                </div>
              </p>
              <p class="pr-[10px] text-center flex justify-start items-center gap-2">
                <span
                    class="border border-gray-300 shadow-sm md:shadow rounded-[10px] p-[1px] w-[50px] h-[50px] flex items-center justify-center text-center cursor-pointer mb-[6px]">
                  <font-awesome-icon :icon="['fas', 'language']" class="text-[20px] text-[#5E6D77]"/>
                </span>
                <br>
                <div class="flex flex-col justify-start items-start">
                  <span class="font-bold text-base leading-[26px] text-left w-full">Languages</span>
                  <span class="font-normal text-sm leading-[22px] text-[#5E6D77] text-left w-full">
                    {{ activityData.activity_languages[0].name }}
                  </span>
                </div>
              </p>
            </div>
          </div>
          <div class="description">
            <h2 class="font-bold text-2xl leading-10 text-heading-color mb-5">
              About this {{ params.service_type }}
            </h2>
            <p class="text-base leading-6 font-[100] text-[#727272] mb-4">
              {{ activityData?.description }}
            </p>
            <!-- <p class="text-base leading-6 font-[100] text-[#727272] mb-4">
              Our ultramodern glass bathroom is equipped with hairdryer, magnifying shaving and make up mirror as well
              as all the amenities you could possible need during your stay.
            </p>
            <p class="text-base leading-6 font-[100] text-[#727272] mb-4">
              A Complimentary Bottle of Wine, Fresh Fruit and Mineral Water, are provided on arrival. Electric current:
              220 Volts. Smoking rooms & inter-connecting rooms are also available.
            </p> -->
          </div>
          <div class="description">
            <h2 class="font-bold text-2xl leading-10 text-heading-color mb-5">
              Highlights
            </h2>
            <div class="mb-4 flex justify-start items-center gap-2" v-for="h in activityData.activity_facility?.highlighted" :key="h">
              <span class="w-[20px] h-[20px] rounded-full bg-[#cef2e5] text-[#10ac58] flex justify-center items-center">
                <font-awesome-icon :icon="['fas', 'check']" class="text-[10px]"/>
              </span>
              <p class="text-base text-[#5E6D77]">
                {{ h.name }}
              </p>
            </div>
            <!-- <div class="mb-4 flex justify-start items-center gap-2">
              <span class="w-[20px] h-[20px] rounded-full bg-[#cef2e5] text-[#10ac58] flex justify-center items-center">
                <font-awesome-icon :icon="['fas', 'check']" class="text-[10px]"/>
              </span>
              <p class="text-base text-[#5E6D77]">
                Visit eight villages showcasing Polynesian culture
              </p>
            </div>
            <div class="mb-4 flex justify-start items-center gap-2">
              <span class="w-[20px] h-[20px] rounded-full bg-[#cef2e5] text-[#10ac58] flex justify-center items-center">
                <font-awesome-icon :icon="['fas', 'check']" class="text-[10px]"/>
              </span>
              <p class="text-base text-[#5E6D77]">
                Visit eight villages showcasing Polynesian culture
              </p>
            </div>
            <div class="mb-4 flex justify-start items-center gap-2">
              <span class="w-[20px] h-[20px] rounded-full bg-[#cef2e5] text-[#10ac58] flex justify-center items-center">
                <font-awesome-icon :icon="['fas', 'check']" class="text-[10px]"/>
              </span>
              <p class="text-base text-[#5E6D77]">
                Visit eight villages showcasing Polynesian culture
              </p>
            </div> -->
          </div>
          <div class="attributes">
            <div class="my-[40px] w-full h-[1px] bg-[#EAEEF3]"></div>
            <div class="description">
              <h2 class="font-bold text-2xl leading-10 text-heading-color mb-5">
                Included/Excluded
              </h2>
              <div class="grid lg:grid-cols-2">
                <div>
                  <div class="mb-4 flex justify-start items-center gap-2"  v-for="h in activityData.activity_facility?.IncludedAndExcluded[0]?.include" :key="h">
                    <span
                        class="w-[20px] h-[20px] rounded-full bg-[#cef2e5] text-[#10ac58] flex justify-center items-center">
                      <font-awesome-icon :icon="['fas', 'check']" class="text-[10px]"/>
                    </span>
                    <p class="text-base text-[#5E6D77]">
                      {{ h.name }}
                    </p>
                  </div>
                  <!-- <div class="mb-4 flex justify-start items-center gap-2">
                    <span
                        class="w-[20px] h-[20px] rounded-full bg-[#cef2e5] text-[#10ac58] flex justify-center items-center">
                      <font-awesome-icon :icon="['fas', 'check']" class="text-[10px]"/>
                    </span>
                    <p class="text-base text-[#5E6D77]">
                      Visit eight villages showcasing Polynesian culture
                    </p>
                  </div>
                  <div class="mb-4 flex justify-start items-center gap-2">
                    <span
                        class="w-[20px] h-[20px] rounded-full bg-[#cef2e5] text-[#10ac58] flex justify-center items-center">
                      <font-awesome-icon :icon="['fas', 'check']" class="text-[10px]"/>
                    </span>
                    <p class="text-base text-[#5E6D77]">
                      Visit eight villages showcasing Polynesian culture
                    </p>
                  </div>
                  <div class="mb-4 flex justify-start items-center gap-2">
                    <span
                        class="w-[20px] h-[20px] rounded-full bg-[#cef2e5] text-[#10ac58] flex justify-center items-center">
                      <font-awesome-icon :icon="['fas', 'check']" class="text-[10px]"/>
                    </span>
                    <p class="text-base text-[#5E6D77]">
                      Visit eight villages showcasing Polynesian culture
                    </p>
                  </div> -->
                </div>
                <div>
                  <div class="mb-4 flex justify-start items-center gap-2" v-for="h in activityData.activity_facility?.IncludedAndExcluded[1]?.exclude" :key="h">
                    <span
                        class="w-[20px] h-[20px] rounded-full bg-[#fad6d6] text-[#da3838] flex justify-center items-center">
                      <font-awesome-icon :icon="['fas', 'xmark']" class="text-[10px]"/>
                    </span>
                    <p class="text-base text-[#5E6D77]">
                      {{ h.name }}
                    </p>
                  </div>
                  <!-- <div class="mb-4 flex justify-start items-center gap-2">
                    <span
                        class="w-[20px] h-[20px] rounded-full bg-[#fad6d6] text-[#da3838] flex justify-center items-center">
                      <font-awesome-icon :icon="['fas', 'xmark']" class="text-[10px]"/>
                    </span>
                    <p class="text-base text-[#5E6D77]">
                      Visit eight villages showcasing Polynesian culture
                    </p>
                  </div>
                  <div class="mb-4 flex justify-start items-center gap-2">
                    <span
                        class="w-[20px] h-[20px] rounded-full bg-[#fad6d6] text-[#da3838] flex justify-center items-center">
                      <font-awesome-icon :icon="['fas', 'xmark']" class="text-[10px]"/>
                    </span>
                    <p class="text-base text-[#5E6D77]">
                      Visit eight villages showcasing Polynesian culture
                    </p>
                  </div>
                  <div class="mb-4 flex justify-start items-center gap-2">
                    <span
                        class="w-[20px] h-[20px] rounded-full bg-[#fad6d6] text-[#da3838] flex justify-center items-center">
                      <font-awesome-icon :icon="['fas', 'xmark']" class="text-[10px]"/>
                    </span>
                    <p class="text-base text-[#5E6D77]">
                      Visit eight villages showcasing Polynesian culture
                    </p>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
          <div class="my-[40px] w-full h-[1px] bg-[#EAEEF3]"></div>
          <div class="single">
            <h2 class="font-bold text-2xl leading-10 mb-[20px]">Itinerary</h2>
            <div id="accordion-open" data-accordion="open">
              <div class="border border-gray-300 rounded-[16px] mb-[12px] bg-[#FCFCFC]" v-for="h in activityData.activity_facility?.itinerary" :key="h">
                <h2 id="accordion-open-heading-1">
                  <button aria-controls="accordion-open-body-1"
                          aria-expanded="false"
                          class="flex items-center justify-between w-full p-5 font-medium rtl:text-right !bg-transparent text-gray-500 gap-3"
                          data-accordion-target="#accordion-open-body-1"
                          type="button">
                  <span class="flex items-center">
                    <span class="px-[16px] py-[8px] border border-gray-300 rounded-[10px] mr-[16px]">
                      {{ h.time }}h
                    </span>
                    {{h.title}}
                  </span>
                    <svg aria-hidden="true" class="w-3 h-3 rotate-180 shrink-0" data-accordion-icon
                         fill="none" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 5 5 1 1 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2"/>
                    </svg>
                  </button>
                </h2>
                <div id="accordion-open-body-1" aria-labelledby="accordion-open-heading-1" class="hidden">
                  <div class="p-5">
                    <p class="mb-2 text-gray-500 dark:text-gray-400">{{ h.description }}</p>
                    <!-- <p class="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a
                        class="text-blue-600 dark:text-blue-500 hover:underline"
                        href="/docs/getting-started/introduction/">get started</a> and start developing
                      websites even faster with components on top of Tailwind CSS.</p> -->
                  </div>
                </div>
              </div>
              <!-- <div class="border border-gray-300 rounded-[16px] mb-[12px] bg-[#FCFCFC]">
                <h2 id="accordion-open-heading-2">
                  <button aria-controls="accordion-open-body-2"
                          aria-expanded="false"
                          class="flex items-center justify-between w-full p-5 font-medium rtl:text-right !bg-transparent text-gray-500 gap-3"
                          data-accordion-target="#accordion-open-body-2"
                          type="button">
                  <span class="flex items-center">
                    <span class="px-[16px] py-[8px] border border-gray-300 rounded-[10px] mr-[16px]">
                      Day 2
                    </span>
                    Accommodation
                  </span>
                    <svg aria-hidden="true" class="w-3 h-3 rotate-180 shrink-0" data-accordion-icon
                         fill="none" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 5 5 1 1 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2"/>
                    </svg>
                  </button>
                </h2>
                <div id="accordion-open-body-2" aria-labelledby="accordion-open-heading-2" class="hidden">
                  <div class="p-5">
                    <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is first conceptualized and designed using
                      the Figma software so everything you see in the library has a design equivalent in our Figma
                      file.</p>
                    <p class="text-gray-500 dark:text-gray-400">Check out the <a
                        class="text-blue-600 dark:text-blue-500 hover:underline"
                        href="https://flowbite.com/figma/">Figma
                      design system</a> based on the utility classes from Tailwind CSS and components from Flowbite.</p>
                  </div>
                </div>
              </div>
              <div class="border border-gray-300 rounded-[16px] mb-[12px] bg-[#FCFCFC]">
                <h2 id="accordion-open-heading-3">
                  <button aria-controls="accordion-open-body-3"
                          aria-expanded="false"
                          class="flex items-center justify-between w-full p-5 font-medium rtl:text-right !bg-transparent text-gray-500 gap-3"
                          data-accordion-target="#accordion-open-body-3"
                          type="button">
                  <span class="flex items-center">
                    <span class="px-[16px] py-[8px] border border-gray-300 rounded-[10px] mr-[16px]">
                      Day 3
                    </span>
                    Meals
                  </span>
                    <svg aria-hidden="true" class="w-3 h-3 rotate-180 shrink-0" data-accordion-icon
                         fill="none" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 5 5 1 1 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2"/>
                    </svg>
                  </button>
                </h2>
                <div id="accordion-open-body-3" aria-labelledby="accordion-open-heading-3" class="hidden">
                  <div class="p-5">
                    <p class="mb-2 text-gray-500 dark:text-gray-400">The main difference is that the core components
                      from
                      Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another
                      difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI
                      offers
                      sections of pages.</p>
                    <p class="mb-2 text-gray-500 dark:text-gray-400">However, we actually recommend using both Flowbite,
                      Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the
                      best
                      of two worlds.</p>
                    <p class="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
                    <ul class="ps-5 text-gray-500 list-disc dark:text-gray-400">
                      <li><a class="text-blue-600 dark:text-blue-500 hover:underline" href="https://flowbite.com/pro/">Flowbite
                        Pro</a></li>
                      <li><a class="text-blue-600 dark:text-blue-500 hover:underline" href="https://tailwindui.com/"
                             rel="nofollow">Tailwind UI</a></li>
                    </ul>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
          <div class="attributes">
            <div class="my-[40px] w-full h-[1px] bg-[#EAEEF3]"></div>
            <div class="hotel-facilities mb-[40px]">
              <h2 class="font-bold text-2xl leading-10 mb-[20px]">Durations</h2>
              <div class="-mb-[20px]">
                <div class="grid lg:grid-cols-3">
                  <div class="block"  v-for="h in activityData.activity_facility?.duration" :key="h">
                    <div class="flex items-center gap-3 font-normal text-base leading-6 text-[#5E6D77] pb-5">
                      <font-awesome-icon :icon="['fas', 'tag']" class="text-2xl"/>
                      {{ h }}
                    </div>
                  </div>
                  <!-- <div class="block">
                    <div class="flex items-center gap-3 font-normal text-base leading-6 text-[#5E6D77] pb-5">
                      <font-awesome-icon :icon="['fas', 'tag']" class="text-2xl"/>
                      5 – 7 hours
                    </div>
                  </div>
                  <div class="block">
                    <div class="flex items-center gap-3 font-normal text-base leading-6 text-[#5E6D77] pb-5">
                      <font-awesome-icon :icon="['fas', 'tag']" class="text-2xl"/>
                      Fullday (+7hours)
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
          <div class="attributes">
            <div class="hotel-facilities mb-[40px]">
              <h2 class="font-bold text-2xl leading-10 mb-[20px]">Language</h2>
              <div class="-mb-[20px]">
                <div class="grid lg:grid-cols-3">
                  <div class="block" v-for="h in activityData?.activity_languages" :key="h">
                    <div class="flex items-center gap-3 font-normal text-base leading-6 text-[#5E6D77] pb-5">
                      <font-awesome-icon :icon="['fas', 'tag']" class="text-2xl"/>
                      {{ h.name }}
                    </div>
                  </div>
                  <!-- <div class="block">
                    <div class="flex items-center gap-3 font-normal text-base leading-6 text-[#5E6D77] pb-5">
                      <font-awesome-icon :icon="['fas', 'tag']" class="text-2xl"/>
                      Espanol
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
          <div class="single">
            <h2 class="font-bold text-2xl leading-10 mb-[20px]">Frequently asked questions</h2>
            <div id="accordion-open1" data-accordion="open">
              <div class="border border-gray-300 rounded-[16px] mb-[12px] bg-[#FCFCFC]">
                <h2 id="accordion-open-heading-4">
                  <button aria-controls="accordion-open-body-4"
                          aria-expanded="false"
                          class="flex items-center justify-between w-full p-5 font-medium rtl:text-right !bg-transparent text-gray-500 gap-3"
                          data-accordion-target="#accordion-open-body-4"
                          type="button">
                  <span class="flex gap-2 items-center">
                    <font-awesome-icon :icon="['far', 'circle-question']"/>
                    Eum eu sumo albucius perfecto
                  </span>
                    <svg aria-hidden="true" class="w-3 h-3 rotate-180 shrink-0" data-accordion-icon
                         fill="none" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 5 5 1 1 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2"/>
                    </svg>
                  </button>
                </h2>
                <div id="accordion-open-body-4" aria-labelledby="accordion-open-heading-4" class="hidden">
                  <div class="p-5">
                    <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive
                      components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and
                      more.</p>
                    <p class="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a
                        class="text-blue-600 dark:text-blue-500 hover:underline"
                        href="/docs/getting-started/introduction/">get started</a> and start developing
                      websites even faster with components on top of Tailwind CSS.</p>
                  </div>
                </div>
              </div>
              <div class="border border-gray-300 rounded-[16px] mb-[12px] bg-[#FCFCFC]">
                <h2 id="accordion-open-heading-5">
                  <button aria-controls="accordion-open-body-5"
                          aria-expanded="false"
                          class="flex items-center justify-between w-full p-5 font-medium rtl:text-right !bg-transparent text-gray-500 gap-3"
                          data-accordion-target="#accordion-open-body-5"
                          type="button">
                  <span class="flex gap-2 items-center">
                    <font-awesome-icon :icon="['far', 'circle-question']"/>
                    Te his eros ludus tibique.
                  </span>
                    <svg aria-hidden="true" class="w-3 h-3 rotate-180 shrink-0" data-accordion-icon
                         fill="none" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 5 5 1 1 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2"/>
                    </svg>
                  </button>
                </h2>
                <div id="accordion-open-body-5" aria-labelledby="accordion-open-heading-5" class="hidden">
                  <div class="p-5">
                    <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is first conceptualized and designed using
                      the Figma software so everything you see in the library has a design equivalent in our Figma
                      file.</p>
                    <p class="text-gray-500 dark:text-gray-400">Check out the <a
                        class="text-blue-600 dark:text-blue-500 hover:underline"
                        href="https://flowbite.com/figma/">Figma
                      design system</a> based on the utility classes from Tailwind CSS and components from Flowbite.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="single pt-[40px]">
            <h2 class="font-bold text-2xl leading-10 mb-[20px]">Tour's Location</h2>
            <div class="flex">
              <div class="w-full">
                <MapsPanorama/>
              </div>
            </div>
          </div>
          <div class="single pt-[40px]">
            <h2 class="font-bold text-[26px] leading-10 mb-[20px]">Bulk discount (by Amount)</h2>
            <div class="description mb-[8px] text-[18px] leading-[26px] font-bold">
              <h5>Bulk discount adult</h5>
            </div>
            <div class="flex">
              <div class="w-full">
                <div class="review-box border border-gray-300 rounded-[10px]">
                  <div class="relative overflow-x-auto">
                    <table
                        class="w-full text-sm text-left rounded-[10px] rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700">
                      <tr>
                        <th class="text-base font-bold bg-[#fcfcfc] text-black border-0 border-b-0 border-b-[#dedede] rounded-[10px] px-[20px] py-[10px]"
                            scope="col">
                          #
                        </th>
                        <th class="text-base font-bold bg-[#fcfcfc] text-black border-0 border-b-0 border-b-[#dedede] rounded-[10px] px-[20px] py-[10px]"
                            scope="col">
                          Discount group
                        </th>
                        <th class="text-base font-bold bg-[#fcfcfc] text-black border-0 border-b-0 border-b-[#dedede] rounded-[10px] px-[20px] py-[10px]"
                            scope="col">
                          To adult
                        </th>
                        <th class="text-base font-bold bg-[#fcfcfc] text-black border-0 border-b-0 border-b-[#dedede] rounded-[10px] px-[20px] py-[10px]"
                            scope="col">
                          Price
                        </th>
                        <th class="text-base font-bold bg-[#fcfcfc] text-black border-0 border-b-0 border-b-[#dedede] rounded-[10px] px-[20px] py-[10px]"
                            scope="col">
                          Value
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <th class="px-[20px] w-5 py-[10px] text-base font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            scope="row">
                          1
                        </th>
                        <td class="px-[20px] py-[10px] text-base text-[#5E6D77]">
                          From 2
                        </td>
                        <td class="px-[20px] py-[10px] text-base text-[#5E6D77]">
                          2
                        </td>
                        <td class="px-[20px] py-[10px] text-base text-[#5E6D77]">
                          2
                        </td>
                        <td class="px-[20px] py-[10px] text-base text-[#5E6D77]">
                          €800.00
                        </td>
                      </tr>
                      <tr>
                        <th class="px-[20px] py-[10px] text-base font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            scope="row">
                          2
                        </th>
                        <td class="px-[20px] py-[10px] text-base text-[#5E6D77]">
                          From 2
                        </td>
                        <td class="px-[20px] py-[10px] text-base text-[#5E6D77]">
                          2
                        </td>
                        <td class="px-[20px] py-[10px] text-base text-[#5E6D77]">
                          3
                        </td>
                        <td class="px-[20px] py-[10px] text-base text-[#5E6D77]">
                          €800.00
                        </td>
                      </tr>
                      <tr>
                        <th class="px-[20px] py-[10px] text-base font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            scope="row">
                          3
                        </th>
                        <td class="px-[20px] py-[10px] text-base text-[#5E6D77]">
                          From 2
                        </td>
                        <td class="px-[20px] py-[10px] text-base text-[#5E6D77]">
                          2
                        </td>
                        <td class="px-[20px] py-[10px] text-base text-[#5E6D77]">
                          4
                        </td>
                        <td class="px-[20px] py-[10px] text-base text-[#5E6D77]">
                          €800.00
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="single pt-[40px]">
            <h2 class="font-bold text-[26px] leading-10 mb-[20px]">Reviews</h2>
            <div class="flex">
              <div class="w-full">
                <div class="review-box border border-gray-300 rounded-[20px] bg-[#fcfcfc] p-[30px]">
                  <div class="flex items-center mb-[15px]">
                    <font-awesome-icon :icon="['fas', 'star']" class="text-[22px] text-[#ffb21d]"/>
                    <div class="review-score ml-[5px] text-[22px] font-bold leading-[32px]">
                      {{ activityData.review_activities?.length }}
                      <span>/5</span>
                    </div>
                    <div class="review-score ml-[5px] text-[22px] font-bold leading-[32px]">
                     
                    </div> Excellent
                    <div class="review-score ml-[10px] text-base text-[#5E6D77] font-bold leading-[32px]">
                      ({{ activityData.review_activities?.length || 0}} reviews)
                    </div>
                  </div>
                  <div class="grid lg:grid-cols-2 gap-10">
                    <div class="w-full flex items-center justify-between">
                      <div class="w-[40%]">Cleanliness</div>
                      <div class="h-[4px] w-[40%] rounded-[10px] bg-[#4CBB7F]"></div>
                      <div class="text-base leading-[26px]">
                        5/5
                      </div>
                    </div>
                    <div class="w-full flex items-center justify-between">
                      <div class="w-[40%]">Accuracy</div>
                      <div class="h-[4px] w-[40%] rounded-[10px] bg-[#4CBB7F]"></div>
                      <div class="text-base leading-[26px]">
                        5/5
                      </div>
                    </div>
                    <div class="w-full flex items-center justify-between">
                      <div class="w-[40%]">Communication</div>
                      <div class="h-[4px] w-[40%] rounded-[10px] bg-[#4CBB7F]"></div>
                      <div class="text-base leading-[26px]">
                        5/5
                      </div>
                    </div>
                    <div class="w-full flex items-center justify-between">
                      <div class="w-[40%]">Location</div>
                      <div class="h-[4px] w-[40%] rounded-[10px] bg-[#4CBB7F]"></div>
                      <div class="text-base leading-[26px]">
                        5/5
                      </div>
                    </div>
                    <div class="w-full flex items-center justify-between">
                      <div class="w-[40%]">Check-in</div>
                      <div class="h-[4px] w-[40%] rounded-[10px] bg-[#4CBB7F]"></div>
                      <div class="text-base leading-[26px]">
                        5/5
                      </div>
                    </div>
                    <div class="w-full flex items-center justify-between">
                      <div class="w-[40%]">Value</div>
                      <div class="h-[4px] w-[40%] rounded-[10px] bg-[#4CBB7F]"></div>
                      <div class="text-base leading-[26px]">
                        5/5
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="single">
            <div class="mt-[30px] text-center text-sm text-[#5E6D77]">
              {{ activityData.review_activities?.length || 0}} reviews on this Activity - Showing 1 to {{ activityData.review_activities?.length }}
            </div>
            <div v-for="item in activityData.review_activities" :key="item" class="mt-[30px]">
              <div class="py-[30px] border-t border-gray-300 text-sm">
                <div class="flex justify-between items-center">
                  <div class="flex items-center">
                    <div class="left pr-[16px] rounded-full">
                      <img alt="/images/u32.jpeg" class="w-[50px] h-[50px] rounded-full" src="/images/u32.jpeg">
                    </div>
                    <div class="right table-cell">
                      <div class="text-base font-medium leading-[26px]">{{ item.name }}</div>
                      <div class="text-sm leading-[22px] text-center text-[#5E6D77]">{{ item.createdAt }}</div>
                    </div>
                  </div>
                  <div class="flex gap-2 items-center">
                    <font-awesome-icon :icon="['far', 'thumbs-up']" class="text-gray-500 text-base"/>
                    <span class="text-base">2</span>
                  </div>
                </div>
                <div class="flex mt-[18px]">
                  <ul>
                    <li class="inline-block mr-[6px]"   v-for="i in Math.round((item.sleep_star + item.location_star + item.service_star + item.weather_star) / 4)" :key="i">
                      <font-awesome-icon :icon="['fas', 'star']" class="text-sm text-[#ffb21d]"/>
                    </li>
                    <!-- <li class="inline-block mr-[6px]">
                      <font-awesome-icon :icon="['fas', 'star']" class="text-sm text-[#ffb21d]"/>
                    </li>
                    <li class="inline-block mr-[6px]">
                      <font-awesome-icon :icon="['fas', 'star']" class="text-sm text-[#ffb21d]"/>
                    </li>
                    <li class="inline-block mr-[6px]">
                      <font-awesome-icon :icon="['fas', 'star']" class="text-sm text-[#ffb21d]"/>
                    </li>
                    <li class="inline-block mr-[6px]">
                      <font-awesome-icon :icon="['fas', 'star']" class="text-sm text-[#ffb21d]"/>
                    </li> -->
                  </ul>
                </div>
                <div class="mt-[12px]">
                  <p class="font-normal text-base text-[#74818a]">
                   {{ item.note}}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <button
                  class="flex justify-between items-center gap-3 text-white bg-[#3B71FE] hover:bg-[rgba(59,113,254,0.9)] rounded-full py-[15px] px-[20px]"
                  @click="settings.isShowFormReview = !settings.isShowFormReview">
                Write a review
                <font-awesome-icon v-if="!settings.isShowFormReview" :icon="['fas', 'chevron-down']"/>
                <font-awesome-icon v-else :icon="['fas', 'chevron-up']"/>
              </button>
            </div>
            <div v-show="settings.isShowFormReview"
                 class="mt-[30px]">
              <h3 class="font-bold text-2xl leading-10 mb-[20px]">Leave a review</h3>
              <form>
                <p class="mt-[10px] mb-[30px] text-base text-[#5E6D77]">Your email address will not be
                  published. Required
                  fields are marked *</p>
                <div class="grid lg:grid-cols-2 gap-x-5">
                  <div class="lg:col-span-1 col-span-2">
                    <div class="mb-[24px]">
                      <input
                          class="rounded-[10px] bg-white border border-gray-300 py-[10px] px-[15px] font-normal text-base leading-[26px] text-[#83929d] w-full"
                          name="author"
                          placeholder="Name *"
                          type="text">
                    </div>
                  </div>
                  <div class="lg:col-span-1 col-span-2">
                    <div class="mb-[24px]">
                      <input
                          class="rounded-[10px] bg-white border border-gray-300 py-[10px] px-[15px] font-normal text-base leading-[26px] text-[#83929d] w-full"
                          name="email"
                          placeholder="Email *"
                          type="email">
                    </div>
                  </div>
                  <div class="col-span-2">
                    <div class="mb-[24px]">
                      <input
                          class="rounded-[10px] bg-white border border-gray-300 py-[10px] px-[15px] font-normal text-base leading-[26px] text-[#83929d] w-full"
                          name="title"
                          placeholder="Title *"
                          type="text">
                    </div>
                  </div>
                </div>
                <div class="mb-[24px] rounded-[10px] border border-gray-300 px-[15px] py-[20px]">
                  <div class="grid sm:grid-cols-2">
                    <div v-for="vote in settings.votes" class="grid grid-cols-2 mb-[10px]">
                      <label class="font-normal text-base leading-[26px]">{{ vote.label }}</label>
                      <div>
                        <ul class="relative">
                          <li v-for="(star, index) in vote.stars" :key="index"
                              class="inline-block mr-[6px]">
                            <font-awesome-icon :class="{
                            '!text-[#ffb21d]': index <= vote.activeIndex || index <= vote.lock
                          }" :icon="['fas', 'star']" class="text-sm text-[#a1abb3] cursor-pointer"
                                               @click="lockVote(vote.label.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-').replace(/-/g, ''), index)"
                                               @mouseenter="setActive(vote.label.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-').replace(/-/g, ''), index)"
                                               @mouseleave="resetActive(vote.label.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-').replace(/-/g, ''))"/>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="mb-[24px]">
                  <textarea
                      class="min-h-[185px] resize-none bg-white border border-gray-300 rounded-[10px] w-full font-normal text-[#83929d] text-base py-[10px] px-[15px]"
                      name="comment"
                      placeholder="Content *"></textarea>
                  </div>
                  <button
                      class="rounded-full text-white py-[15px] px-[20px] bg-[#3B71FE] hover:bg-[rgba(59,113,254,0.9)] text-sm">
                    POST REVIEW
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="lg:w-1/3 lg:block hidden">
          <div class="lg:mt-[30px]">
            <div class="py-[30px] px-[24px] border border-gray-300 rounded-[20px] shadow-sm">
              <div class="flex justify-center items-center font-normal text-sm text-[#5E6D77] mb-[20px]">
                From
                <span class="price px-[5px] font-bold text-[18px] leading-[26px] text-black">€200.00</span>
                <span class="unit">/night</span>
              </div>
              <div class="border border-gray-300 rounded-[20px]">
                <div class="grid grid-cols-2 relative">
                  <div ref="stMainMenuDateCheckin" class="p-[16px] cursor-pointer border-r border-b border-gray-300">
                    <div class="relative"
                         @click="settings.dateCheckin.isShow = !settings.dateCheckin.isShow">
                      <label class="text-base leading-[26px]">
                        Check In
                      </label>
                      <div class="text-base leading-[26px] text-[#5E6D77]">
                        17/02/2024
                      </div>
                    </div>
                    <div v-show="settings.dateCheckin.isShow"
                         class="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
                      <VueTailwindDatePicker
                          v-model="settings.dateCheckin.data"
                          :shortcuts="false"
                          class="whitespace-no-wrap"
                          no-input
                          separator="to"
                      />
                    </div>
                  </div>
                  <div ref="stMainMenuDateCheckOut" class="p-[16px] cursor-pointer border-b border-gray-300">
                    <div class="relative"
                         @click="settings.dateCheckout.isShow = !settings.dateCheckout.isShow;">
                      <label class="text-base leading-[26px]">
                        Check Out
                      </label>
                      <div class="text-base leading-[26px] text-[#5E6D77]">
                        17/02/2024
                      </div>
                    </div>
                    <div v-show="settings.dateCheckout.isShow"
                         class="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
                      <VueTailwindDatePicker
                          v-model="settings.dateCheckout.data"
                          :shortcuts="false"
                          class="whitespace-no-wrap"
                          no-input
                          separator="to"
                      />
                    </div>
                  </div>
                </div>
                <div ref="stMainMenu" class="p-[20px] cursor-pointer relative h-full">
                  <div class="relative" @click="settings.guests.isShow = !settings.guests.isShow">
                    <label class="text-base leading-[26px]">Guests</label>
                    <div class="text-base leading-[26px] text-[#5E6D77]">
                      {{ settings.guests.guestTotal }} guest,{{ settings.guests.roomTotal }} room
                    </div>
                  </div>
                  <ul v-if="settings.guests.isShow" style="
                    inset: 0px auto auto 0px;
                    margin: 0px;
                    transform: translate(0px, 94px);
                    position: absolute;
                    background: #fff;
                    border: 1px solid #dedede;
                    box-sizing: border-box;
                    box-shadow: 0 1px 2px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.05);
                    border-radius: 20px;
                    padding: 30px;
                    min-width: 100%;
                    margin-top: 16px!important;
                    z-index: 99;
                ">
                    <li class="flex items-center !justify-between text-base font-dmsans !pb-[19px] !mb-[19px] border-b border-solid border-[#dedede]">
                      <label>
                        {{ t('common.rooms') }}
                      </label>
                      <div class="flex items-center !justify-between text-base font-dmsans">
                        <button
                            class="cursor-pointer rounded-full border border-solid border-[#5E6D77] w-[34px] h-[34px] text-[#5E6D77]"
                            @click.prevent="changeGuest('reduce', 'roomTotal')">
                          -
                        </button>
                        <div class="w-[35px] font-medium text-base text-center leading-5 text-[#5E6D77]">
                          {{ settings.guests.roomTotal }}
                        </div>
                        <button
                            class="cursor-pointer rounded-full border border-solid border-[#5E6D77] w-[34px] h-[34px] text-[#5E6D77]"
                            @click.prevent="changeGuest('decrement', 'roomTotal')">
                          +
                        </button>
                      </div>
                    </li>
                    <li class="flex items-center !justify-between text-base font-dmsans !pb-[19px] !mb-[19px] border-b border-solid border-[#dedede]">
                      <label>
                        {{ t('common.adults') }}
                      </label>
                      <div class="flex items-center !justify-between text-base font-dmsans">
                        <button
                            class="cursor-pointer rounded-full border border-solid border-[#5E6D77] w-[34px] h-[34px] text-[#5E6D77]"
                            @click.prevent="changeGuest('reduce', 'adult')">
                          -
                        </button>
                        <div class="w-[35px] font-medium text-base text-center leading-5 text-[#5E6D77]">
                          {{ settings.guests.adult }}
                        </div>
                        <button
                            class="cursor-pointer rounded-full border border-solid border-[#5E6D77] w-[34px] h-[34px] text-[#5E6D77]"
                            @click.prevent="changeGuest('decrement', 'adult')">
                          +
                        </button>
                      </div>
                    </li>
                    <li class="flex items-center !justify-between text-base font-dmsans">
                      <label>
                        {{ t('common.childrens') }}
                      </label>
                      <div class="flex items-center !justify-between text-base font-dmsans">
                        <button
                            class="cursor-pointer rounded-full border border-solid border-[#5E6D77] w-[34px] h-[34px]
                          text-[#5E6D77]"
                            @click.prevent="changeGuest('reduce', 'children')">
                          -
                        </button>
                        <div class="w-[35px] font-medium text-base text-center leading-5 text-[#5E6D77]">
                          {{ settings.guests.children }}
                        </div>
                        <button
                            class="cursor-pointer rounded-full border border-solid border-[#5E6D77] w-[34px] h-[34px] text-[#5E6D77]"
                            @click.prevent="changeGuest('decrement', 'children')">
                          +
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="p-[20px] pb-0">
                  <label class="text-sm text-[#5E6D77] font-normal mb-[20px] pt-[25px]">Guest Name *</label>
                  <div class="my-[20px] guest-info flex">
                    <select class="border-t-0 border-l-0 border-r-0 border-gray-300 appearance-none">
                      <option>Mr</option>
                      <option>Miss</option>
                      <option>Mrs</option>
                    </select>
                    <input class="border-t-0 border-l-0 border-r-0 border-b ml-[20px] w-full border-gray-300"
                           placeholder="Guest  name"
                           value="">
                  </div>
                </div>
              </div>
              <div class="px-[25px] py-[20px] flex flex-col items-center justify-center">
                <button
                    class="flex justify-between items-center gap-3 text-[#3B71FE] px-[20px]"
                    @click="settings.isShowFormReview = !settings.isShowFormReview">
                  More Option
                  <font-awesome-icon v-if="!settings.isShowFormReview" :icon="['fas', 'chevron-down']"/>
                  <font-awesome-icon v-else :icon="['fas', 'chevron-up']"/>
                </button>
                <div v-show="settings.isShowFormReview"
                     class="mt-[10px] flex w-full justify-between items-center guest-info">
                  <span class="text-base font-normal leading-[26px] text-[#5E6D77]">Motor Rent(€50.00)</span>
                  <select
                      class="border border-gray-300 rounded-[0.25rem] !px-[0.75rem] !py-[0.375rem] appearance-none w-[70px]">
                    <option v-for="item in 10" :key="item"> {{ item }}</option>
                  </select>
                </div>
              </div>
              <div class="flex justify-center items-center">
                <button
                    class="mt-[15px] rounded-full text-white py-[15px] px-[35px] bg-[#3B71FE] hover:bg-[rgba(59,113,254,0.9)] text-base">
                  Reserve
                </button>
              </div>
            </div>
            <member-since/>
          </div>
        </div>
      </div>
      <div class="my-[70px] w-full h-[1px] bg-[#EAEEF3]"></div>
      <div class="lg:mb-[100px] mb-[50px]">
        <h2 class="font-bold text-[36px] leading-[46px] lg:mb-[100px] mb-[40px]">Explore other options</h2>
        <div class="w-full">
          <div class="news-content w-full">
            <div class="relative">
              <div class="absolute -top-[70px] right-0 lg:block hidden">
                <div class="flex gap-3">
                  <button
                      :class="{
                          'bg-[#DEE1E2]': isFirstSlide,
                          'bg-white': !isFirstSlide
                        }"
                      :disabled="isFirstSlide"
                      class="btn-carousel w-[40px] h-[40px] bg-[#fff] flex justify-center items-center border border-solid border-gray-300 rounded-full"
                      @click="actionSlide(false)">
                    <font-awesome-icon :icon="['fas', 'chevron-left']" class="text-sm w-auto h-auto"/>
                  </button>
                  <button
                      :class="{
                          'bg-[#DEE1E2]': isLastSlide,
                          'bg-white': !isLastSlide
                        }"
                      :disabled="isLastSlide"
                      class="btn-carousel w-[40px] h-[40px] bg-[#fff] flex justify-center items-center border border-solid border-gray-300 rounded-full"
                      @click="actionSlide(true)">
                    <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-sm w-auto h-auto"/>
                  </button>
                </div>
              </div>
              <div class="overflow-hidden px-0 carousel-box -mx-[10px]">
                <carousel
                    ref="action"
                    v-model="slideModel"
                    :breakpoints="{
                        1024: {
                            itemsToShow: 4,
                            itemsToScroll: 4,
                        },
                        640: {
                            itemsToShow: 2,
                            itemsToScroll: 2,
                        },
                        375: {
                            itemsToShow: 1,
                            itemsToScroll: 1,
                        }
                      }"
                    :items-to-show="4"
                >
                  <slide v-for="slide in activityDataAll" :key="slide">
                    <div class="px-[10px] pb-[20px] col">
                      <div class="bg-[#fff] shadow-sm md:shadow-lg rounded-[15px] overflow-hidden">
                        <div class="overflow-visible w-full relative">
                          <nuxt-link class="block overflow-hidden" to="/">
                            <img alt="/images/glaciar-vatnajokull-768x512.jpg"
                                 class="w-full h-full block transition-all duration-1500 ease-in-out"
                                 :src="`${config.public.baseURL}/photo/${slide.imageLink[0].fileName}`">
                          </nuxt-link>
                          <a class="block overflow-hidden" href="#">
                            <div
                                class="absolute top-[22px] right-[10px] w-[30px] h-[30px] text-white text-[21px] z-10 cursor-pointer">
                              <font-awesome-icon :icon="['far', 'heart']" class="text-[23px]"/>
                            </div>
                          </a>
                          <a
                              class="block overflow-hidden absolute -bottom-[16px] right-[20px] h-[35px] w-[35px] border border-solid border-gray-300 rounded-[50%]"
                              href="#">
                            <img alt="/images/u32.jpeg"
                                 class="w-full h-full block transition-all duration-1500 ease-in-out max-h-full object-cover object-center"
                                 src="/images/u32.jpeg">
                          </a>
                        </div>
                        <div class="relative p-[20px] overflow-hidden">
                          <h3 class="font-bold text-[18px] leading-[26px] mb-[20px] text-left">
                            <nuxt-link class="inline-block text-left line-clamp-2 hover:text-[rgba(59,113,254,0.9)]"
                                       to="/">{{ slide.name }}
                            </nuxt-link>
                          </h3>
                          <div class="flex flex-col justify-start items-start">
                            <div class="flex justify-start items-center gap-3">
                              <div class="flex items-center justify-start gap-1">
                                <font-awesome-icon :icon="['fas', 'star']" class="text-[#ffb21d] text-base"/>
                                <p class="font-bold text-base text-[#1A2B48] mt-1">
                                  {{ Number(slide.star_category.name) }}
                                </p>
                              </div>
                              <p class="text-sm text-[#5E6D77] leading-[22px] font-normal mt-1">
                                ({{ slide.review_activities?.length || 0 }} Reviews)
                              </p>
                            </div>
                          </div>
                          <div
                              class="price-wrapper border-t border-gray-300 pt-[20px] mt-[20px] mb-[10px] flex flex-col justify-start">
                            <div class="flex flex-1 w-full">
                              <del class="font-normal text-sm text-[#b1bac1] ml-2 leading-[16px]">
                                €{{ slide.from_price }}
                              </del>
                            </div>
                            <div class="flex justify-between items-center">
                              <div class="price font-bold text-base leading-[26px] text-left">
                              <span class="font-normal text-sm text-[#5E6D77] mr-1">
                                From
                              </span>
                                <span>
                                €350.00
                              </span>
                              </div>
                              <div class="flex justify-between items-center gap-2 text-sm text-[#5E6D77]">
                                <font-awesome-icon :icon="['far', 'clock']"/>
                                {{ slide.activity_duration_category.name }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </slide>
                </carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.guest-info select:not([size]) {
  background-image: none;
  padding: 0;
}

.background-breadcrumb {
  position: relative;

  &:after {
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    position: absolute;
    background-color: rgba(0, 0, 0, .3);
  }

  .breadcrumb-element {

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      &::after {
        width: 0;
        height: 0;
      }
    }

    &::after {
      border-radius: 50%;
      position: absolute;
      content: "";
      top: 50%;
      margin-top: -2px;
      margin-left: 10px !important;
      width: 4px;
      height: 4px;
      background: #EAEEF3;
      z-index: 1;
    }

    @media (min-width: 1024px) {
      &::after {
        margin-left: 20px !important;
      }
    }
  }
}

.news-content {
  img:hover {
    filter: brightness(100%) contrast(100%) saturate(100%) blur(0px) hue-rotate(0deg);
    transform: scale(1.1);
  }
}
</style>