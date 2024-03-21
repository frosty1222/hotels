<script setup>
import { NButton, NForm, NFormItem, NInput, useMessage } from "naive-ui";
const { restAPI } = useApi();
const router = useRouter();
const route = useRoute();
const message = useMessage();
const userStore = useUserStore();
const config = useRuntimeConfig();

const type = route.query.type || "room";
const Id = route.query.Id;
let object = route.query.object ? JSON.parse(route.query.object):{}
const formValue = ref({
  name:"",
  id:"",
  status:"",
  room_footage:"",
  no_bed:"",
  no_adults:"",
  no_children:"",
  price:"",
  amount:"",
  description:"",
  images:"",
  hotelId:"",
});
const formRoomFacility = ref({
  name:"",
  icon:"",
  id:"",
  status:"",
  image:"",
  roomId:Number(Id)
})
formValue.value = {
  name:Object.keys(object).length > 0 ? object.name:"",
  hotelId:Number(Id),
  id:Object.keys(object).length > 0 ? object.id:"",
  room_footage:Object.keys(object).length > 0 ? object.room_footage:"",
  no_bed:Object.keys(object).length > 0 ? object.no_bed:"",
  no_adults:Object.keys(object).length > 0 ? object.no_adults:"",
  no_children:Object.keys(object).length > 0 ? object.no_children:"",
  price:Object.keys(object).length > 0 ? object.price:"",
  amount:Object.keys(object).length > 0 ? object.amount:"",
  description:Object.keys(object).length > 0 ? object.description:"",
  images:Object.keys(object).length > 0 ? JSON.stringify(object.images):"",
  hotelId:Id ? Number(Id):Object.keys(object).length > 0 ? Number(object.hotelId):' ',
}
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
const handleSubmit = async (e, type) => {
  e?.preventDefault();

  try {
    let endpoint;

    switch (type) {
      case selectType[0].value:
        endpoint = restAPI.API_ENDPOINTEXPORT.cms.children.addRoom;
        break;
      case selectType[1].value:
        endpoint = restAPI.API_ENDPOINTEXPORT.cms.children.addRoomFacility;
        break;
      default:
        throw new Error('Invalid type');
    }

    const body = type === 'room' ? { ...formValue.value }:{ ...formRoomFacility.value };
    const newBody = useObjectToFormData(body);
    const response = await fetch(
      config.public.baseURL + endpoint,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + userStore.userInfo.accessToken,
        },
        body: newBody,
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data?.success) {
      message.success(data?.message);
      router.go();
    } else {
      message.error("Thêm mới thất bại!");
    }
  } catch (error) {
    message.error(data?.message);
  }
};

const handleChangefacility = (file) => {
  formRoomFacility.value.image = file.fileList[0].file;
};
const handleChangeRoom = (files) => {
  formValue.value.images = files.fileList;
};
</script>

<template>
  <div>
    <NForm
      ref="formRef"
      :model="formValue"
      size="large"
      class="mt-6 w-full lg:w-1/2"
    >
      <NFormItem label="Name"  v-if="type === 'room'">
        <NInput v-model:value="formValue.name" />
      </NFormItem>
      <NFormItem label="Name"  v-if="type === 'room facility'">
        <NInput v-model:value="formRoomFacility.name" />
      </NFormItem>
      <NFormItem label="Room Footage" v-if="type === 'room'">
        <NInput v-model:value="formValue.room_footage" />
      </NFormItem>
      <NFormItem label="No Bed" v-if="type === 'room'">
        <NInput v-model:value="formValue.no_bed" />
      </NFormItem>
      <NFormItem label="No Adult" v-if="type === 'room'">
        <NInput v-model:value="formValue.no_adults" />
      </NFormItem>
      <NFormItem label="No Children" v-if="type === 'room'">
        <NInput v-model:value="formValue.no_children" />
      </NFormItem>
      <NFormItem label="Price" v-if="type === 'room'">
        <NInput v-model:value="formValue.price" />
      </NFormItem>
      <NFormItem label="Amount" v-if="type === 'room'">
        <NInput v-model:value="formValue.amount" />
      </NFormItem>
      <NFormItem label="Description" v-if="type === 'room'">
         <NInput v-model:value="formValue.description" />
      </NFormItem>
        <NFormItem label="Image" v-if="type === 'room'">
          <NUpload
            accept="image/*"
            list-type="image-card"
            :data="formValue.images"
            :on-change="handleChangeRoom"
            :multiple="true"
          >
            Click to Upload
          </NUpload>
        </NFormItem>
        <NFormItem label="Image" v-if="type === 'room facility'">
        <NUpload
          accept="image/*"
          list-type="image-card"
          :data="formRoomFacility.image"
          :on-change="handleChangefacility"
          :multiple="false"
        >
          Click to Upload
        </NUpload>
      </NFormItem>
      <NFormItem class="mt-10 float-right">
        <NButton @click="router.go(-1)" class="mr-2">
          <span class="font-500">Cancel</span>
        </NButton>
        <NButton
          @click="(e) => handleSubmit(e, type)"
          class="!bg-green-500 hover:!text-white"
        >
          <span class="font-500">Save</span>
        </NButton>
      </NFormItem></NForm
    >
  </div>
</template>
