<script setup lang="jsx">
import { useMessage } from 'naive-ui';
const { restAPI } = useApi();
const config = useRuntimeConfig();
const userStore = useUserStore();
const message = useMessage();
const route = useRoute();
const formValue = reactive({
  childType:'rental amenty',
  serviceId:null
})
const isReload = ref(true)
const selectType = [
   {
    label:"Rental amenty",
    value:"rental amenty"
   },
   {
    label:"Rental type",
    value:"rental type"
   },
   {
    label:"Rental suitability",
    value:"rental suitability"
   },
   {
    label:"Rental amenty Category",
    value:"rental amenty Category"
   }
]
let selectRental = [
]
const handleOkPopConfirm =async (record)=>{
  console.log(record)
  let url = ""
   if(formValue.childType === selectType[0].value){
     url = restAPI.API_ENDPOINTEXPORT.cms.children.addRentalAmenty;
   }else if(formValue.childType === selectType[1].value){
     url = restAPI.API_ENDPOINTEXPORT.cms.children.addRentalType;
   }else if(formValue.childType === selectType[2].value){
      url = restAPI.API_ENDPOINTEXPORT.cms.children.addRentalSuitalibity;
   }else if(formValue.childType === selectType[3].value){
    url = restAPI.API_ENDPOINTEXPORT.cms.children.addRentalAmentyCategory;
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
const { data: resRental } = await restAPI.cms.getSVRental();
if (resRental.value?.success) {
  selectRental = resRental.value?.data?.map((c) => ({
  label: c.name,
  value: c.id,
}));
} else message.error(resRental.value?.message || "Lấy dự liệu thất bại!");

const columnsRentalType = [
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
          onClick={() => navigateTo('/cms/children/rental/add-edit?type=' + formValue.childType + '&rentalId=' + formValue.serviceId + '&object=' + JSON.stringify(record) +'&isEdit='+true)}
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
const columnsRentalAmenty = [
  {
    title: "Index",
    width: 60,
    align: "center",
    render: (_, index) => <div>{index + 1}</div>,
  },
  {
    title: "Name",
    align: "center",
    render: (row, index) => <div>{row.rental_amenty_category?.name}</div>,
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
          onClick={() => navigateTo('/cms/children/rental/add-edit?type=' + formValue.childType + '&rentalId=' + formValue.serviceId + '&object=' + JSON.stringify(record) +'&isEdit='+true)}
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
const columnsSuitability = [
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
          onClick={() => navigateTo('/cms/children/rental/add-edit?type=' + formValue.childType + '&rentalId=' + formValue.serviceId + '&object=' + JSON.stringify(record) +'&isEdit='+true)}
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
const columnsAmentyCategory = [
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
          onClick={() => navigateTo('/cms/children/hotel/add-edit?type=' + formValue.childType + '&rentalId=' + formValue.serviceId + '&object=' + JSON.stringify(record) +'&isEdit='+true)}
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
const loading = ref(false);
const dataTable = ref({
  columns: columnsRentalType,
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
        case selectType[0].value:
          const { data: resRentalAmenty } = await restAPI.cms.getRentalAmenty(formValue.serviceId);
          if (resRentalAmenty.value?.success) {
            loading.value = false
            dataTable.value = {
              columns: columnsRentalAmenty,
              data: resRentalAmenty.value?.data || [],
            };
          } else
            message.error(resRentalAmenty.value?.message || "Lấy dự liệu thất bại!");
          break;
        case selectType[1].value:
          const { data: resRentalType } = await restAPI.cms.getRentalType(formValue.serviceId);
          if (resRentalType.value?.success) {
            console.log(resRentalType.value?.data)
            loading.value = false
            dataTable.value = {
              columns: columnsRentalType,
              data: resRentalType.value?.data || [],
            };
          } else
            message.error(resRentalType.value?.message || "Lấy dự liệu thất bại!");
          break;
        case selectType[2].value:
        const { data: resSuit } = await restAPI.cms.getRentalSuitability(formValue.serviceId);
          if (resSuit.value?.success) {
            loading.value = false
            dataTable.value = {
              columns: columnsSuitability,
              data: resSuit.value?.data || [],
            };
          } else
            message.error(resSuit.value?.message || "Lấy dự liệu thất bại!");
          break;
          case selectType[3].value:
          const { data: resAmentyCate } = await restAPI.cms.getRentalAmentyCategory();
            if (resAmentyCate.value?.success) {
              loading.value = false
              dataTable.value = {
                columns: columnsAmentyCategory,
                data: resAmentyCate.value?.data || [],
              };
            } else
            message.error(resAmentyCate.value?.message || "Lấy dự liệu thất bại!");
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
          <NFormItem path="serviceId" label="Select rental">
            <NSelect
              v-model:value="formValue.serviceId"
              :options="selectRental"
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
              navigateTo('/cms/children/rental/add-edit?type=' + formValue.childType + '&rentalId=' + formValue.serviceId);
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