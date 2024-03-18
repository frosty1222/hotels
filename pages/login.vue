<script setup>
import { NButton, NForm, NFormItem, NIcon, NInput, useMessage } from "naive-ui";

const { restAPI } = useApi();
const userStore = useUserStore();
const message = useMessage();
const formRef = ref(null);
const formValue = reactive({
  email: "",
  password: "",
});

const rules = {
  email: {
    required: true,
    message: "Trường dữ liệu bắt buộc!",
    trigger: ["input", "blur"],
  },
  password: {
    required: true,
    message: "Trường dữ liệu bắt buộc!",
    trigger: ["input", "blur"],
  },
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const body = {
    email: formValue.email.trim(),
    password: formValue.password.trim(),
  };
  formRef.value.validate(async (errors) => {
    if (!errors) {
      const { data: resLogin, error } = await restAPI.cms.login({
        body,
      });
      if (error.value) return;

      if (resLogin.value.success) {
        const data = resLogin.value.user || {};
        const userInfo = { ...data, accessToken: resLogin.value.token };

        message.success(resLogin?.value.message || "Đăng  nhập thành công");
        useUserLogin(userInfo);
      } else message.error("Đăng nhập thất bại!");
    }
  });
};

definePageMeta({
  layout: false,
});
</script>

<template>
  <div class="h-screen flex items-center justify-center bg-gray-300">
    <div
      class="pt-30 md:pt-50 rounded-xl sm:w-[60%] md:w-[1/2] lg:w-[55%] xl:w-[35%] bg-white"
    >
      <NForm
        ref="formRef"
        :model="formValue"
        :rules="rules"
        @keyup.enter="handleSubmit"
        size="large"
        class="px-4 py-6"
      >
        <NFormItem
          ><h1 class="w-full text-center text-24px xl:text-[28px] font-bold">
            Đăng nhập CMS
          </h1>
        </NFormItem>

        <NFormItem path="email">
          <NInput v-model:value="formValue.email" placeholder="Tên tài khoản">
          </NInput>
        </NFormItem>
        <NFormItem path="password" class="-mt-6">
          <NInput
            v-model:value="formValue.password"
            show-password-on="click"
            type="password"
            placeholder="Mật khẩu"
          >
          </NInput>
        </NFormItem>
        <NFormItem>
          <NButton @click="handleSubmit" class="w-full">
            <span class="font-500">Đăng nhập</span>
          </NButton>
        </NFormItem>
      </NForm>
    </div>
  </div>
</template>
