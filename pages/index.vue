<script lang="ts" setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Pagination, Slide} from 'vue3-carousel'
import {useLocationStore} from "~/stories/locations";
import { useMessage } from "naive-ui";
const { restAPI } = useApi();
const userStore = useUserStore();
const message = useMessage();
const route = useRoute();
const config = useRuntimeConfig();
const {t} = useI18n()

useHead({title: t("common.home")});

const locationStore = useLocationStore();

const dataApi = reactive({
  locations: []
})

const getDataFromApi = async (): Promise<void> => {
  await locationStore.getLocations();
  dataApi.locations = locationStore?.locations;
}
let paginate = {
   page:1,
   limit:10
}
let story:any = []
const { data: resTory } = await restAPI.cms.getStory();
  if (resTory.value?.success) {
     story = resTory?.value.data
     console.log("story",story)
  }
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

onMounted(async () => {
  action.value?.updateSlideWidth()
  await getDataFromApi()
})

const slideModel = ref(1)
</script>

<template>
  <section class="tvl-section-box">
    <div class="flex mx-auto relative">
      <div class="w-full relative mh-h-[1px] flex">
        <div class="p-[10px] flex relative w-full flex-wrap align-content-start">
          <div class="text-center w-full">
            <div class="mb-[14px] elementor-widget-container">
              <h2 class="elementor-heading-title text-white font-dmsans text-[64px] font-bold leading-[74px]">
                {{ $t("home.titleHomeBanner") }}
              </h2>
            </div>
          </div>
          <div class="text-center w-full relative">
            <div class="elementor-widget-container">
              <p class="text-white font-dmsans text-[18px] font-[100] leading-[30px]">
                {{ $t("home.descHomeBanner") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="-mt-[100px]">
    <div class="lg:max-w-[1320px] max-w-[992px] flex mx-auto relative lg:px-[80px] px-[20px]">
      <div class="w-full p-[10px]">
        <Tabs/>
      </div>
    </div>
  </section>
  <section class="lg:pt-[79px] py-[40px] banner">
    <div class="max-w-[1320px] flex lg:flex-row flex-col justify-center items-center mx-auto lg:gap-6 gap-0 relative">
      <div class="lg:w-1/2 lg:px-0 px-[15px] banner-box">
        <div class="p-[10px]">
          <div class="w-full relative overflow-hidden">
            <div class="rounded-[20px] overflow-hidden">
              <img alt="/images/Frame-3151-min.png" class="w-full transition-transform transform-gpu hover:scale-110"
                   src="/images/Frame-3151-min.png">
            </div>
          </div>
        </div>
      </div>
      <div class="lg:w-1/2 lg:px-0 px-[15px] banner-box">
        <div class="p-[10px]">
          <div class="w-full relative overflow-hidden">
            <div class="rounded-[20px] overflow-hidden">
              <img alt="/images/Frame-3150-min.png" class="w-full transition-transform transform-gpu hover:scale-110"
                   src="/images/Frame-3150-min.png">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section v-if="dataApi.locations?.data?.length" class="lg:py-[80px] locations-container">
    <div class="max-w-[1320px] flex justify-center items-center mx-auto relative">
      <div class="flex min-h-[1px] relative">
        <div class="flex flex-wrap w-full justify-start items-center p-[10px]">
          <div class="text-center">
            <div class="mb-[30px] widget-containers">
              <h2 class="font-dmsans font-bold lg:text-[36px] text-[32px] lg:leading-[46px] leading-[42px] uppercase">
                {{ t('home.topDestinations') }}
              </h2>
            </div>
            <div class="w-full">
              <div class="widget-containers">
                <div class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                  <div v-for="item in dataApi.locations?.data" :key="item.id" class="px-[12px]">
                    <div class="mb-[24px] box">
                      <div
                          class="overflow-hidden relative text-white rounded-[8px]">
                        <nuxt-link class="relative" to="/">
                          <div class="background-breadcrumb">
                            <img :alt="item.photo"
                                 :src="item.photo"
                                 class="w-full background-breadcrumb">
                          </div>
                        </nuxt-link>
                        <div
                            class="absolute top-[50%] left-[50%] z-10 text-center w-full p-[10px] transform -translate-x-1/2 -translate-y-1/2 box-travel">
                          <h3>
                            <nuxt-link class="text-[36px] font-[400] font-dmsans" to="/">
                              {{ item.name }}
                            </nuxt-link>
                          </h3>
                          <div v-if="item.services.length" class="flex flex-wrap items-center justify-center">
                            <nuxt-link v-for="item2 in item.services" :key="item2.id" class="multi text-base font-[200]"
                                       to="/">
                              {{ item2.total }} {{ item2.name }}
                            </nuxt-link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="lg:pt-[70px] pt-[40px] lg:pb-[40px] pb-[10px] recommen bg-[#f7f8fa]">
    <div class="max-w-[1320px] flex mx-auto relative">
      <div class="w-full min-h-[1px] relative flex">
        <div class="p-[10px] flex relative flex-wrap items-start w-full">
          <div class="text-center w-full lg:p-0 px-[15px]">
            <div class="mb-[30px] recommen-title">
              <h2 class="text-[#1a2b48] font-dmsans text-[36px] font-bold leading-[46px]">
                {{ t('home.recommendedForYou') }}</h2>
            </div>
            <div class="recommen-content w-full relative">
              <div class="recommen-box">
                <div class="list-tab-wrapper">
                  <nav>
                    <ul class="flex justify-center items-center header-tab lg:mb-[50px] mb-[30px] flex-wrap">
                      <li>
                        <button
                            class="active py-[10px] lg:px-[24px] px-[20px] border border-solid border-gray-300 rounded-[10px] lg:mx-[6px] mx-[5px] font-dmsans">
                          {{ t('common.hotel') }}
                        </button>
                      </li>
                      <li>
                        <button
                            class="py-[10px] lg:px-[24px] px-[20px] border border-solid border-gray-300 rounded-[10px] lg:mx-[6px] mx-[5px] font-dmsans">
                          {{ t('common.tour') }}
                        </button>
                      </li>
                      <li>
                        <button
                            class="py-[10px] lg:px-[24px] px-[20px] border border-solid border-gray-300 rounded-[10px] lg:mx-[6px] mx-[5px] font-dmsans">
                          {{ t('common.activity') }}
                        </button>
                      </li>
                      <li>
                        <button
                            class="py-[10px] lg:px-[24px] px-[20px] border border-solid border-gray-300 rounded-[10px] lg:mx-[6px] mx-[5px] font-dmsans">
                          {{ t('common.rental') }}
                        </button>
                      </li>
                      <li>
                        <button
                            class="py-[10px] lg:px-[24px] px-[20px] border border-solid border-gray-300 rounded-[10px] lg:mx-[6px] mx-[5px] font-dmsans">
                          {{ t('common.car') }}
                        </button>
                      </li>
                    </ul>
                  </nav>
                  <HotelPost/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="lg:pt-[70px] pt-[40px] lg:pb-[60px] pb-[15px] news">
    <div class="max-w-[1320px] flex mx-auto relative overflow-hidden">
      <div class="w-full">
        <div class="news-container flex flex-1 p-[10px] relative flex-wrap items-start">
          <div class="text-left w-full">
            <div class="news-header lg:mb-[60px] mb-[30px]">
              <h2 class="font-dmsans text-[36px] font-bold leading-[46px] lg:px-0 px-[15px]">
                Stories, tips, and guides
              </h2>
            </div>
          </div>
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
                <div class="overflow-hidden lg:px-0 px-[15px] carousel-box -mx-[10px]">
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
                    <slide v-for="slide in story" :key="slide">
                      <div class="px-[10px] pb-[20px] col">
                        <div class="bg-[#fff] shadow-sm md:shadow-lg rounded-[15px] overflow-hidden">
                          <div class="overflow-hidden w-full" v-if="slide.list_image.length > 0">
                            <nuxt-link class="block overflow-hidden" to="/">
                              <img alt="/images/glaciar-vatnajokull-768x512.jpg"
                                   class="w-full h-full block transition-all duration-1500 ease-in-out"
                                   :src="`${config.public.baseURL}/photo/${slide.list_image[0].fileName}`">
                            </nuxt-link>
                          </div>
                          <div class="relative p-[20px] overflow-hidden">
                            <div class="relative mt-[5px] mb-[15px] clear-both overflow-hidden block">
                              <ul>
                                <li class="py-[6px] px-[10px] rounded-[30px] bg-[rgba(0,38,171,0.06)] float-left relative">
                                  <nuxt-link
                                      class="uppercase font-dmsans font-bold text-[13px] leading-[18px] flex items-center justify-center text-[rgba(0,38,171,1)]"
                                      to="/">
                                      <span class="rounded-[50%] mr-[6px] mb-1">
                                        <font-awesome-icon :icon="['fas', 'circle']" class="text-[8px]"/>
                                      </span>
                                    {{slide.type }}
                                  </nuxt-link>
                                </li>
                              </ul>
                            </div>
                            <h3 class="font-bold text-[18px] leading-[26px] mb-[5px] text-left">
                              <nuxt-link class="inline-block text-left line-clamp-2 hover:text-[rgba(59,113,254,0.9)]"
                                         :to="'/'+slide.id">{{ slide.title }}
                              </nuxt-link>
                            </h3>
                            <div
                                class="font-normal text-base leading-[26px] text-[#727272] text-left line-clamp-2">
                              PENNSYLVANIA, USA — The difference between a tourist and sjdkejwqkekqjwekjqwekj
                            </div>
                          </div>
                        </div>
                      </div>
                    </slide>

                    <template #addons>
                      <pagination class="lg:block hidden"/>
                    </template>
                  </carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="mb-[100px] subscribe">
    <div class="max-w-[1320px] flex mx-auto relative">
      <div class="flex w-full relative min-h-[1px]">
        <div class="px-[10px] flex relative w-full flex-wrap items-start">
          <section class="w-full rounded-[20px]">
            <div class="form-subscribe-container flex flex-wrap mx-auto relative">
              <div class="lg:w-1/2 md:w-1/2 w-full">
                <div
                    class="md:block hidden background-subscribe bg-cover bg-no-repeat w-full h-full rounded-tl-2xl rounded-bl-2xl">
                </div>
                <div class="md:hidden block max-w-full h-auto">
                  <img alt="/images/Rectangle-7-min.png"
                       class="rounded-tl-2xl rounded-tr-2xl"
                       src="/images/Rectangle-7-min.png">
                </div>
              </div>
              <div class="lg:w-1/2 md:w-1/2 w-full">
                <div
                    class="form-subscribe flex flex-col items-center w-full h-full justify-center bg-[#fcfcfc] lg:px-[120px] md:px-[15px] px-[10px] lg:py-[80px] py-[50px] border border-solid border-gray-300">
                  <div class="text-center form-container">
                    <h2 class="font-dmsans font-bold">Get special offers, and more from
                      Traveler</h2>
                  </div>
                  <div class="text-center form-container lg:px-[50px] mb-[30px]">
                    <p class="font-dmsans text-[#727272] text-base font-normal leading-[26px]">Subscribe to see secret
                      deals prices
                      drop the moment
                      you sign
                      up!</p>
                  </div>
                  <div class="w-full">
                    <div class="form-container">
                      <form class="relative">
                        <input
                            class="w-full border border-solid border-gray-300 rounded-full font-normal text-base leading-6 text-gray-600 py-5 px-7"
                            name="EMAIL" placeholder="Email Address" type="email">
                        <input
                            class="bg-[#3B71FE] rounded-full font-medium text-base leading-5 text-white py-4 px-5 absolute top-1/2 right-2 transform -translate-y-1/2"
                            name="submit" type="submit" value="Subscribe">
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@mixin animationScale3s() {
  transition: background .3s, border .3s, border-radius .3s, box-shadow .3s, transform var(--e-transform-transition-duration, .4s);
}

@mixin animationScale5s() {
  transition: background .5s, border .5s, border-radius .5s, box-shadow .5s, transform var(--e-transform-transition-duration, .6s);
}

.tvl-section-box {
  background-image: url(/images/bannermix-min.png);
  --e-bg-lazyload: url(/images/bannermix-min.png);
  background-repeat: no-repeat;
  background-size: cover;
  transition: background .3s, border .3s, border-radius .3s, box-shadow .3s;
  padding: 220px 0 130px;

  @media (max-width: 1024px) {
    .elementor-widget-container {
      margin: 0;
    }
  }

  .elementor-widget-container {
    @include animationScale3s;
    @media (max-width: 1024px) {
      .elementor-heading-title {
        font-size: 42px;
        line-height: 52px;
      }
    }
    @media (max-width: 992px) {
      .elementor-heading-title {
        font-size: 38px;
        line-height: 48px;
      }
    }
  }
}

@media (max-width: 767px) {
  .tvl-section-box {
    padding: 56px 15px 130px;
  }
}

.banner {
  .banner-box {
    img:hover {
      filter: brightness(100%) contrast(100%) saturate(100%) blur(0px) hue-rotate(0deg);
      transform: scale(1.1);
    }

    :hover {
      @include animationScale3s;
    }
  }
}

.locations-container {
  .widget-containers {
    @include animationScale3s;

    .box {
      .multi {
        &:after {
          content: "";
          height: 5px;
          width: 5px;
          display: inline-block;
          background: #fff;
          vertical-align: middle;
          border-radius: 50%;
          margin-left: 10px;
          margin-right: 10px;
        }

        &:last-child:after {
          width: 0;
          height: 0;
          margin-left: 0;
          margin-right: 0;
        }
      }

      :hover {
        @include animationScale5s;

        img {
          @include animationScale5s;
          transform: scale(1.1);
        }
      }
    }
  }
}

.box-travel:hover {
  transition: transform .3s;
}

.recommen {
  .recommen-title {
    @include animationScale3s();
  }

  .recommen-content {
    .recommen-box {
      @include animationScale3s();

      .list-tab-wrapper {
        .header-tab {
          li {
            button {
              color: #232323;

              &.active {
                background: #5191FA;
                color: #ffffff;
              }
            }
          }
        }

        .nav-content {
          .tab-pane {
            .tab-box {
              .featured-image {
                :hover {
                  @include animationScale5s;

                  img {
                    @include animationScale5s;
                    transform: scale(1.1);
                  }
                }
              }

              :hover {
                transition: transform .3s;
              }
            }
          }
        }
      }
    }
  }
}

.news {
  .news-container {
    .news-header {
      @include animationScale3s;
    }

    .news-content {
      @include animationScale3s;

      .btn-carousel {
        box-shadow: 0 1px 2px rgba(0, 0, 0, .08), 0 4px 12px rgba(0, 0, 0, .05);
      }

      .carousel-box {
        .carousel__viewport {
          padding-bottom: 20px;
        }
      }
    }
  }
}

.subscribe {
  .form-subscribe-container {
    max-width: 1320px;
    @media (max-width: 992px) {
      max-width: 767px;
    }

    @media (max-width: 1024px) {
      max-width: 992px;
    }

    @media (max-width: 1366px) {
      max-width: 1140px;
    }

    .background-subscribe {
      @include animationScale3s;
      background-image: url(/images/Rectangle-7-min.png);
      --e-bg-lazyload: url(/images/Rectangle-7-min.png);
    }

    @media (max-width: 1366px) {
      .form-subscribe {
        padding: 50px;
      }
    }

    .form-subscribe {
      font-size: 36px;
      line-height: 46px;
      @media (max-width: 992px) {
        font-size: 28px;
        line-height: 38px;
      }
      @include animationScale3s;
      border-radius: 0 20px 20px 0;
      border-style: solid;
      border-width: 1px 1px 1px 0;
      border-color: #dedede;

      .form-container {
        @include animationScale3s;
      }
    }

    @media (max-width: 767px) {
      .form-subscribe {
        border-left: 1px solid rgb(209 213 219 / var(--tw-border-opacity));
        border-radius: 0 0 20px 20px !important;
      }
    }
  }

}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  max-height: calc(var(--line-height) * 2);
}
</style>

<style lang="scss">
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
}

.news {
  .news-container {
    .news-content {
      .carousel__viewport {
        .carousel__slide {
          .col {
            :hover {
              transition: background .5s, border .5s, border-radius .5s, box-shadow .5s, transform var(--e-transform-transition-duration, .6s);

              img {
                transition: background .5s, border .5s, border-radius .5s, box-shadow .5s, transform var(--e-transform-transition-duration, .6s);
                transform: scale(1.1);
              }
            }
          }
        }
      }

      .carousel-box {
        .carousel__pagination-button {
          &::after {
            border-radius: 50%;
            width: 10px;
            height: 10px;
            background-color: #dedede;
          }

          &:hover::after,
          &--active::after {
            background-color: #3B71FE;
          }
        }
      }
    }
  }
}
</style>