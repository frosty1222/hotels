<script lang="ts" setup>
import {ref} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

interface IProps {
  videoSrc?: string
}

const emits = defineEmits(["update:modelValue"]);

const props = withDefaults(defineProps<IProps>(), {
  videoSrc: '',
})

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
</script>
<template>
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
          <button v-if="videoSrc"
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
</template>