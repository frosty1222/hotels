<script setup lang="jsx">
import { c, useMessage } from 'naive-ui';
const { restAPI } = useApi();
const config = useRuntimeConfig();
const userStore = useUserStore();
const message = useMessage();
const formValue = reactive({
  childType:'room',
  serviceId:null
})
const selectType = [
   {
    label:"Room",
    value:"room"
   },
   {
    label:"Room facility",
    value:"room facility"
   }
]
let id = null;
let selectHotel = [
]
let selectRoom = [
  
]
const { data: resRoom } = await restAPI.cms.getRoom('');
  if (resRoom.value?.success) {
    selectRoom = resRoom.value?.data?.map((c) => ({
    label: c.name,
    value: c.id,
  }));
  } else message.error(resRoom.value?.message || "Lấy dự liệu thất bại!");
const handleOkPopConfirm =async (record)=>{
  console.log(record)
  let url = ""
   if(formValue.childType === selectType[0].value){
     url = restAPI.API_ENDPOINTEXPORT.cms.children.addRoom;
   }else if(formValue.childType === selectType[1].value){
     url = restAPI.API_ENDPOINTEXPORT.cms.children.addRoomFacility;
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

const columnsRoom = [
  {
    title: "Index",
    width: 60,
    align: "center",
    render: (_, index) => <div>{index + 1}</div>,
  },
  {
    title: "Name",
    align: "center",
    render: (row, index) => <div>{row?.name}</div>,
  },
  {
    title: "Room footage",
    align: "center",
    render: (row, index) => <div>{row?.room_footage}</div>,
  },
  {
    title: "No bed",
    align: "center",
    render: (row, index) => <div>{row?.no_bed}</div>,
  },
  {
    title: "No Adult",
    align: "center",
    render: (row, index) => <div>{row?.no_adults}</div>,
  },
  {
    title: "No Children",
    align: "center",
    render: (row, index) => <div>{row?.no_children}</div>,
  },
  {
    title:"Price",
    align:"center",
    render: (row, index) => <div>{row?.price}</div>,
  },
  {
    title:"Amount",
    align:"center",
    render: (row, index) => <div>{row?.amount}</div>,
  },
  {
    title: "Image",
    align: "center",
    render: (row, index) => (
      <div class="flex justify-center">
        <img
          src={`${config.public.baseURL}/photo/${row.images?.[0]?.fileName}`}
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
          onClick={() => navigateTo('/cms/children/room/add-edit?type=' + formValue.childType + '&object=' + JSON.stringify(record) +'&isEdit='+true)}
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
const columnsRoomFacility = [
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
          onClick={() => navigateTo('/cms/children/room/add-edit?type=' + formValue.childType + '&object=' + JSON.stringify(record) +'&isEdit='+true)}
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
  columns: columnsRoom,
  data: [],
});
watch(
  () => [formValue.childType, formValue.serviceId, formValue.roomId],
  async ([newType, newServiceId, newRoomId]) => {
    if ([newType, newServiceId, newRoomId].some(value => value)) { // Modified condition
      loading.value = true;
      switch (newType) {
        case selectType[0].value:
          const { data: resRoom } = await restAPI.cms.getRoom(newServiceId ? newServiceId : '');
          if (resRoom.value?.success) {
            loading.value = false;
            dataTable.value = {
              columns: columnsRoom,
              data: resRoom.value?.data || [],
            };
          } else {
            message.error(resRoom.value?.message || "Lấy dữ liệu thất bại!");
          }
          break;
        case selectType[1].value:
          const { data: resRoomFacility } = await restAPI.cms.getRoomFacility(newRoomId);
          if (resRoomFacility.value?.success) {
            loading.value = false;
            dataTable.value = {
              columns: columnsRoomFacility,
              data: resRoomFacility.value?.data || [],
            };
          } else {
            message.error(resRoomFacility.value?.message || "Lấy dữ liệu thất bại!");
          }
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
        <NGi span="24 s:8 m:8 xl:6" v-if="formValue.childType !== 'room facility'">
          <NFormItem path="serviceId" label="Select Hotel">
            <NSelect
              v-model:value="formValue.serviceId"
              :options="selectHotel"
            />
          </NFormItem>
        </NGi>
        <NGi span="24 s:8 m:8 xl:6" v-if="formValue.childType === 'room facility'">
          <NFormItem path="roomId" label="Select Room">
            <NSelect
              v-model:value="formValue.roomId"
              :options="selectRoom"
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
                    navigateTo('/cms/children/room/add-edit?type=' + formValue.childType + '&Id=' + (formValue.childType === 'room' ? formValue.serviceId : formValue.roomId));
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