<script setup>
import { NButton, NForm, NFormItem, NInput, useMessage } from "naive-ui";

const { isEdit, editData } = defineProps({
  isEdit: Boolean,
  editData: Object,
});

console.log(editData);

const { restAPI } = useApi();
const message = useMessage();
const router = useRouter();
const userStore = useUserStore();

const formRef = ref(null);
const formValue = reactive({
  user_id: isEdit ? editData.id : userStore.userInfo.id,
  serviceType: isEdit ? editData.serviceType : "",
  service_id: isEdit ? editData.service_id : "",
  message: isEdit ? editData.message : "",
});

const selectType = [
  {
    label: "Hotel",
    value: "hotel",
  },
  {
    label: "Car",
    value: "car",
  },
  {
    label: "Tour",
    value: "tour",
  },
  {
    label: "Activity",
    value: "activity",
  },
  {
    label: "Rental",
    value: "rental",
  },
];
const resData = ref({});
const selectHotel = computed(() => {
  console.log(resData.value?.data);
  const result = resData.value?.data?.map((s) => ({
    label: s.name,
    value: s.id,
  }));

  return result || [];
});

const handleSubmit = async (e) => {
  e.preventDefault();

  const body = {
    ...formValue,
  };

  const { data: resData } = await restAPI.cms.createAskQuestion({
    body,
  });

  if (resData.value?.success) {
    message.success("Thêm mới thành công");
    router.go(-1);
  } else message.error(resData.value?.message || "Thêm mới thất bại!");
};

watch(
  () => formValue.serviceType,
  async (newValue) => {
    switch (newValue) {
      case "hotel":
        const { data } = await restAPI.cms.getSVHotel();
        if (data.value?.success) resData.value = data.value;
        else message.error(data.value?.message || "Lấy dự liệu thất bại!");
        break;
    }
  }
);

definePageMeta({
  layout: "cms",
});
</script>

<template>
  <div>
    <NForm
      ref="formRef"
      :model="formValue"
      size="large"
      class="mt-6 w-full lg:w-1/2"
    >
      <NFormItem path="serviceType" label="Service type">
        <NSelect v-model:value="formValue.serviceType" :options="selectType" />
      </NFormItem>
      <NFormItem path="hotel" label="Select service">
        <NSelect v-model:value="formValue.service_id" :options="selectHotel" />
      </NFormItem>
      <NFormItem path="message" label="Message">
        <NInput v-model:value="formValue.message" />
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
