<script setup lang="jsx">
import { useMessage } from 'naive-ui';
const { restAPI } = useApi();
const config = useRuntimeConfig();
const userStore = useUserStore();
const message = useMessage();
const route = useRoute();
const formValue = reactive({
  childType:'hotel rule',
  serviceId:null
})
const isReload = ref(true)
const selectType = [
   {
    label:"Hotel rule",
    value:"hotel rule"
   },
   {
    label:"Hotel facility",
    value:"hotel facility"
   },
   {
    label:"Hotel theme",
    value:"hotel theme"
   },
   {
    label:"Hotel star",
    value:"hotel star"
   },
   {
    label:"Hotel facility category",
    value:"hotel facility category"
   }
]
let selectHotel = [
]
const handleOkPopConfirm =async (record)=>{
  console.log(record)
  let url = ""
   if(formValue.childType === 'hotel rule'){
     url =  "/api/hotel/add-hotel-rule";
   }else if(formValue.childType === 'hotel facility'){
     url = "/api/hotel/add-hotel-facility";
   }else if(formValue.childType === 'hotel theme'){
      url = "/api/category/add-hotel-theme";
   }else if(formValue.childType === 'hotel facility category'){
    url = restAPI.API_ENDPOINTEXPORT.cms.children.addHotelFacilityCategory;
   }
      const body = {
        status:'delete',
        id:record.id
      };
      const response = await fetch(
        config.public.baseURL + url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userStore.userInfo.accessToken,
          },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      if (data?.success) {
        loading.value = true
        message.success(data?.message);
        setInterval(() => {
          window.location.reload();
        }, 3000); 
      } else message.error(data?.message);
}
const { data: resHotel } = await restAPI.cms.getSVHotel();
if (resHotel.value?.success) {
  selectHotel = resHotel.value?.data?.map((c) => ({
  label: c.name,
  value: c.id,
}));
} else message.error(resHotel.value?.message || "Lấy dự liệu thất bại!");

