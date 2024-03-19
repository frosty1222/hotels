<script setup>
import { NButton, NForm, NFormItem, NInput, useMessage } from "naive-ui";
const { restAPI } = useApi();
const router = useRouter();
const route = useRoute();
const message = useMessage();
const userStore = useUserStore();
const config = useRuntimeConfig();

const type = route.query.type || "rental amenty";
const rentalId = route.query.rentalId;
console.log("rentalId",rentalId)
let object = route.query.object ? JSON.parse(route.query.object):{}
const isEdit = route.query.isEdit || false;
const { data: resselectAmentyCategory } = await restAPI.cms.getRentalAmentyCategory();
const selectAmentyCategory = resselectAmentyCategory.value?.data?.map((c) => ({
  label: c.name,
  value: c.id,
}));
const formValue = ref({
  name:"",
  icon:"",
  rentalId:"",
  rental_amenty_category_id:"",
  image:"",
  id:"",
  status:""
});
formValue.value = {
  name:Object.keys(object).length > 0 ? object.name:"",
  icon:Object.keys(object).length > 0 ? object.icon:"",
  rentalId:rentalId,
  rental_amenty_category_id:Object.keys(object).length > 0 ? object.rental_amenty_category?.id:"",
  image:"",
  id:Object.keys(object).length > 0 ? object.id:""
}
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
const handleSubmit = async (e, type) => {
  e?.preventDefault();

  switch (type) {
    case selectType[3].value:
      const body = {
        ...formValue.value
      };
      const response = await fetch(
        config.public.baseURL + restAPI.API_ENDPOINTEXPORT.cms.children.addRentalAmentyCategory,
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
        message.success("Thêm mới thành công");
        router.go();
      } else message.error("Thêm mới thất bại!");
      break;
    case selectType[0].value:
      {
        const body = {
          ...formValue.value,
        };
        const newBody = useObjectToFormData(body);

        const response = await fetch(
          config.public.baseURL + restAPI.API_ENDPOINTEXPORT.cms.children.addRentalAmenty,
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + userStore.userInfo.accessToken,
            },
            body: newBody,
          }
        );
        const data = await response.json();

        if (data?.success) {
          message.success("Thêm mới thành công");
          router.go();
        } else message.error("Thêm mới thất bại!");
      }
      break;
      case selectType[1].value:
      {
        const body = {
          ...formValue.value,
        }

        const newBody = useObjectToFormData(body);

        const response = await fetch(
          config.public.baseURL + restAPI.API_ENDPOINTEXPORT.cms.children.addRentalType,
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + userStore.userInfo.accessToken,
            },
            body: newBody,
          }
        );
        const data = await response.json();

        if (data?.success) {
          message.success("Thêm mới thành công");
          router.go();
        } else message.error("Thêm mới thất bại!");
      }
      break;
    case  selectType[2].value:
    {
        const body = {
          ...formValue.value,
        };

        const newBody = useObjectToFormData(body);

        const response = await fetch(
          config.public.baseURL + restAPI.API_ENDPOINTEXPORT.cms.children.addRentalSuitalibity,
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + userStore.userInfo.accessToken,
            },
            body: newBody,
          }
        );
        const data = await response.json();

        if (data?.success) {
          message.success("Thêm mới thành công");
          router.go();
        } else message.error("Thêm mới thất bại!");
      }
      break;
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
      <NFormItem label="Name" v-if="type !== selectType[0].value">
        <NInput v-model:value="formValue.name" />
      </NFormItem>
      <NFormItem label="Image" v-if="type !== selectType[3].value">
        <NUpload
          accept="image/*"
          list-type="image-card"
          :data="formValue.image"
          :on-change="handleChange"
          :multiple="false"
        >
          Click to Upload
        </NUpload>
      </NFormItem>
      <NFormItem v-if="type ==selectType[0].value">
        <NSelect
          v-model:value="formValue.rental_amenty_category_id"
          :options="selectAmentyCategory"
        />
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
