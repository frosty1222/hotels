<script lang="ts" setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import {onBeforeUnmount, onMounted, ref} from "vue";
import {Carousel, Slide} from "vue3-carousel";

useHead(
    {
      title: "Room Detail"
    }
)

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
                    Studio
                    Allston Hotel
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
            <div class="ml-[10px] text-base text-[#5E6D77]">
              <font-awesome-icon :icon="['fas', 'location-dot']" class="mr-[5px]"/>
              Los Angeles
            </div>
          </div>
          <div class="right">
            <a class="rounded-full h-[44px] w-[44px] shadow-sm text-base bg-white leading-[44px] border border-gray-300 flex items-center justify-center"
               href="#">
              <font-awesome-icon :icon="['fas', 'share']" class="text-[#5E6D77]"/>
            </a>
          </div>
        </div>
      </div>
      <div class="-mx-[20px]">
        <gallery/>
      </div>
      <div class="flex">
        <div class="lg:w-2/3 w-full lg:px-[12px]">
          <div class="flex flex-wrap justify-between items-start">
            <div
                class="grid lg:grid-cols-4 grid-cols-2 border-b border-gray-300 lg:justify-start justify-between lg:gap-10 gap-5 items-center w-full mt-[50px] mb-[40px] pb-[40px]">
              <p class="pr-[10px] text-center flex justify-start items-center gap-2">
                <span
                    class="border border-gray-300 shadow-sm md:shadow rounded-[10px] p-[1px] w-[40px] h-[40px] flex items-center justify-center text-center cursor-pointer mb-[6px]">
                  <font-awesome-icon :icon="['fas', 'up-right-and-down-left-from-center']"
                                     class="text-[20px] text-[#5E6D77]"/>
                </span>
                <br>
                <span class="font-normal text-sm leading-[22px] text-[#5E6D77]">
                  S: 260m
                  <sup>2</sup>
                </span>
              </p>
              <p class="pr-[10px] text-center flex justify-start items-center gap-2">
                <span
                    class="border border-gray-300 shadow-sm md:shadow rounded-[10px] p-[1px] w-[40px] h-[40px] flex items-center justify-center text-center cursor-pointer mb-[6px]">
                  <font-awesome-icon :icon="['fas', 'bed-pulse']" class="text-[20px] text-[#5E6D77]"/>
                </span>
                <br>
                <span class="font-normal text-sm leading-[22px] text-[#5E6D77]">
                  Beds: 3
                </span>
              </p>
              <p class="pr-[10px] text-center flex justify-start items-center gap-2">
                <span
                    class="border border-gray-300 shadow-sm md:shadow rounded-[10px] p-[1px] w-[40px] h-[40px] flex items-center justify-center text-center cursor-pointer mb-[6px]">
                  <font-awesome-icon :icon="['fas', 'person']" class="text-[20px] text-[#5E6D77]"/>
                </span>
                <br>
                <span class="font-normal text-sm leading-[22px] text-[#5E6D77]">
                  Adults: 3
                </span>
              </p>
              <p class="pr-[10px] text-center flex justify-start items-center gap-2">
                <span
                    class="border border-gray-300 shadow-sm md:shadow rounded-[10px] p-[1px] w-[40px] h-[40px] flex items-center justify-center text-center cursor-pointer mb-[6px]">
                  <font-awesome-icon :icon="['fas', 'child']" class="text-[20px] text-[#5E6D77]"/>
                </span>
                <br>
                <span class="font-normal text-sm leading-[22px] text-[#5E6D77]">
                  Children: 3
                </span>
              </p>
            </div>
          </div>
          <div class="description">
            <h2 class="font-bold text-2xl leading-10 text-heading-color mb-5">
              About this room
            </h2>
            <p class="text-base leading-6 font-[100] text-[#727272] mb-4">
              Junior Suite comprises of 1 Double Bed or 2 Twin Beds, 2 Bedside Tables, a Desk & Chair. The room is
              furnished with wall to wall carpeting, trendy furnishings and a balcony.
            </p>
            <p class="text-base leading-6 font-[100] text-[#727272] mb-4">
              Our ultramodern glass bathroom is equipped with hairdryer, magnifying shaving and make up mirror as well
              as all the amenities you could possible need during your stay.
            </p>
            <p class="text-base leading-6 font-[100] text-[#727272] mb-4">
              A Complimentary Bottle of Wine, Fresh Fruit and Mineral Water, are provided on arrival. Electric current:
              220 Volts. Smoking rooms & inter-connecting rooms are also available.
            </p>
          </div>
          <div class="attributes">
            <div class="my-[40px] w-full h-[1px] bg-[#EAEEF3]"></div>
            <div class="hotel-facilities mb-[40px]">
              <h2 class="font-bold text-2xl leading-10 mb-[20px]">Room Facilities</h2>
              <div class="-mb-[20px]">
                <div class="grid lg:grid-cols-3">
                  <div class="block">
                    <div class="flex items-center gap-3 font-normal text-base leading-6 text-[#5E6D77] pb-5">
                      <icons-bathroom-robe/>
                      Bathroom robe
                    </div>
                  </div>
                  <div class="block">
                    <div class="flex items-center gap-3 font-normal text-base leading-6 text-[#5E6D77] pb-5">
                      <icons-bathtub/>
                      Bathtub
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="my-[40px] w-full h-[1px] bg-[#EAEEF3]"></div>
          <div class="single">
            <h2 class="font-bold text-2xl leading-10 mb-[20px]">Rates & availability</h2>
            <VueTailwindDatePicker
                v-model="settings.dateCheckout.data"
                :shortcuts="false"
                class="whitespace-no-wrap w-full"
                disabled
                no-input
                separator="to"
            />
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
                  <slide v-for="slide in 10" :key="slide">
                    <div class="px-[10px] pb-[20px] col">
                      <div class="bg-[#fff] shadow-sm md:shadow-lg rounded-[15px] overflow-hidden">
                        <div class="overflow-hidden w-full">
                          <nuxt-link class="block overflow-hidden" to="/">
                            <img alt="/images/glaciar-vatnajokull-768x512.jpg"
                                 class="w-full h-full block transition-all duration-1500 ease-in-out"
                                 src="/images/glaciar-vatnajokull-768x512.jpg">
                          </nuxt-link>
                        </div>
                        <div class="relative p-[20px] overflow-hidden">
                          <h3 class="font-bold text-[18px] leading-[26px] mb-[20px] text-left">
                            <nuxt-link class="inline-block text-left line-clamp-2 hover:text-[rgba(59,113,254,0.9)]"
                                       to="/">Room external booking
                            </nuxt-link>
                          </h3>
                          <div class="flex justify-between items-center">
                            <p class="block">
                              <span
                                  class="text-[22px] text-[#5E6D77] border border-gray-300 w-[50px] h-[50px] flex justify-center items-center rounded-[10px] mb-[6px]">
                                <font-awesome-icon :icon="['fas', 'up-right-and-down-left-from-center']"
                                                   class="text-[20px] text-[#5E6D77]"/>
                              </span>
                              <span class="text-sm leading-[22px] text-[#5E6D77]">
                                S: 150m
                                <sup>2</sup>
                              </span>
                            </p>
                            <p class="block">
                              <span
                                  class="text-[22px] text-[#5E6D77] border border-gray-300 w-[50px] h-[50px] flex justify-center items-center rounded-[10px] mb-[6px]">
                                <font-awesome-icon :icon="['fas', 'bed-pulse']"
                                                   class="text-[20px] text-[#5E6D77]"/>
                              </span>
                              <span class="text-sm leading-[22px] text-[#5E6D77]">
                                Beds: 2
                              </span>
                            </p>
                            <p class="block">
                              <span
                                  class="text-[22px] text-[#5E6D77] border border-gray-300 w-[50px] h-[50px] flex justify-center items-center rounded-[10px] mb-[6px]">
                                <font-awesome-icon :icon="['fas', 'person']" class="text-[20px] text-[#5E6D77]"/>
                              </span>
                              <span class="text-sm leading-[22px] text-[#5E6D77]">
                                Adults: 3
                              </span>
                            </p>
                            <p class="block">
                              <span
                                  class="text-[22px] text-[#5E6D77] border border-gray-300 w-[50px] h-[50px] flex justify-center items-center rounded-[10px] mb-[6px]">
                                <font-awesome-icon :icon="['fas', 'child']" class="text-[20px] text-[#5E6D77]"/>
                              </span>
                              <span class="text-sm leading-[22px] text-[#5E6D77]">
                                Children: 3
                              </span>
                            </p>
                          </div>
                          <div class="price-wrapper border-t border-gray-300 pt-[20px] mt-[20px] mb-[10px]">
                            <div class="price font-bold text-base leading-[26px] text-left">
                              €350.00
                              <span class="font-normal text-sm leading-[22px] text-[#5E6D77] ml-[3px]">
                                /night
                              </span>
                            </div>
                          </div>
                          <button
                              class="mt-[15px] float-left font-normal rounded-full text-white py-[13px] px-[16px] bg-[#3B71FE] hover:bg-[rgba(59,113,254,0.9)] text-base">
                            Room Detail
                          </button>
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