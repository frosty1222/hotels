<script setup>
import { NButton, NForm, NFormItem, NInput, useMessage } from "naive-ui";

const { isEdit, editData } = defineProps({
  isEdit: Boolean,
  editData: Object,
});

const { restAPI } = useApi();
const userStore = useUserStore();
const message = useMessage();
const router = useRouter();
const config = useRuntimeConfig();

const formRef = ref(null);
const formValue = reactive({
  poster_id: isEdit ? editData.poster_id : "",
  title: isEdit ? editData.title : "",
  top_content: isEdit ? editData.top_content : "",
  bottom_content: isEdit ? editData.bottom_content : "",
  image: isEdit ? "" : {},
  status: "hoat_dong",
});

const handleSubmit = async (e) => {
  e.preventDefault();

  if (isEdit) {
    const body = {
      ...formValue,
      id: editData.id,
      list_image:editData.list_image ? JSON.stringify(editData.list_image):'',
    };
    // return;
    const newBody = useObjectToFormData(body);
    const response = await fetch(
      config.public.baseURL + "/api/story/add-story",
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
      message.success("Cập nhật thành công");
      router.go(-1);
    } else message.error("Cập nhật thất bại!");
  } else {
    const body = {
      ...formValue,
      poster_id: userStore.userInfo.id,
    };
    const newBody = useObjectToFormData(body);

    const response = await fetch(
      config.public.baseURL + "/api/story/add-story",
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
};
const handleChange = (files) => {
  formValue.image = files.fileList;
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
      <NFormItem path="title" label="Title">
        <NInput v-model:value="formValue.title" />
      </NFormItem>
      <NFormItem path="top_content" label="Top content">
        <NInput v-model:value="formValue.top_content" />
      </NFormItem>
      <NFormItem path="bottom_content" label="Bottom content">
        <NInput v-model:value="formValue.bottom_content" />
      </NFormItem>
      <NFormItem path="image" label="Image">
        <NUpload
          accept="image/*"
          list-type="image-card"
          ty
          multiple
          :data="formValue.image"
          :on-change="handleChange"
        >
          Click to Upload
        </NUpload>
      </NFormItem>
      <NFormItem class="mt-10 float-right">
        <NButton @click="router.go(-1)" class="mr-2">
          <span class="font-500">Cancel</span>
        </NButton>
        <NButton @click="handleSubmit" class="!bg-green-500 hover:!text-white">
          <span class="font-500">Save</span>
        </NButton>
      </NFormItem></NForm
    >
  </div>
</template>
