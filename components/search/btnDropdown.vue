<script lang="ts" setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {onBeforeUnmount, onMounted, ref} from "vue";

interface IProps {
  label: string
}

const props = withDefaults(defineProps<IProps>(), {
  label: 'label'
})

const settings = ref({
  filterPrice: {
    data: [0, 254],
    min: 0,
    max: 254,
    isShow: false,
  }
})

const stMainMenu = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (stMainMenu.value && !stMainMenu.value.contains(event.target as Node)) {
    if (settings.value.filterPrice.isShow) {
      settings.value.filterPrice.isShow = false;
    }
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div ref="stMainMenu" class="relative">
    <button
        class="py-[12px] px-[20px] bg-white rounded-[40px] font-normal text-sm leading-[20px] text-[#232323] flex items-center"
        @click="settings.filterPrice.isShow = !settings.filterPrice.isShow">
      <span class="font-dmsans">{{ label }}</span>
      <span>
                <font-awesome-icon :icon="['fas', 'angle-down']" class="text-[13px] ml-[5px]"/>
              </span>
    </button>
    <div v-show="settings.filterPrice.isShow"
         class="dropdown-menu absolute z-20 range-slider min-w-[300px] p-[20px] bg-white border border-solid border-gray-300 rounded-[20px] mt-[10px] shadow-sm md:shadow-lg text-sm text-[#212529] text-left">
      <slot name="body"/>
    </div>
  </div>
</template>