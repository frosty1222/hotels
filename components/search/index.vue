<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref} from "vue";
import VueTailwindDatePicker from "vue-tailwind-datepicker";

interface IProps {
  modelValue: any
  placeholder?: string
  type?: 'date' | 'list' | 'custom'
  data?: any[],
  label: string
  input?: boolean
  description?: string,
  dateCustom?: object
}

const emits = defineEmits(["update:modelValue"]);
const props = withDefaults(defineProps<IProps>(), {
  modelValue: null,
  type: 'list',
  input: false,
  description: null,
  data: [],
  dateCustom: {
    shortcuts: true,
    noInput: false,
    asSingle: false,
  }
})

const getCurrentDate = (numberOfDays: number = 0) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + numberOfDays);

  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

const settings = ref({
  showDropdown: false,
  date: [getCurrentDate().toString(), getCurrentDate(1)],
  dateCustom: {
    shortcuts: props.dateCustom.shortcuts,
    noInput: props.dateCustom.noInput,
  }
})

const stMainMenu = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (stMainMenu.value && !stMainMenu.value.contains(event.target as Node)) {
    if (settings.value.showDropdown) {
      settings.value.showDropdown = false;
    }
  }
};

const selectedValue = ref(props.modelValue)

const filterLocations = (locations: any[], keyword: string): any[] => {
  const lowercaseKeyword = keyword.toLowerCase();

  const filterLocationRecursive = (location: any): any | null => {
    const lowercaseLabel = location.label.toLowerCase();

    if (lowercaseLabel.includes(lowercaseKeyword)) {
      return location;
    }

    const filteredChild = location.child
        ? location.child.map(filterLocationRecursive).filter(Boolean)
        : [];

    if (filteredChild.length > 0) {
      return {...location, child: filteredChild};
    }

    return null;
  };

  return locations
      .map(filterLocationRecursive)
      .filter(Boolean);
};

const filteredLocations = computed(() => {
  return filterLocations(props.data, selectedValue.value);
});

const findLabelById = (id: number): string | null => {
  const findLabelRecursive = (locationsArray, targetId) => {
    for (const location of locationsArray) {
      if (location.id === targetId) {
        return location.label;
      }
      if (location.child) {
        const childResult = findLabelRecursive(location.child, targetId);
        if (childResult !== null) {
          return childResult;
        }
      }
    }
    return null;
  };

  return findLabelRecursive(props.data, id);
};

const chooseValue = (value: any): void => {
  emits('update:modelValue', value)
  switch (props.type) {
    case 'list':
      const name = findLabelById(value);
      selectedValue.value = name
      break;
    default:
      break;
  }

  settings.value.showDropdown = false
}

const searchInput = () => {
  settings.value.showDropdown = true
}

const formatter = ref({
  date: 'DD/MM/YYYY',
  month: 'MM',
})

