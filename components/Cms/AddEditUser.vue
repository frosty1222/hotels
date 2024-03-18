<script setup>
import {
  NButton,
  NForm,
  NFormItem,
  NInput,
  NUpload,
  useMessage,
} from "naive-ui";

const { isEdit, editData } = defineProps({
  isEdit: Boolean,
  editData: Object,
});

const { restAPI } = useApi();
const message = useMessage();
const router = useRouter();
const userStore = useUserStore();
const config = useRuntimeConfig();

const formRef = ref(null);
const formValue = reactive({
  id: isEdit ? editData.id : "",
  name: isEdit ? editData.name : "",
  user_type: isEdit ? editData.user_type : "normal",
  user_role: isEdit ? editData.user_role : "user",
  email: isEdit ? editData.email : "",
  phone: isEdit ? editData.phone : "",
  avatar: isEdit ? editData.avatar : "",
  image: "",
  password: "",
});
console.log(formValue);

const selectTypes = [
  {
    label: "Normal",
    value: "normal",
  },
  {
    label: "Partner",
    value: "partner",
  },
];
const selectRoles = [
  {
    label: "User",
    value: "user",
  },
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Poster",
    value: "poster",
  },
  {
    label: "Owner",
    value: "owner",
  },
];

const handleSubmit = async (e) => {
  e.preventDefault();
  if (isEdit) {
    const body = {
      ...formValue,
    };
    const newBody = useObjectToFormData(body);

    const response = await fetch(
      config.public.baseURL + "/api/user/update-user",
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
      message.success("Cập nhật người dùng thành công");
      router.go(-1);
    } else message.error("Cập nhật người dùng thất bại!");
  } else {
    const body = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      user_type: formValue.user_type,
      user_role: formValue.user_role,
    };

    const { data: resUser } = await restAPI.cms.createUser({
      body,
    });

    if (resUser.value?.success) {
      message.success("Thêm mới người dùng thành công");
      router.go(-1);
    } else message.error("Thêm mới người dùng thất bại!");
  }
};
const handleChange = (file) => {
  formValue.image = file.file.file;
};
</script>

<template>
  <div>
    <NForm
      ref="formRef"
      :model="formValue"
      size="large"
      class="mt-6 w-full lg:w-1/2"
      enctype="multipart/form-data"
    >
      <NFormItem path="name" label="Name">
        <NInput v-model:value="formValue.name" />
      </NFormItem>
      <NFormItem path="email" label="Email">
        <NInput v-model:value="formValue.email" />
      </NFormItem>
      <NFormItem v-if="isEdit" path="phone" label="Phone">
        <NInput v-model:value="formValue.phone" />
      </NFormItem>
      <NFormItem path="user_type" label="User type">
        <NSelect v-model:value="formValue.user_type" :options="selectTypes" />
      </NFormItem>
      <NFormItem path="user_role" label="User role">
        <NSelect v-model:value="formValue.user_role" :options="selectRoles" />
      </NFormItem>
      <NFormItem v-if="isEdit" path="avatar" label="Avatar">
        <NUpload
          list-type="image-card"
          :data="formValue.image"
          :on-change="handleChange"
        >
          Click to Upload
        </NUpload>
      </NFormItem>
      <NFormItem v-if="isEdit" path="image" label="Image url">
        <NInput v-model:value="formValue.avatar" />
      </NFormItem>
      <NFormItem path="password" label="Password">
        <NInput
          v-model:value="formValue.password"
          show-password-on="click"
          type="password"
        >
        </NInput>
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

<style scoped></style>
