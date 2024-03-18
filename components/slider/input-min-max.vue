<script lang="ts" setup>
import Slider from '@vueform/slider'
import {ref} from "vue";

interface IProps {
  modelValue: number[],
  min?: number,
  max?: number
}

const emits = defineEmits(["update:modelValue"]);

const props = withDefaults(defineProps<IProps>(), {
  modelValue: [0, 0],
  min: 0,
  max: 0,
})

const selectedValue = ref(props.modelValue)

const settings = ref({
  data: props.modelValue,
  min: props.min,
  max: props.max,
})
const dataReturn = (value: String | number) => {
  emits('update:modelValue', value)
}
</script>

<template>
  <Slider
      v-model="selectedValue"
      :max="max"
      :min="min"
      :tooltips="false"
      @update="dataReturn"
  />
</template>

<style src="@vueform/slider/themes/default.css"></style>