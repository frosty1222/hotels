<script lang="ts" setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {onBeforeUnmount, onMounted, ref} from "vue";
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import {CustomMarker, GoogleMap} from 'vue3-google-map'

useHead(
    {
      title: "Hotel Detail"
    }
)

const {t} = useI18n()

const config = useRuntimeConfig();

const settings = ref({
  isImgShow: false,
  imgShowSrc: null,
  isVideoShow: false,
  isShowGalerryMultiple: false,
  gallery: [
    {
      id: 1,
      src: '/images/Seasonal-outdoor-pool.png'
    },
    {
      id: 2,
      src: '/images/Hypo-allergenic-bedding-in-room-safe-desk-laptop-workspace.png'
    },
    {
      id: 3,
      src: '/images/Breakfast-lunch-and-dinner-served-American-cuisine.png'
    },
    {
      id: 4,
      src: '/images/Exterior-1.png'
    },
    {
      id: 5,
      src: '/images/feature-5.png'
    },
  ],
  gallerryActive: 0,
  isShowFormReview: false,
  votes: {
    cleanliness: {
      label: 'Cleanliness',
      stars: [1, 2, 3, 4, 5],
      activeIndex: -1,
      lock: -1,
    },
    accuracy: {
      label: 'Accuracy',
      stars: [1, 2, 3, 4, 5],
      activeIndex: -1,
      lock: -1,
    },
    communication: {
      label: 'Communication',
      stars: [1, 2, 3, 4, 5],
      activeIndex: -1,
      lock: -1,
    },
    location: {
      label: 'Location',
      stars: [1, 2, 3, 4, 5],
      activeIndex: -1,
      lock: -1,
    },
    checkin: {
      label: 'Check-in',
      stars: [1, 2, 3, 4, 5],
      activeIndex: -1,
      lock: -1,
    },
    value: {
      label: 'Value',
      stars: [1, 2, 3, 4, 5],
      activeIndex: -1,
      lock: -1,
    },
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
  tabActive: 0,
  center: {lat: 40.689247, lng: -74.044502}
})
const showImg = (
    src: string,
    isVideo: boolean = false,
    isMultiple: boolean = false
): void => {
  settings.value.imgShowSrc = src;
  settings.value.isImgShow = true;

  if (isVideo)
    settings.value.isVideoShow = true;
  else
    settings.value.isVideoShow = false;

  if (isMultiple)
    settings.value.isShowGalerryMultiple = true;
  else
    settings.value.isShowGalerryMultiple = false;
}

const closePreview = () => {
  settings.value.isImgShow = false;
  settings.value.isVideoShow = false;
}

const nextGallery = (): void => {
  if (settings.value.gallerryActive < (settings.value.gallery.length - 1))
    settings.value.gallerryActive++;
  else
    settings.value.gallerryActive = 0;
}

const prevGallery = (): void => {
  if (settings.value.gallerryActive > 0)
    settings.value.gallerryActive--;
}

const setActive = (item: string, index: number): void => {
  settings.value.votes[item].activeIndex = index;
}

const resetActive = (item: string): void => {
  settings.value.votes[item].activeIndex = -1;
}

const lockVote = (item: string, index: number): void => {
  settings.value.votes[item].lock = index;
}

const changeGuest = (type: 'decrement' | 'reduce' = 'decrement', object: string = ''): void => {
  if (type == 'decrement') {
    settings.value.guests[object]++;
    if (object != 'guestTotal' || object != 'roomTotal') {
      settings.value.guests.guestTotal = settings.value.guests.children + settings.value.guests.adult;
    }
  } else if (type == 'reduce') {
    if (settings.value.guests[object] > 0) {
      settings.value.guests[object]--;
      if (settings.value.guests.guestTotal > 0) {
        settings.value.guests.guestTotal--;
      }
    }
  }
};

const stMainMenu = ref<HTMLElement | null>(null);
const stMainMenuDateCheckin = ref<HTMLElement | null>(null);
const stMainMenuDateCheckOut = ref<HTMLElement | null>(null);
const targetDiv = ref<HTMLElement | null>(null);

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

const scrollToDiv = (): void => {
  if (targetDiv.value) {
    targetDiv.value.scrollIntoView({behavior: 'smooth'})
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
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
            <h1 class="text-white lg:text-[36px] text-[24px] lg:leading-[46px] leading-[24px] font-bold">Studio Allston
              Hotel</h1>
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
    <div class="max-w-full px-[20px] block">
      <div class="mt-[40px] inline-block w-full overflow-hidden rounded-[20px] relative">
        <div class="grid lg:grid-cols-3 grid-cols-1 lg:grid-rows-2 gap-3 max-h-[630px]">
          <template v-for="(galerry, key) in settings.gallery" :key="galerry.id">
            <a :class="{
            'row-span-2': key == 0,
            'lg:block hidden': key > 0
          }" class="col-span-1" href="#">
              <img
                  :alt="galerry.src"
                  :src="galerry.src"
                  class="h-full w-full"
                  @click="showImg(galerry.src)"
              >
            </a>
          </template>
        </div>
        <div class="absolute bottom-[30px] right-0">
          <div class="flex">
            <button
                class="bg-[rgba(0,0,0,.4)] flex justify-center items-center w-[45px] h-[45px] p-[12px] mr-[16px] border border-solid border-white rounded-full text-white text-base leading-[20px]"
                @click="showImg('https://www.youtube.com/embed/gOtfJ151ue4?list=RDgOtfJ151ue4', true)">
              <font-awesome-icon :icon="['fas', 'play']"/>
            </button>
            <button
                class="bg-[rgba(0,0,0,.4)] p-[12px] mr-[16px] border border-solid border-white rounded-full text-white text-base leading-[20px]"
                @click="showImg('', false, true)"
            >
              <font-awesome-icon :icon="['fas', 'grip-vertical']" class="mr-[10px]"/>
              All photos
            </button>
          </div>
        </div>

        <figure v-if="settings.isImgShow"
                class="fixed bg-[#232323bf] w-full h-full top-0 left-0 z-50">
          <div class="absolute right-5 top-5">
            <button class="rounded-full bg-[#fff] w-[56px] h-[56px] hover:bg-white text-[22px]"
                    style="box-shadow: 0 1px 2px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.05)"
                    @click="closePreview">
              ×
            </button>
          </div>
          <div v-if="!settings.isShowGalerryMultiple">
            <img v-if="!settings.isVideoShow" :alt="settings.imgShowSrc" :src="settings.imgShowSrc"
                 class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style="object-fit: cover;">
            <iframe v-else
                    :src="settings.imgShowSrc"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen class="w-full h-[100vh]"
                    frameborder="0"></iframe>
          </div>
          <div v-else>
            <div
                class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-50">
              <div class="flex flex-1 justify-between items-center mx-[20px]">
                <button
                    class="rounded-full p-[20px] text-white bg-[rgba(255,255,255,.2)] hover:opacity-85 flex justify-center items-center w-14 h-14"
                    @click="prevGallery">
                  <font-awesome-icon :icon="['fas', 'chevron-left']"/>
                </button>
                <button
                    class="rounded-full p-[20px] text-white bg-[rgba(255,255,255,.2)] hover:opacity-85 flex justify-center items-center w-14 h-14"
                    @click="nextGallery">
                  <font-awesome-icon :icon="['fas', 'chevron-right']"/>
                </button>
              </div>
            </div>
            <div class="relative">
              <div v-for="(galerry, key) in settings.gallery" :key="galerry.id">
                <img v-if="key == settings.gallerryActive"
                     :alt="galerry.src" :src="galerry.src"
                     class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                     style="object-fit: cover;">
              </div>
              <figcaption
                  class="fixed bottom-[50px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">
                {{ settings.gallerryActive + 1 }} / {{ settings.gallery.length }}
              </figcaption>
            </div>
          </div>
        </figure>
      </div>
    </div>
    <div class="max-w-[1290px] px-[20px] mx-auto lg:mt-[50px] lg:mb-[100px] mb-[50px] mt-[40px]">
      <div class="flex">
        <div class="lg:w-2/3 w-full lg:px-[12px]">
          <div class="flex flex-wrap justify-between items-start">
            <div class="left">
              <div class="star">
                <font-awesome-icon :icon="['fas', 'star']" class="text-[12px] text-[#FA5636]"/>
                <font-awesome-icon :icon="['fas', 'star']" class="text-[12px] text-[#FA5636]"/>
                <font-awesome-icon :icon="['fas', 'star']" class="text-[12px] text-[#FA5636]"/>
                <font-awesome-icon :icon="['fas', 'star']" class="text-[12px] text-[#FA5636]"/>
                <font-awesome-icon :icon="['fas', 'star']" class="text-[12px] text-[#FA5636]"/>
              </div>
              <div class="sub-heading block">
                <div class="flex items-center">
                  <div class="review-score mr-[10px]">
                    <div class="flex justify-between items-center">
                      <div
                          class="score bg-f9fbff border border-[#3B71FE] rounded-lg p-1 px-2 font-bold text-base text-[#3B71FE] leading-6 text-main-color mr-12">
                        5
                        <span>/5</span>
                      </div>
                      <div class="left">
                        <span class="font-bold text-base leading-[26px]">Excellent</span>
                        <span class="font-normal text-base leading-[26px] text-[#5E6D77]">
                        <a class="text-[#3B71FE] ml-[12px]" href="#">(3 reviews)</a>
                      </span>
                      </div>
                    </div>
                  </div>
                  <span class="h-[3px] w-[3px] bg-[#c4c4c4] rounded-full inline-block"></span>
                  <div class="address ml-[10px] font-normal text-base leading-[26px] text-[#5E6D77]">California</div>
                </div>
              </div>
            </div>
            <div class="lg:mt-0 mt-[24px] lg:w-auto w-full right flex items-center gap-3">
              <button
                  class="bg-white border border-gray-300 shadow-sm rounded-full w-11 h-11 text-gray-400 flex items-center justify-center">
                <font-awesome-icon :icon="['fas', 'share']"/>
              </button>
              <button
                  class="bg-white border border-gray-300 shadow-sm rounded-full w-11 h-11 text-gray-400 flex items-center justify-center">
                <font-awesome-icon :icon="['far', 'heart']"/>
              </button>
            </div>
          </div>
          <div class="my-[40px] w-full h-[1px] bg-[#EAEEF3]"></div>
          <div class="description">
            <h2 class="font-bold text-2xl leading-10 text-heading-color mb-5">
              About this hotel
            </h2>
            <p class="text-base leading-6 font-[100] text-[#727272] mb-4">
              Studio Allston Hotel is the ideal point of departure for your excursions in Boston (MA). Conveniently
              located on the Charles River near Harvard University, the property offers spacious accommodation,
              contemporary technology and ample facilities for an excellent visit to historic Boston.
            </p>
            <p class="text-base leading-6 font-[100] text-[#727272] mb-4">
              Top features of the property include complimentary parking on-site, full service restaurant serving
              breakfast, lunch and dinner and free wireless internet access. Enjoy nearby jogging and bicycle paths,
              while
              children will like the play area across the street.
            </p>
            <p class="text-base leading-6 font-[100] text-[#727272] mb-4">
              All rooms exude an atmosphere of total peace and harmony that feature thoughtful amenities to ensure an
              unparalleled sense of comfort for the guests such as air conditioning, heating, satellite/cable channels,
              ironing facilities and toiletries. Studio Allston Hotel is an ideal place of stay for travelers seeking
              charm, comfort and convenience in Boston (MA).
            </p>
          </div>
          <div class="attributes">
            <div class="my-[40px] w-full h-[1px] bg-[#EAEEF3]"></div>
            <div class="hotel-facilities mb-[40px]">
              <h2 class="font-bold text-2xl leading-10 mb-[20px]">Hotel Facilities</h2>
              <div class="-mb-[20px]">
                <div class="grid lg:grid-cols-3">
                  <div class="block">
                    <div class="flex items-center gap-3 font-normal text-base leading-6 text-[#5E6D77] pb-5">
                      <icons-air-conditioner/>
                      Air Conditioning
                    </div>
                  </div>
                  <div class="block">
                    <div class="flex items-center gap-3 font-normal text-base leading-6 text-[#5E6D77] pb-5">
                      <icons-air-transport/>
                      Airport Transport
                    </div>
                  </div>
                  <div class="block">
                    <div class="flex items-center gap-3 font-normal text-base leading-6 text-[#5E6D77] pb-5">
                      <icons-fitness/>
                      Fitness Center
                    </div>
                  </div>
                  <div class="block">
                    <div class="flex items-center gap-3 font-normal text-base leading-6 text-[#5E6D77] pb-5">
                      <icons-heater/>
                      Heater
                    </div>
                  </div>
                  <div class="block">
                    <div class="flex items-center gap-3 font-normal text-base leading-6 text-[#5E6D77] pb-5">
                      <icons-wifi/>
                      Internet – Wifi
                    </div>
                  </div>
                  <div class="block">
                    <div class="flex items-center gap-3 font-normal text-base leading-6 text-[#5E6D77] pb-5">
                      <icons-parking/>
                      Parking
                    </div>
                  </div>
                  <div class="block">
                    <div class="flex items-center gap-3 font-normal text-base leading-6 text-[#5E6D77] pb-5">
                      <icons-restaurant/>
                      Restaurant
                    </div>
                  </div>
                  <div class="block">
                    <div class="flex items-center gap-3 font-normal text-base leading-6 text-[#5E6D77] pb-5">
                      <icons-smoking/>
                      Smoking Room
                    </div>
                  </div>
                  <div class="block">
                    <div class="flex items-center gap-3 font-normal text-base leading-6 text-[#5E6D77] pb-5">
                      <icons-washer/>
                      Washer & Dryer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="my-[40px] w-full h-[1px] bg-[#EAEEF3]"></div>
          <div class="single">
            <h2 class="font-bold text-2xl leading-10 mb-[20px]">Rules</h2>
            <table class="mb-[16px] w-full">
              <tbody class="text-left font-normal text-base leading-10 text-[#5E6D77]">
              <tr>
                <th class="py-[10px] w-[50%]">Check In</th>
                <td>
                  12:00 pm
                </td>
              </tr>
              <tr>
                <th class="py-[10px] w-[50%]">Check Out</th>
                <td>
                  12:00 pm
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="my-[40px] w-full h-[1px] bg-[#EAEEF3]"></div>
          <div ref="targetDiv" class="single">
            <h2 class="font-bold text-2xl leading-10 mb-[20px]">Availability</h2>
            <div class="pb-[10px] border-b border-gray-300">
              <div class="fetch">
                <div v-for="item in 3" :key="item"
                     class="mb-[30px] border border-gray-300 overflow-hidden rounded-[8px]">
                  <form>
                    <div class="flex flex-wrap items-stretch">
                      <div class="lg:w-1/3 w-full">
                        <div class="h-full">
                          <img alt="/images/Europe-Hotel-4-800x600.jpg" class="w-full h-full"
                               src="/images/Europe-Hotel-4-800x600.jpg" style="object-fit: cover;">
                        </div>
                      </div>
                      <div class="lg:w-2/3 w-full">
                        <div class="grid lg:grid-cols-3 items-center">
                          <div class="col-span-2 w-full lg:px-[24px] px-[12px]">
                            <div class="lg:py-[30px] py-[15px]">
                              <div class="lg:border-r lg:border-b-0 border-b border-gray-300 lg:pb-0 pb-[30px]">
                                <h2 class="mb-[50px]">
                                  <nuxt-link
                                      class="font-bold text-[18px] hover:text-[rgba(59,113,254,0.9)] leading-[26px]"
                                      to="/">
                                    Queen Room
                                  </nuxt-link>
                                </h2>
                                <div class="flex lg:justify-start justify-between items-center">
                                  <p class="pr-[10px] text-center inline-block">
                                  <span
                                      class="border border-gray-300 shadow-sm md:shadow rounded-[10px] p-[10px] w-[50px] h-[50px] inline-block text-center cursor-pointer mb-[6px]">
                                    <font-awesome-icon :icon="['fas', 'up-right-and-down-left-from-center']"
                                                       class="text-2xl text-[#5E6D77]"/>
                                  </span>
                                    <br>
                                    <span class="font-normal text-sm leading-[22px] text-[#5E6D77]">
                                    260m
                                    <sup>2</sup>
                                  </span>
                                  </p>
                                  <p class="pr-[10px] text-center inline-block">
                                  <span
                                      class="border border-gray-300 shadow-sm md:shadow rounded-[10px] p-[10px] w-[50px] h-[50px] inline-block text-center cursor-pointer mb-[6px]">
                                    <font-awesome-icon :icon="['fas', 'car-side']" class="text-2xl text-[#5E6D77]"/>
                                  </span>
                                    <br>
                                    <span class="font-normal text-sm leading-[22px] text-[#5E6D77]">
                                    x3
                                  </span>
                                  </p>
                                  <p class="pr-[10px] text-center inline-block">
                                  <span
                                      class="border border-gray-300 shadow-sm md:shadow rounded-[10px] p-[10px] w-[50px] h-[50px] inline-block text-center cursor-pointer mb-[6px]">
                                    <font-awesome-icon :icon="['fas', 'person']" class="text-2xl text-[#5E6D77]"/>
                                  </span>
                                    <br>
                                    <span class="font-normal text-sm leading-[22px] text-[#5E6D77]">
                                    x2
                                  </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-span-1">
                            <nuxt-link
                                class="lg:m-0 mb-[15px] rounded-full bg-[#3B71FE] py-[13px] px-[25px] font-medium text-white text-base leading-[20px] block lg:float-right lg:mr-[30px] lg:ml-0 ml-[15px]"
                                to="/hotel/room/1">
                              Show
                              price
                            </nuxt-link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="single pt-[40px]">
            <h2 class="font-bold text-2xl leading-10 mb-[20px]">Reviews</h2>
            <div class="flex">
              <div class="w-full">
                <div class="review-box border border-gray-300 rounded-[20px] bg-[#fcfcfc] p-[30px]">
                  <div class="flex items-center mb-[15px]">
                    <font-awesome-icon :icon="['fas', 'star']" class="text-[22px] text-[#ffb21d]"/>
                    <div class="review-score ml-[5px] text-[22px] font-bold leading-[32px]">
                      5
                      <span>/5</span>
                    </div>
                    <div class="review-score ml-[5px] text-[22px] font-bold leading-[32px]">
                      Excellent
                    </div>
                    <div class="review-score ml-[10px] text-base text-[#5E6D77] font-bold leading-[32px]">
                      (3 reviews)
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
            <div class="mt-[30px] text-center text-sm text-[#5E6D77]">
              3 reviews on this Hotel - Showing 1 to 3
            </div>
            <div v-for="item in 3" :key="item" class="mt-[30px]">
              <div class="py-[30px] border-t border-gray-300 text-sm">
                <div class="flex justify-between items-center">
                  <div class="flex items-center">
                    <div class="left pr-[16px] rounded-full">
                      <img alt="/images/u32.jpeg" class="w-[50px] h-[50px] rounded-full" src="/images/u32.jpeg">
                    </div>
                    <div class="right table-cell">
                      <div class="text-base font-medium leading-[26px]">modmix</div>
                      <div class="text-sm leading-[22px] text-center text-[#5E6D77]">10/01/2024</div>
                    </div>
                  </div>
                  <div class="flex gap-2 items-center">
                    <font-awesome-icon :icon="['far', 'thumbs-up']" class="text-gray-500 text-base"/>
                    <span class="text-base">2</span>
                  </div>
                </div>
                <div class="flex mt-[18px]">
                  <ul>
                    <li class="inline-block mr-[6px]">
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
                    </li>
                    <li class="inline-block mr-[6px]">
                      <font-awesome-icon :icon="['fas', 'star']" class="text-sm text-[#ffb21d]"/>
                    </li>
                  </ul>
                </div>
                <div class="mt-[12px]">
                  <p class="font-normal text-base text-[#74818a]">
                    clean rooms, great staff” The room had a great ocean view, room was very clean and big. the staff
                    super friendly and nice.
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
          <div class="py-[30px] px-[24px] border border-gray-300 rounded-[20px] shadow-sm">
            <div class="flex gap-5 items-center justify-center">
              <button
                  :class="{
                    '!bg-[#f7f8fa] !text-black': settings.tabActive != 0
                  }"
                  class="lg:w-1/2 rounded-full text-white py-[15px] bg-[#3B71FE] hover:bg-[rgba(59,113,254,0.9)] text-sm"
                  @click="settings.tabActive = 0">
                Book
              </button>
              <button
                  :class="{
                    '!bg-[#f7f8fa] !text-black': settings.tabActive != 1
                  }"
                  class="lg:w-1/2 rounded-full text-white py-[15px] bg-[#3B71FE] hover:bg-[rgba(59,113,254,0.9)] text-sm"
                  @click="settings.tabActive = 1">
                Inquiry
              </button>
            </div>
            <div v-show="settings.tabActive == 0">
              <div class="my-[25px] flex justify-between items-center">
                <div class="left font-normal text-sm leading-[22px] text-[#5E6D77]">
                  From
                  <span class="font-bold text-[18px] leading-[26px] text-black">€160.00</span>
                  <span> /night</span>
                </div>
                <div class="right flex justify-around items-center">
                  <font-awesome-icon :icon="['fas', 'star']" class="text-sm text-[#ffb21d]"/>
                  <div class="text-base font-bold leading-[26px] mx-[4px]">5</div>
                  <span class="text-sm text-[#5E6D77]">(3 reviews)</span>
                </div>
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
              </div>
              <div class="mt-[25px]">
                <button
                    class="rounded-full w-full text-white py-[15px] px-[20px] bg-[#3B71FE] hover:bg-[rgba(59,113,254,0.9)] text-base">
                  Check availability
                </button>
              </div>
            </div>
            <div v-show="settings.tabActive == 1">
              <form class="my-[25px]">
                <div class="block mb-[16px]">
                  <label>Name (*)</label>
                  <input class="w-full text-base leading-[26px] rounded-[10px] text-[#5E6D77] border border-gray-300"
                         type="text">
                </div>
                <div class="block mb-[16px]">
                  <label>E-mail (*)</label>
                  <input class="w-full text-base leading-[26px] rounded-[10px] text-[#5E6D77] border border-gray-300"
                         type="email">
                </div>
                <div class="block mb-[16px]">
                  <label>Phone</label>
                  <input class="w-full text-base leading-[26px] rounded-[10px] text-[#5E6D77] border border-gray-300"
                         type="text">
                </div>
                <div class="block mb-[16px]">
                  <label>Note</label>
                  <textarea
                      class="w-full text-base leading-[26px] rounded-[10px] text-[#5E6D77] border border-gray-300 h-[80px] resize-none"></textarea>
                </div>
                <div class="block mb-[16px]">
                  <button
                      class="rounded-full w-full text-white py-[15px] px-[20px] bg-[#3B71FE] hover:bg-[rgba(59,113,254,0.9)] text-base">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div class="mt-[30px] p-[20px] rounded-[20px] overflow-hidden shadow-sm bg-white">
            <img :alt="settings.gallery[0].src" :src="settings.gallery[0].src">
          </div>
          <div class="mt-[30px] rounded-[20px] overflow-hidden">
            <GoogleMap
                :api-key="config.public.apiKeyGoogleMap"
                :center="settings.center"
                :zoom="15"
                class="w-full h-[200px] rounded-[20px]"
            >
              <CustomMarker :options="{ position: settings.center, anchorPoint: 'BOTTOM_CENTER' }">
                <div>
                  <div
                      class="inner hover:bg-[#3B71FE] hover:text-white bg-white rounded-[50px] font-bold text-sm leading-[14px] text-center text-[#232323] px-[10px] pt-[13px] pb-[11px] relative font-dmsans transition-opacity-ease-in-duration-200 shadow-md">
                    View in map
                  </div>
                </div>
              </CustomMarker>
            </GoogleMap>
          </div>
          <member-since/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
</style>