<script lang="ts" setup>
import {onMounted, ref} from "vue";

const {t} = useI18n()
const settings = ref({
  showLocation: false,
  locations: [
    {
      id: 54,
      label: "United States",
      country: true,
      child: [
        {
          id: 55,
          label: "California"
        },
        {
          id: 56,
          label: "Los Angeles"
        },
        {
          id: 57,
          label: "New Jersey",
          child: [
            {
              id: 58,
              label: "Delaware"
            },
            {
              id: 59,
              label: "Philadelphia"
            },
          ],
        },
        {
          id: 58,
          label: "New York City"
        },
        {
          id: 59,
          label: "San Francisco",
          child: [
            {
              id: 60,
              label: "Wilmington"
            }
          ]
        },
        {
          id: 61,
          label: "Virginia",
          child: [
            {
              id: 62,
              label: "Virginia Beach"
            }
          ]
        }
      ]
    }
  ],
  searchKeywordLocation: "",
  checkinSelected: "",
  showCheckin: false,
  dateCheckin: [],
  checkoutSelected: "",
  showCheckout: false,
  dateCheckout: [],
  tabActive: 0,
  guests: {
    guestTotal: 1,
    roomTotal: 1,
    adult: 1,
    children: 0,
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

const choosedate = (value: Array<any> = []): void => {
  settings.value.checkinSelected = value[0].toString()
  settings.value.checkoutSelected = value[1].toString()
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

onMounted(() => {
  settings.value.checkinSelected = getCurrentDate()
  settings.value.checkoutSelected = getCurrentDate(1)
});
</script>

<template>
  <div class="tabs">
    <ul class="nav">
      <li class="nav-item">
        <a :class="{'border-b border-solid border-[#fff]': settings.tabActive == 0}"
           class="nav-link text-sm mr-[1px] text-white font-[300]"
           href="#"
           role="tab" @click="settings.tabActive = 0">
          {{ t("common.home") }}
        </a>
      </li>
      <li class="nav-item">
        <a :class="{'border-b border-solid border-[#fff]': settings.tabActive == 1}"
           class="nav-link text-sm mr-[1px] text-white font-[300]"
           href="#" role="tab" @click="settings.tabActive = 1">
          {{ t("common.tour") }}
        </a>
      </li>
      <li class="nav-item">
        <a :class="{'border-b border-solid border-[#fff]': settings.tabActive == 2}"
           class="nav-link text-sm mr-[1px] text-white font-[300]"
           href="#" role="tab" @click="settings.tabActive = 2">
          {{ t("common.activity") }}
        </a>
      </li>
      <li class="nav-item">
        <a :class="{'border-b border-solid border-[#fff]': settings.tabActive == 3}"
           class="nav-link text-sm mr-[1px] text-white font-[300]"
           href="#" role="tab" @click="settings.tabActive = 3">
          {{ t("common.rental") }}
        </a>
      </li>
      <li :class="{'border-b border-solid border-[#fff]': settings.tabActive == 4}" class="nav-item"
          @click="settings.tabActive = 4">
        <a class="nav-link text-sm mr-[1px] text-white font-[300]" href="#" role="tab">
          {{ t("common.carRental") }}
        </a>
      </li>
      <li class="nav-item">
        <a :class="{'border-b border-solid border-[#fff]': settings.tabActive == 5}"
           class="nav-link text-sm mr-[1px] text-white font-[300]"
           href="#" role="tab" @click="settings.tabActive = 5">
          {{ t("common.carTranfer") }}
        </a>
      </li>
    </ul>
    <div class="tab-content">
      <div class="tab-panel lg:flex block justify-center items-center">
        <div v-show="settings.tabActive == 0">
          <SearchLocation/>
        </div>
        <div v-show="settings.tabActive == 1"
             class="tvl-search-form lg:max-w-[870px] max-w-full rounded-[24px] lg:rounded-[70px]">
          <form class="lg:flex block justify-between flex-nowrap items-center">
            <div class="relative w-full lg:w-[25%]">
              <search
                  v-model:model-value="settings.searchKeywordLocation"
                  :data="settings.locations"
                  :description="t('common.whereAreYouGoing')"
                  :input="true"
                  :label="t('common.location')"
                  class="bulkhead"
              >
                <template #headerDropdown>
                  <li class="location-heading">
                    <span>Popular destinations</span>
                  </li>
                </template>
                <template #icon>
                  <font-awesome-icon :icon="['fas', 'location-dot']"/>
                </template>
              </search>
            </div>
            <div
                class="flex relative lg:justify-center justify-between items-center form-date-field lg:min-w-[32%] min-w-full lg:border-b-0 border-b border-solid border-[#dedede]">
              <search
                  v-model:model-value="settings.dateCheckin"
                  :date-custom="{
                  shortcuts: false,
                  noInput: true,
                }"
                  :description="settings.checkinSelected"
                  :label="t('common.checkin')"
                  class="border-b-0"
                  type="date"
                  @update:model-value="choosedate"
              >
                <template #icon>
                  <font-awesome-icon :icon="['fas', 'calendar-days']"/>
                </template>
              </search>
              <span class="text-sm mr-[16px] text-[#5E6D77]">
                <font-awesome-icon :icon="['fas', 'arrow-right']"/>
              </span>
              <search
                  v-model:model-value="settings.dateCheckout"
                  :date-custom="{
                  shortcuts: false,
                  noInput: true,
                }"
                  :description="settings.checkoutSelected"
                  :label="t('common.checkout')"
                  class="border-b-0"
                  type="date"
                  @update:model-value="choosedate"
              >
                <template #icon>
                  <font-awesome-icon :icon="['fas', 'calendar-days']"/>
                </template>
              </search>
            </div>
            <div class="lg:mr-[12px] ml-auto">
              <button
                  class="text-white flex items-center justify-center bg-[#3B71FE] lg:rounded-full rounded-bl-[20px] rounded-br-[20px] w-full h-[60px] font-medium leading-5 transition-all duration-200 py-[15px] px-[35px] hover:brightness-[115%]">
                <span class="text-base mr-[8px]">
                  <font-awesome-icon :icon="['fas', 'magnifying-glass']"/>
                </span>
                {{ t('common.search') }}
              </button>
            </div>
          </form>
        </div>
        <div v-show="settings.tabActive == 2">
          <search-activity/>
        </div>
        <div v-show="settings.tabActive == 3" class="tvl-search-form rounded-[24px] lg:rounded-[70px]">
          <form class="lg:flex block justify-between flex-nowrap items-center">
            <div class="relative w-full lg:w-[25%]">
              <search
                  v-model:model-value="settings.searchKeywordLocation"
                  :data="settings.locations"
                  :description="t('common.whereAreYouGoing')"
                  :input="true"
                  :label="t('common.location')"
                  class="bulkhead"
              >
                <template #headerDropdown>
                  <li class="location-heading">
                    <span>{{ t('common.popularDestinations') }}</span>
                  </li>
                </template>
                <template #icon>
                  <font-awesome-icon :icon="['fas', 'location-dot']"/>
                </template>
              </search>
            </div>
            <div
                class="flex relative lg:justify-center justify-between items-center form-date-field lg:min-w-[32%] min-w-full lg:border-b-0 border-b border-solid border-[#dedede]">
              <search
                  v-model:model-value="settings.dateCheckin"
                  :date-custom="{
                  shortcuts: false,
                  noInput: true,
                }"
                  :description="settings.checkinSelected"
                  :label="t('common.checkin')"
                  class="border-b-0"
                  type="date"
                  @update:model-value="choosedate"
              >
                <template #icon>
                  <font-awesome-icon :icon="['fas', 'calendar-days']"/>
                </template>
              </search>
              <span class="text-sm mr-[16px] text-[#5E6D77]">
                <font-awesome-icon :icon="['fas', 'arrow-right']"/>
              </span>
              <search
                  v-model:model-value="settings.dateCheckout"
                  :date-custom="{
                  shortcuts: false,
                  noInput: true,
                }"
                  :description="settings.checkoutSelected"
                  :label="t('common.checkout')"
                  class="border-b-0"
                  type="date"
                  @update:model-value="choosedate"
              >
                <template #icon>
                  <font-awesome-icon :icon="['fas', 'calendar-days']"/>
                </template>
              </search>
            </div>
            <div class="relative lg:px-[30px] px-0 m-h-[82px] min-w-[22%]">
              <search
                  v-model:model-value="settings.searchKeywordLocation"
                  :data="settings.locations"
                  :description="`${settings.guests.guestTotal} guest, ${settings.guests.roomTotal} room`"
                  :label="t('common.guests')"
                  type="custom"
              >
                <template #body>
                  <ul class="px-[15px]">
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
                </template>
                <template #icon>
                  <font-awesome-icon :icon="['fas', 'users']"/>
                </template>
              </search>
            </div>
            <div class="lg:mr-[12px] ml-auto">
              <button
                  class="text-white flex items-center justify-center bg-[#3B71FE] lg:rounded-full rounded-bl-[20px] rounded-br-[20px] w-full h-[60px] font-medium leading-5 transition-all duration-200 py-[15px] px-[35px] hover:brightness-[115%]">
                <span class="text-base mr-[8px]">
                  <font-awesome-icon :icon="['fas', 'magnifying-glass']"/>
                </span>
                {{ t('common.search') }}
              </button>
            </div>
          </form>
        </div>
        <div v-show="settings.tabActive == 4"
             class="tvl-search-form lg:max-w-[870px] max-w-full rounded-[24px] lg:rounded-[70px]">
          <form class="lg:flex block justify-between flex-nowrap items-center">
            <div class="relative w-full lg:w-[25%]">
              <search
                  v-model:model-value="settings.searchKeywordLocation"
                  :data="settings.locations"
                  :description="t('common.whereAreYouGoing')"
                  :input="true"
                  :label="t('common.location')"
                  class="bulkhead"
              >
                <template #headerDropdown>
                  <li class="location-heading">
                    <span>{{ t('common.popularDestinations') }}</span>
                  </li>
                </template>
                <template #icon>
                  <font-awesome-icon :icon="['fas', 'location-dot']"/>
                </template>
              </search>
            </div>
            <div
                class="flex relative lg:justify-center justify-between items-center form-date-field lg:min-w-[32%] min-w-full lg:border-b-0 border-b border-solid border-[#dedede]">
              <search
                  v-model:model-value="settings.dateCheckin"
                  :date-custom="{
                  shortcuts: false,
                  noInput: true,
                }"
                  :description="settings.checkinSelected"
                  :label="t('common.pickUp')"
                  class="border-b-0"
                  type="date"
                  @update:model-value="choosedate"
              >
                <template #icon>
                  <font-awesome-icon :icon="['fas', 'calendar-days']"/>
                </template>
              </search>
              <span class="text-sm mr-[16px] text-[#5E6D77]">
                <font-awesome-icon :icon="['fas', 'arrow-right']"/>
              </span>
              <search
                  v-model:model-value="settings.dateCheckout"
                  :date-custom="{
                  shortcuts: false,
                  noInput: true,
                }"
                  :description="settings.checkoutSelected"
                  :label="t('common.dropOff')"
                  class="border-b-0"
                  type="date"
                  @update:model-value="choosedate"
              >
                <template #icon>
                  <font-awesome-icon :icon="['fas', 'calendar-days']"/>
                </template>
              </search>
            </div>
            <div class="lg:mr-[12px] ml-auto">
              <button
                  class="text-white flex items-center justify-center bg-[#3B71FE] lg:rounded-full rounded-bl-[20px] rounded-br-[20px] w-full h-[60px] font-medium leading-5 transition-all duration-200 py-[15px] px-[35px] hover:brightness-[115%]">
                <span class="text-base mr-[8px]">
                  <font-awesome-icon :icon="['fas', 'magnifying-glass']"/>
                </span>
                {{ t('common.search') }}
              </button>
            </div>
          </form>
        </div>
        <div v-show="settings.tabActive == 5"
             class="tvl-search-form lg:max-w-[870px] max-w-full rounded-[24px] lg:rounded-[70px]">
          <form class="lg:flex block justify-between flex-nowrap items-center">
            <div class="relative w-full">
              <search
                  v-model:model-value="settings.searchKeywordLocation"
                  :data="settings.locations"
                  :description="t('common.whereAreYouGoing')"
                  :input="true"
                  :label="t('common.pickUp')"
                  class="bulkhead"
              >
                <template #headerDropdown>
                  <li class="location-heading">
                    <span>{{ t('common.popularDestinations') }}</span>
                  </li>
                </template>
                <template #icon>
                  <font-awesome-icon :icon="['fas', 'location-dot']"/>
                </template>
              </search>
            </div>
            <div class="relative w-full">
              <search
                  v-model:model-value="settings.searchKeywordLocation"
                  :data="settings.locations"
                  :description="t('common.whereAreYouGoing')"
                  :input="true"
                  :label="t('common.dropOff')"
              >
                <template #headerDropdown>
                  <li class="location-heading">
                    <span>{{ t('common.popularDestinations') }}</span>
                  </li>
                </template>
                <template #icon>
                  <font-awesome-icon :icon="['fas', 'location-dot']"/>
                </template>
              </search>
            </div>
            <div class="lg:mr-[12px] ml-auto">
              <button
                  class="text-white flex items-center justify-center bg-[#3B71FE] lg:rounded-full rounded-bl-[20px] rounded-br-[20px] w-full h-[60px] font-medium leading-5 transition-all duration-200 py-[15px] px-[35px] hover:brightness-[115%]">
                <span class="text-base mr-[8px]">
                  <font-awesome-icon :icon="['fas', 'magnifying-glass']"/>
                </span>
                {{ t('common.search') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.tabs {
  .nav {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    justify-content: center;

    .nav-item {
      margin: 0 17px 24px;

      .nav-link {
        display: block;
        padding-bottom: 5px;
        text-decoration: none;
        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out;
      }
    }
  }

  .tab-content {
    .tab-panel {
      .tvl-search-form {
        background: #fff;
        border: 1px solid #dedede;
        box-shadow: 0 1px 2px rgba(0, 0, 0, .08), 0 4px 12px rgba(0, 0, 0, .05);

        .form-date-field::after {
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

        @media screen and (max-width: 1024px) {
          .form-date-field::after {
            width: 0;
            height: 0;
          }
        }
      }
    }
  }
}
</style>