const columnsHotelRule = [
  {
    title: "Index",
    width: 60,
    align: "center",
    render: (_, index) => <div>{index + 1}</div>,
  },
  {
    title: "Name",
    align: "center",
    render: (row, index) => <div>{row.name}</div>,
  },
  {
    title: "Value",
    align: "center",
    render: (row, index) => <div>{row.value}</div>,
  },
  {
    title: "Actions",
    align: "center",
    width: 100,
    render: (record) => (
      <div class="flex justify-center gap-2">
        <button
          class="flex items-center text-primary-blue bg-transparent outline-none p-0 !font-500"
          onClick={() => navigateTo('/cms/children/hotel/add-edit?type=' + formValue.childType + '&hotelId=' + formValue.serviceId + '&object=' + JSON.stringify(record) +'&isEdit='+true)}
        >
          <Icon
            name="material-symbols:edit-square-outline"
            class="text-2xl text-[#009DFF]"
          />
        </button>
        <NPopconfirm
          showIcon={false}
          negativeText="Hủy"
          positiveText="Xóa"
          onPositiveClick={() => handleOkPopConfirm(record)}
        >
          {{
            activator: () => (
              <button class="flex items-center text-red bg-transparent outline-none p-0 !font-500">
                <Icon
                  name="material-symbols:delete-outline"
                  class="text-2xl text-red-500"
                />
              </button>
            ),
            default: () => "Xác nhận xóa",
          }}
        </NPopconfirm>
      </div>
    ),
  },
]
const columnsFacility = [
{
    title: "Index",
    width: 60,
    align: "center",
    render: (_, index) => <div>{index + 1}</div>,
  },
  {
    title: "Name",
    align: "center",
    render: (row, index) => <div>{row.hotel_facility_category.name}</div>,
  },
  {
    title: "Icon",
    align: "center",
    render: (row, index) => (
      <div class="flex justify-center">
        <img
          src={`${config.public.baseURL}/photo/${row.icon}`}
          class="w-10 h-8 rounded-[10px]"
        />
      </div>
    ),
   },
  {
    title: "Actions",
    align: "center",
    width: 100,
    render: (record) => (
      <div class="flex justify-center gap-2">
        <button
          class="flex items-center text-primary-blue bg-transparent outline-none p-0 !font-500"
          onClick={() => navigateTo('/cms/children/hotel/add-edit?type=' + formValue.childType + '&hotelId=' + formValue.serviceId + '&object=' + JSON.stringify(record) +'&isEdit='+true)}
        >
          <Icon
            name="material-symbols:edit-square-outline"
            class="text-2xl text-[#009DFF]"
          />
        </button>
        <NPopconfirm
          showIcon={false}
          negativeText="Hủy"
          positiveText="Xóa"
          onPositiveClick={() => handleOkPopConfirm(record)}
        >
          {{
            activator: () => (
              <button class="flex items-center text-red bg-transparent outline-none p-0 !font-500">
                <Icon
                  name="material-symbols:delete-outline"
                  class="text-2xl text-red-500"
                />
              </button>
            ),
            default: () => "Xác nhận xóa",
          }}
        </NPopconfirm>
      </div>
    ),
  },
]
const columnsFacilityCategory = [
{
    title: "Index",
    width: 60,
    align: "center",
    render: (_, index) => <div>{index + 1}</div>,
  },
  {
    title: "Name",
    align: "center",
    render: (row, index) => <div>{row.name}</div>,
  },
  {
    title: "Actions",
    align: "center",
    width: 100,
    render: (record) => (
      <div class="flex justify-center gap-2">
        <button
          class="flex items-center text-primary-blue bg-transparent outline-none p-0 !font-500"
          onClick={() => navigateTo('/cms/children/hotel/add-edit?type=' + formValue.childType + '&hotelId=' + formValue.serviceId + '&object=' + JSON.stringify(record) +'&isEdit='+true)}
        >
          <Icon
            name="material-symbols:edit-square-outline"
            class="text-2xl text-[#009DFF]"
          />
        </button>
        <NPopconfirm
          showIcon={false}
          negativeText="Hủy"
          positiveText="Xóa"
          onPositiveClick={() => handleOkPopConfirm(record)}
        >
          {{
            activator: () => (
              <button class="flex items-center text-red bg-transparent outline-none p-0 !font-500">
                <Icon
                  name="material-symbols:delete-outline"
                  class="text-2xl text-red-500"
                />
              </button>
            ),
            default: () => "Xác nhận xóa",
          }}
        </NPopconfirm>
      </div>
    ),
  },
]
const columnsTheme = [
{
    title: "Index",
    width: 60,
    align: "center",
    render: (_, index) => <div>{index + 1}</div>,
  },
  {
    title: "Name",
    align: "center",
    render: (row, index) => <div>{row.name}</div>,
  },
  {
    title: "Actions",
    align: "center",
    width: 100,
    render: (record) => (
      <div class="flex justify-center gap-2">
        <button
          class="flex items-center text-primary-blue bg-transparent outline-none p-0 !font-500"
          onClick={() => navigateTo('/cms/children/hotel/add-edit?type=' + formValue.childType + '&hotelId=' + formValue.serviceId + '&object=' + JSON.stringify(record) +'&isEdit='+true)}
        >
          <Icon
            name="material-symbols:edit-square-outline"
            class="text-2xl text-[#009DFF]"
          />
        </button>
        <NPopconfirm
          showIcon={false}
          negativeText="Hủy"
          positiveText="Xóa"
          onPositiveClick={() => handleOkPopConfirm(record)}
        >
          {{
            activator: () => (
              <button class="flex items-center text-red bg-transparent outline-none p-0 !font-500">
                <Icon
                  name="material-symbols:delete-outline"
                  class="text-2xl text-red-500"
                />
              </button>
            ),
            default: () => "Xác nhận xóa",
          }}
        </NPopconfirm>
      </div>
    ),
  },
]
const columnstar = [
  {
    title: "Index",
    width: 60,
    align: "center",
    render: (_, index) => <div>{index + 1}</div>,
  },
  {
    title: "Name",
    align: "center",
    render: (row, index) => <div>{row.name}</div>,
  }
]
const loading = ref(false);
const dataTable = ref({
  columns: columnsHotelRule,
  data: [],
});
const changeIsLoading = ()=>{
  isReload.value = true
}
watch(
  () => [formValue.childType,formValue.serviceId],
  async ([newType, newReload]) => {
    if (newType && newReload) {
      loading.value = true;
      switch (newType) {
        case "hotel rule":
          const { data: resHotelRule } = await restAPI.cms.getHotelRule(formValue.serviceId);
          if (resHotelRule.value?.success) {
            loading.value = false
            dataTable.value = {
              columns: columnsHotelRule,
              data: resHotelRule.value?.data || [],
            };
          } else
            message.error(resHotel.value?.message || "Lấy dự liệu thất bại!");
          break;
        case "hotel facility":
          const { data: resFacility } = await restAPI.cms.getHotelFacilityData(formValue.serviceId);
          if (resFacility.value?.success) {
            loading.value = false
            dataTable.value = {
              columns: columnsFacility,
              data: resFacility.value?.data || [],
            };
          } else
            message.error(resFacility.value?.message || "Lấy dự liệu thất bại!");
          break;
        case 'hotel theme':
        const { data: resTheme } = await restAPI.cms.getHotelTheme();
          if (resTheme.value?.success) {
            loading.value = false
            dataTable.value = {
              columns: columnsTheme,
              data: resTheme.value?.data || [],
            };
          } else
            message.error(resTheme.value?.message || "Lấy dự liệu thất bại!");
          break;
          case 'hotel star':
          const { data: resTar } = await restAPI.cms.getStarCategory();
            if (resTar.value?.success) {
              loading.value = false
              dataTable.value = {
                columns: columnstar,
                data: resTar.value?.data || [],
              };
            } else
            message.error(resTar.value?.message || "Lấy dự liệu thất bại!");
          break;
          case 'hotel facility category':
          const { data: resFacilityCAte } = await restAPI.cms.getHotelFacility();
            if (resFacilityCAte.value?.success) {
              loading.value = false
              dataTable.value = {
                columns: columnsFacilityCategory,
                data: resFacilityCAte.value?.data || [],
              };
            } else
            message.error(resFacilityCAte.value?.message || "Lấy dự liệu thất bại!");
          break;
      }
    }
  }
);
definePageMeta({
  layout: "cms"
});
</script>

