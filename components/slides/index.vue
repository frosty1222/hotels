<script lang="ts" setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

interface IProps {
  modelValue: number,
  data: Array<any>
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: 0,
  data: () => []
})

</script>

<template>
  <carousel :perPageCustom="[[0, 1], [768, 2], [1024, 3], [1280, 4]]">
    <slide v-for="slide in 10" :key="slide">
      <img src="/images/bannermix-min.png">
    </slide>

    <template #addons>
      <navigation />
    </template>
  </carousel>
</template>