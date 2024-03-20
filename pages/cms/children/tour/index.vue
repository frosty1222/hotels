<script setup lang="jsx">
import { useMessage } from 'naive-ui';
const { restAPI } = useApi();
const config = useRuntimeConfig();
const userStore = useUserStore();
const message = useMessage();
const route = useRoute();
const formValue = reactive({
  childType:'tour language category',
  serviceId:null
})
console.log("formValue:", formValue);
const isReload = ref(true)
const selectType = [
   {
    label:"Tour language",
    value:"tour language"
   },
   {
    label:"Tour language category",
    value:"tour language category"
   },
   {
    label:"Tour duration",
    value:"tour duration"
   },
   {
    label:"Tour duration category",
    value:"tour duration category"
   },
   {
    label:"Tour facility",
    value:"tour facility"
   },
   {
    label:"Tour bulkdiscount",
    value:"tour bulkdiscount"
   }
]
let selectTour = [
]
const handleOkPopConfirm =async (record)=>{
  console.log(record)
  let url = ""
   if(formValue.childType === selectType[0].value){
     url = restAPI.API_ENDPOINTEXPORT.cms.children.addLanguageTour;
   }else if(formValue.childType === selectType[1].value){
     url = restAPI.API_ENDPOINTEXPORT.cms.children.addTourCategoryLanguage;
   }else if(formValue.childType === selectType[2].value){
    url = restAPI.API_ENDPOINTEXPORT.cms.children.addTourDuration;
   }else if(formValue.childType === selectType[3].value){
    url = restAPI.API_ENDPOINTEXPORT.cms.children.addTourDurationCategory;
   }else if(formValue.childType === selectType[4].value){
    url = restAPI.API_ENDPOINTEXPORT.cms.children.addTourFacility;
   }else if(formValue.childType === selectType[5].value){
    url = restAPI.API_ENDPOINTEXPORT.cms.children.addTourBulkdiscount;
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
const { data: resTour } = await restAPI.cms.getSVTour();
if (resTour.value?.success) {
  selectTour = resTour.value?.data?.map((c) => ({
  label: c.name,
  value: c.id,
}));
} else message.error(resTour.value?.message || "Lấy dự liệu thất bại!");


const columnsTourLanguage = [
  {
    title: "Index",
    width: 60,
    align: "center",
    render: (_, index) => <div>{index + 1}</div>,
  },
  {
    title: "Name",
    align: "center",
    render: (row, index) => <div>{row.tour_language_category?.name}</div>,
  },
  {
    title: "Actions",
    align: "center",
    width: 100,
    render: (record) => (
      <div class="flex justify-center gap-2">
        <button
          class="flex items-center text-primary-blue bg-transparent outline-none p-0 !font-500"
          onClick={() => navigateTo('/cms/children/tour/add-edit?type=' + formValue?.childType + '&tourId=' + formValue.serviceId + '&object=' + JSON.stringify(record) +'&isEdit='+true)}
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
const columnsTourLanguacategory = [
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
          onClick={() => navigateTo('/cms/children/tour/add-edit?type=' + formValue?.childType + '&tourId=' + formValue.serviceId + '&object=' + JSON.stringify(record) +'&isEdit='+true)}
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
const columnsTourduration = [
  {
    title: "Index",
    width: 60,
    align: "center",
    render: (_, index) => <div>{index + 1}</div>,
  },
  {
    title: "Name",
    align: "center",
    render: (row, index) => <div>{row.tour_duration_category.name}</div>,
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
          onClick={() => navigateTo('/cms/children/tour/add-edit?type=' + formValue?.childType + '&tourId=' + formValue.serviceId + '&object=' + JSON.stringify(record) +'&isEdit='+true)}
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
const columnsTourdurationCategory = [
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
          onClick={() => navigateTo('/cms/children/tour/add-edit?type=' + formValue?.childType + '&tourId=' + formValue.serviceId + '&object=' + JSON.stringify(record) +'&isEdit='+true)}
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
const columnsTourFacility = [
  {
    title: "Index",
    width: 60,
    align: "center",
    render: (_, index) => <div>{index + 1}</div>,
  },
  {
  title: "Highlighted",
  align: "center",
  render: (row, index) => (
    <div key={index}>
      {row.highlighted.map((highlight, idx) => (
        <div key={idx}>{highlight.name}</div>
      ))}
    </div>
  )
},
  {
  title: "IncludedAndExcluded",
  align: "center",
  render: (row, index) => {
    let includeName = "";
    let excludeName = "";

    // Check if the row includes the 'IncludedAndExcluded' key and if it contains 'include' and 'exclude' arrays
    if (row.IncludedAndExcluded && row.IncludedAndExcluded.length > 0) {
      const included = row.IncludedAndExcluded.find(obj => obj.include);
      const excluded = row.IncludedAndExcluded.find(obj => obj.exclude);

      // Access the 'name' property inside the 'include' array
      if (included && included.include && included.include.length > 0) {
        includeName = included.include[0].name;
      }

      // Access the 'name' property inside the 'exclude' array
      if (excluded && excluded.exclude && excluded.exclude.length > 0) {
        excludeName = excluded.exclude[0].name;
      }
    }

    return <div key={index}>include: {includeName} - exclude: {excludeName}</div>;
  }
},
{
  title: "Itinerary",
  align: "center",
  render: (row, index) => (
    <div key={index}>
      {row.itinerary.map((item, idx) => (
        <div key={idx}>
          <div>Time: {item.time}</div>
          <div>Title: {item.title}</div>
          <div>Description: {item.description}</div>
        </div>
      ))}
    </div>
  )
},

  {
  title: "Duration",
  align: "center",
  render: (row, index) => {
    let durations = "";

    // Check if the row includes the 'language' key and if it contains an array of languages
    if (row.duration && row.duration.length > 0) {
      // Join the array of languages into a single string
      durations = row.duration.join(', ');
    }

    return <div key={index}>{durations}</div>;
  }
},

  {
  title: "Language",
  align: "center",
  render: (row, index) => {
    let languages = "";

    // Check if the row includes the 'language' key and if it contains an array of languages
    if (row.language && row.language.length > 0) {
      // Join the array of languages into a single string
      languages = row.language.join(', ');
    }

    return <div key={index}>{languages}</div>;
  }
},

  {
  title: "Passenger",
  align: "center",
  render: (row, index) => {
    let passengers = "";

    // Check if the row includes the 'passenger' key and if it contains an array of passengers
    if (row.passenger && row.passenger.length > 0) {
      // Map through the array of passengers and concatenate key-value pairs
      passengers = row.passenger.map(passenger => `${passenger.key}: ${passenger.value}`).join(', ');
    }

    return <div key={index}>{passengers}</div>;
  }
},
  {
    title: "Actions",
    align: "center",
    width: 100,
    render: (record) => (
      <div class="flex justify-center gap-2">
        <button
          class="flex items-center text-primary-blue bg-transparent outline-none p-0 !font-500"
          onClick={() => navigateTo('/cms/children/tour/add-edit?type=' + formValue?.childType + '&tourId=' + formValue.serviceId + '&object=' + JSON.stringify(record) +'&isEdit='+true)}
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
const columnsTourBulkdiscount = [
{
    title: "Index",
    width: 60,
    align: "center",
    render: (_, index) => <div>{index + 1}</div>,
  },
  {
    title: "Group",
    align: "center",
    render: (row, index) => <div>{row.group}</div>,
  },
  {
    title: "From adult",
    align: "center",
    render: (row, index) => <div>{row.from_adult}</div>,
  },
  {
    title: "Value",
    align: "center",
    render: (row, index) => <div>{row.value}</div>,
  },
  {
    title: "To adult",
    align: "center",
    render: (row, index) => <div>{row.to_adult}</div>,
  },
  {
    title: "Actions",
    align: "center",
    width: 100,
    render: (record) => (
      <div class="flex justify-center gap-2">
        <button
          class="flex items-center text-primary-blue bg-transparent outline-none p-0 !font-500"
          onClick={() => navigateTo('/cms/children/tour/add-edit?type=' + formValue?.childType + '&tourId=' + formValue.serviceId + '&object=' + JSON.stringify(record) +'&isEdit='+true)}
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
  columns:[],
  data: [],
});
watch(
  () => [formValue?.childType,formValue?.serviceId],
  async ([newType, newReload]) => {
    if (newType && newReload) {
      loading.value = true;
      switch (newType) {
        case selectType[0].value:
          const { data: resTourLang } = await restAPI.cms.getTourLanguage(formValue.serviceId);
          if (resTourLang.value?.success) {
            loading.value = false
            dataTable.value = {
              columns: columnsTourLanguage,
              data: resTourLang.value?.data || [],
            };
          } else
            message.error(resTourLang.value?.message || "Lấy dự liệu thất bại!");
          break;
        case selectType[1].value:
          const { data: resTourLangCate } = await restAPI.cms.getTourLanguageCategory(formValue.serviceId);
          if (resTourLangCate.value?.success) {
            loading.value = false
            dataTable.value = {
              columns: columnsTourLanguacategory,
              data: resTourLangCate.value?.data || [],
            };
          } else
            message.error(resTourLangCate.value?.message || "Lấy dự liệu thất bại!");
          break;
          case selectType[2].value:
          const { data: resTourDuration } = await restAPI.cms.getTourDuration(formValue.serviceId);
          if (resTourDuration.value?.success) {
            loading.value = false
            dataTable.value = {
              columns: columnsTourduration,
              data: resTourDuration.value?.data || [],
            };
          } else
            message.error(resTourDuration.value?.message || "Lấy dự liệu thất bại!");
          break;
          case selectType[3].value:
          const { data: resTourDurationCategory } = await restAPI.cms.getTourDurationCategory(formValue.serviceId);
          if (resTourDurationCategory.value?.success) {
            loading.value = false
            dataTable.value = {
              columns: columnsTourdurationCategory,
              data: resTourDurationCategory.value?.data || [],
            };
          } else
            message.error(resTourDurationCategory.value?.message || "Lấy dự liệu thất bại!");
          break;
          case selectType[4].value:
          const { data:resTourFacility } = await restAPI.cms.getTourFacility(formValue.serviceId);
          if (resTourFacility.value?.success) {
            loading.value = false
            dataTable.value = {
              columns: columnsTourFacility,
              data: resTourFacility.value?.data || [],
            };
          } else
            message.error(resTourFacility.value?.message || "Lấy dự liệu thất bại!");
          break;
          case selectType[5].value:
          const { data: resTourBulkDiscount } = await restAPI.cms.getTourBulkdiscount(formValue.serviceId);
          if (resTourBulkDiscount.value?.success) {
            loading.value = false
            dataTable.value = {
              columns: columnsTourBulkdiscount,
              data: resTourBulkDiscount.value?.data || [],
            };
          } else
            message.error(resTourBulkDiscount.value?.message || "Lấy dự liệu thất bại!");
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
          <NFormItem path="serviceId" label="Select tour">
            <NSelect
              v-model:value="formValue.serviceId"
              :options="selectTour"
            />
          </NFormItem>
        </NGi>
        <NGi
          span="24 s:8 m:16 xl:18"
          class="flex items-center gap-2 justify-end"
        >
          <NButton
            class="bg-blue-500 text-white"
            @click="
              navigateTo('/cms/children/tour/add-edit?type=' + formValue?.childType + '&tourId=' + formValue.serviceId);
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
          :columns="dataTable?.columns"
          :data="dataTable?.data"
          scroll-x="900"
          :pagination="paginationReactive"
        />
      </div>
  </div>

</template>