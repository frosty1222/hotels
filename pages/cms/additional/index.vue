<script setup lang="jsx">
import {
  NButton,
  NDataTable,
  NInput,
  NForm,
  NFormItem,
  NGi,
  NGrid,
  useMessage,
} from "naive-ui";

const { restAPI } = useApi();
const message = useMessage();
const router = useRouter();
const userStore = useUserStore();
const config = useRuntimeConfig();

const formRef = ref(null);
const formValue = reactive({
  q: null,
});
const paginationReactive = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  onUpdatePage: (page) => {
    paginationReactive.page = page;
  },
  onUpdatePageSize: (pageSize) => {
    paginationReactive.pageSize = pageSize;
    paginationReactive.page = 1;
  },
  prefix({ startIndex, endIndex, itemCount }) {
    return (
      <div class="font-500">
        {itemCount > 0 ? (
          <span>
            {startIndex + 1} - {endIndex + 1} / {itemCount}
          </span>
        ) : (
          <span>0 - 0 / 0</span>
        )}
      </div>
    );
  },
});

const columns = [
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
    title: "Email",
    align: "center",
    render: (row, index) => <div>{row.email}</div>,
  },
  {
    title: "Message",
    align: "center",
    render: (row, index) => <div>{row.message}</div>,
  },
  {
    title: "Actions",
    align: "center",
    width: 100,
    render: (record) => (
      <div class="flex justify-center gap-2">
        <button
          class="flex items-center text-primary-blue bg-transparent outline-none p-0 !font-500"
          onClick={() => navigateTo(`/cms/additional/add-edit/${record.id}`)}
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
            default: () => "Xác nhận xóa người dùng",
          }}
        </NPopconfirm>
      </div>
    ),
  },
];
let data = [];

const { data: resContact } = await restAPI.cms.getAdditionalContact();
if (resContact.value?.success) {
  data = resContact.value.data || [];
} else message.error(resContact.value?.message || "Lấy dự liệu thất bại!");

const handleSubmit = (e) => {
  e.preventDefault();
};
const handleResetForm = () => {};
const handleOkPopConfirm = async (row) => {
  const { data: resDeleteContact } = await restAPI.cms.deleteContact({
    id: row.id,
  });

  if (resDeleteContact.value?.success) {
    message.success("Xóa thành công");
    handleResetForm();
  } else message.error("Xóa thất bại!");
};

definePageMeta({
  layout: "cms",
});
</script>

<template>
  <div>
    <NForm ref="formRef" :model="formValue">
      <NGrid x-gap="16" item-responsive responsive="screen">
        <NGi span="24 s:8 m:8 xl:6">
          <NFormItem path="q">
            <NInput
              placeholder="Key word..."
              v-model:value="formValue.mobile"
              @keyup.enter="handleSubmit(true)"
            />
          </NFormItem>
        </NGi>
        <NGi
          span="24 s:8 m:16 xl:18"
          class="flex items-center gap-2 justify-end"
        >
          <NButton class="bg-green-600 text-white" @click="handleSubmit">
            Search
          </NButton>
          <NButton
            text-color="black"
            class="bg-gray-300"
            @click="handleResetForm"
          >
            Reset
          </NButton>
        </NGi>
      </NGrid>
    </NForm>

    <div class="mt-6 md:mt-0 mx-auto w-full">
      <NDataTable
        :bordered="true"
        :single-line="false"
        single-column
        :columns="columns"
        :data="data"
        scroll-x="900"
        :pagination="paginationReactive"
      />
    </div>
  </div>
</template>

<style scoped></style>