watchEffect(() => {
  if (selectedValue.value.length && props.type == 'date') {
    settings.value.showDropdown = false
    emits('update:modelValue', selectedValue.value)
  }
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  if (!selectedValue.value.length && props.type == 'date') {
    selectedValue.value = [getCurrentDate().toString(), getCurrentDate(1)]
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div ref="stMainMenu" :class="{'st-focus': settings.showDropdown}"
       class="destination-search flex flex-1 lg:justify-center items-center lg:border-b-0 border-b border-solid border-[#dedede]">
    <div class="dropdown-destination-hotel min-w-full flex justify-start items-center px-[20px] min-h-[85px]"
         @click="settings.showDropdown = !settings.showDropdown">
                <span class="text-[20px] mr-[16px] text-[#5E6D77]">
                  <slot name="icon"></slot>
                </span>
      <div class="st-form-dropdown-icon bulkhead">
        <label class="text-base font-dmsans whitespace-no-wrap font-medium text-[#232323]">
          {{ label }}
        </label>
        <div v-if="input">
          <input v-if="input && description" v-model="selectedValue" :placeholder="description" autocomplete="off"
                 class="border-none focus:outline-none focus:ring-0 p-0 text-[#5E6D77] text-sm font-[200] w-full whitespace-no-wrap"
                 type="text"
                 @input="searchInput">
        </div>
        <div v-else class="font-[200] text-[#5E6D77] text-sm whitespace-no-wrap">
          {{ description }}
        </div>
      </div>
    </div>
    <div v-if="settings.showDropdown && type=='list'"
         class="dropdown-menu lg:min-w-[360px] min-w-full z-20">
      <ul v-if="data?.length && type=='list'" class="st-scrollbar">
        <slot name="headerDropdown"></slot>
        <template v-for="location in filteredLocations" :key="location.id">
          <li v-if="location?.country" class="pl-[20px] item parent_li">
                      <span class="parent">
                        {{ location.label }}
                      </span>
          </li>
          <template v-if="location?.country && location.child">
            <template v-for="childLocation in location.child" :key="childLocation.id">
              <li class="item">
                          <span class="stt-icon stt-icon-location1 text-[16px] text-[#5E6D77] mr-[10px]">
                           <font-awesome-icon :icon="['fas', 'location-dot']"/>
                          </span>
                <span class="lv2" @click="chooseValue(childLocation.id)">{{ childLocation.label }}</span>
              </li>
              <template v-if="childLocation.child">
                <template v-for="childLocation2 in childLocation.child" :key="childLocation2.id">
                  <li class="!pl-[40px] item" @click="chooseValue(childLocation2.id)">
                              <span class="stt-icon stt-icon-location1 text-[16px] text-[#5E6D77] mr-[10px]">
                                <font-awesome-icon :icon="['fas', 'location-dot']"/>
                              </span>
                    <span class="child">{{ childLocation2.label }}</span>
                  </li>
                </template>
              </template>
            </template>
          </template>
        </template>
      </ul>
    </div>
    <div v-if="settings.showDropdown && type=='custom'" class="dropdown-menu lg:min-w-[360px] min-w-full">
      <template v-if="type == 'custom'">
        <slot name="body"></slot>
      </template>
    </div>
    <div v-show="settings.showDropdown && type=='date'"
         class="dropdown-menu lg:min-w-[360px] min-w-[100%]">
      <VueTailwindDatePicker
          v-model="selectedValue"
          :as-single="settings.dateCustom.asSingle"
          :formatter="formatter"
          :no-input="settings.dateCustom.noInput"
          :shortcuts="settings.dateCustom.shortcuts"
          class="whitespace-no-wrap"
          separator="to"
          @change="chooseValue"
      />
    </div>
  </div>
</template>

<style lang="scss">
.whitespace-no-wrap {
  white-space: nowrap;
}

.destination-search {
  &.bulkhead {
    .st-form-dropdown-icon::after {
      content: "";
      height: 20px;
      width: 1px;
      display: block;
      background: #dedede;
      border: none;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  @media screen and (max-width: 1024px) {
    &.bulkhead {
      .st-form-dropdown-icon::after {
        width: 0;
        height: 0;
      }
    }
    position: static;
  }

  &.st-focus {
    box-shadow: 0 5px 20px rgba(0, 0, 0, .1);
    border-radius: 50px;
  }

  transition: all .3s;
  cursor: pointer;
  position: relative;
  min-height: 82px;

  .dropdown-menu {
    position: absolute;
    inset: 0px auto auto 0px;
    margin: 0px;
    transform: translate(0px, 84px);
    background: #fff;
    border: 1px solid #dedede;
    box-sizing: border-box;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .08), 0 4px 12px rgba(0, 0, 0, .05);
    border-radius: 20px;
    min-height: unset !important;
    max-height: unset !important;
    padding: 30px 15px 30px 10px;
    margin-top: 16px !important;
    z-index: 10;

    .st-scrollbar {
      width: auto;
      overflow-y: scroll;
      border: none;
      overflow-x: hidden;
      min-height: 100px;
      max-height: 332px;
      padding-left: 0;
      margin-bottom: 0;
      padding-right: 0;

      .location-heading {
        font-weight: 500;
        font-size: 16px;
        line-height: 26px;
        color: var(--heading-color);
        padding-top: 0;
        padding-left: 20px;
        padding-right: 30px;
        padding-bottom: 0;
        font-family: 'DM Sans';

        span {
          padding-bottom: 20px;
          margin-bottom: 13px;
          border-bottom: 1px solid #dedede;
          display: block;
          width: 100%;
        }
      }
    }

    li:not(.location-heading) {
      display: flex;
      align-items: center;
      padding: 7px 20px;
      justify-content: flex-start;

      span:not(.stt-icon) {
        font-weight: 300;
        font-size: 16px;
        line-height: 26px;
        color: var(--grey-color, #5E6D77);
        width: auto;
        white-space: normal;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    &.st-focus {
      box-shadow: none !important;
      border-radius: 0 !important;
    }
  }
}
</style>