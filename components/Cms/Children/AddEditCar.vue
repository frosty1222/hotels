<script setup>
import { NButton, NForm, NFormItem, NInput, useMessage } from "naive-ui";
const { restAPI } = useApi();
const router = useRouter();
const route = useRoute();
const message = useMessage();
const userStore = useUserStore();
const config = useRuntimeConfig();

const type = route.query.type || "rental amenty";
const carId = route.query.carId;
let object = route.query.object ? JSON.parse(route.query.object):{}
const formValue = ref({
  name:"",
  carId:null,
  id:"",
  status:""
});
formValue.value = {
  name:Object.keys(object).length > 0 ? object.name:"",
  carId:Number(carId),
  id:Object.keys(object).length > 0 ? object.id:""
}
const selectType = [
   {
    label:"Car feature",
    value:"car feature"
   },
   {
    label:"Car category",
    value:"car category"
   }
]
const handleSubmit = async (e, type) => {
  e?.preventDefault();

  try {
    let endpoint;

    switch (type) {
      case selectType[0].value:
        endpoint = restAPI.API_ENDPOINTEXPORT.cms.children.addCarFeature;
        break;
      case selectType[1].value:
        endpoint = restAPI.API_ENDPOINTEXPORT.cms.children.addCarCategory;
        break;
      default:
        throw new Error('Invalid type');
    }

    const body = { ...formValue.value };
    const response = await fetch(
      config.public.baseURL + endpoint,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + userStore.userInfo.accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data?.success) {
      message.success("Thêm mới thành công");
      router.go();
    } else {
      message.error("Thêm mới thất bại!");
    }
  } catch (error) {
    console.error('An error occurred:', error);
    message.error('An error occurred. Please try again later.');
  }
};

const handleChange = (file) => {
  console.log(file.fileList[0])
  formValue.value.image = file.fileList[0].file;
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
      <NFormItem label="Name">
        <NInput v-model:value="formValue.name" />
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