<template>
  <div>
    <NForm ref="formRef" :model="formValue">
      <NGrid x-gap="16" item-responsive responsive="screen">
        <NGi span="24 s:8 m:8 xl:6">
          <NFormItem path="childType"  label="Select Type">
            <NSelect
              v-model:value="formValue.childType"
              :options="selectType"
            />
          </NFormItem>
        </NGi>
        <NGi span="24 s:8 m:8 xl:6">
          <NFormItem path="serviceId" label="Select hotel">
            <NSelect
              v-model:value="formValue.serviceId"
              :options="selectHotel"
            />
          </NFormItem>
        </NGi>
        <NGi
          span="24 s:8 m:16 xl:18"
          class="flex items-center gap-2 justify-end"
        >
          <NButton
            v-if="formValue.childType !== 'hotel star'"
            class="bg-blue-500 text-white"
            @click="
              navigateTo('/cms/children/hotel/add-edit?type=' + formValue.childType + '&hotelId=' + formValue.serviceId);
            "
          >
            Add
          </NButton>
        </NGi>
      </NGrid>
    </NForm>
      <div class="mt-6 md:mt-0 mx-auto w-full">
        <NDataTable
          :bordered="true"
          :loading="loading"
          :single-line="false"
          single-column
          :columns="dataTable.columns"
          :data="dataTable.data"
          scroll-x="900"
          :pagination="paginationReactive"
        />
      </div>
  </div>

</template>