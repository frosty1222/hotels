<script setup>
import { NButton, NForm, NFormItem, NInput, useMessage } from "naive-ui";
const { restAPI } = useApi();
const router = useRouter();
const route = useRoute();
const message = useMessage();
const userStore = useUserStore();
const config = useRuntimeConfig();

const type = route.query.type || "hotel rule";
const hotelId = route.query.hotelId;
console.log("hotelId",hotelId)
let object = route.query.object ? JSON.parse(route.query.object):{}
const isEdit = route.query.isEdit || false;
const { data: resHotelFacility } = await restAPI.cms.getHotelFacility();
const selectHotelFacility = resHotelFacility.value?.data?.map((c) => ({
  label: c.name,
  value: c.id,
}));
const formValue = ref({
  name:"",
  value:"",
  icon:"",
  hotelId:"",
  hotel_facility_category_id:"",
  image:""
});
formValue.value = {
  name:object?.name ? object.name:"",
  value:object.value ? object?.value:"",
  icon:object.icon ? object.icon:"",
  hotelId:hotelId,
  hotel_facility_category_id:object?.hotel_facility_category ? object.hotel_facility_category?.id:"",
  image:"",
  id:object ? object.id:""
}
const handleSubmit = async (e, type) => {
  e?.preventDefault();

  switch (type) {
    case "hotel rule":
      const body = {
        ...formValue.value
      };
      const response = await fetch(
        config.public.baseURL + "/api/hotel/add-hotel-rule",
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
        router.go(-1);
      } else message.error("Thêm mới thất bại!");
      break;
    case "hotel facility":
      {
        const body = {
          ...formValue.value,
        };
        const newBody = useObjectToFormData(body);

        const response = await fetch(
          config.public.baseURL + "/api/hotel/add-hotel-facility",
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
          router.go(-1);
        } else message.error("Thêm mới thất bại!");
      }
      break;
      case "hotel theme":
      {
        const body = {
          ...formValue.value,
        };

        const response = await fetch(
          config.public.baseURL + "/api/category/add-hotel-theme",
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
          router.go(-1);
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
      <NFormItem label="Name"  v-if="type === 'hotel rule' || type === 'hotel theme'">
        <NInput v-model:value="formValue.name" />
      </NFormItem>
      <NFormItem label="Value"  v-if="type === 'hotel rule'">
        <NInput v-model:value="formValue.value" />
      </NFormItem>
      <NFormItem label="Image" v-if="type === 'hotel facility'">
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
      <NFormItem v-if="type == 'hotel facility'" label="Hotel facility category">
        <NSelect
          v-model:value="formValue.hotel_facility_category_id"
          :options="selectHotelFacility"
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
