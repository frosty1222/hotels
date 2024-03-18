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
const config = useRuntimeConfig();

const formRef = ref(null);
const formValue = reactive({
  user_type: "",
  user_role: "",
});
const loading = ref(false);
const resData = ref({});
const paginationReactive = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  onUpdatePage: (page) => {
    paginationReactive.page = page;
    handleSubmit();
  },
  onUpdatePageSize: (pageSize) => {
    paginationReactive.pageSize = pageSize;
    paginationReactive.page = 1;
    handleSubmit();
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
    title: "Phone",
    align: "center",
    render: (row, index) => <div>{row.phone}</div>,
  },
  {
    title: "User type",
    align: "center",
    render: (row, index) => <div>{row.user_type}</div>,
  },
  {
    title: "User role",
    align: "center",
    render: (row, index) => <div>{row.user_role}</div>,
  },
  {
    title: "Avatar",
    align: "center",
    render: (row, index) => (
      <div class="flex justify-center">
        <img
          src={`${config.public.baseURL}/photo/${row.avatar}`}
          class="w-10 h-8 rounded-[10px]"
        />
      </div>
    ),
  },
  {
    title: "Actions",
    align: "center",
    width: 100,
    render: (row) => (
      <div class="flex justify-center gap-2">
        <button
          class="flex items-center text-primary-blue bg-transparent outline-none p-0 !font-500"
          onClick={() => navigateTo(`/cms/user/add-edit/${row.id}`)}
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
          onPositiveClick={() => handleOkPopConfirm(row)}
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
const data = computed(() => {
  const result = resData.value.data || [];
  paginationReactive.itemCount = resData.value.totalRecords || 0;

  return result;
});
getData({
  page: paginationReactive.page,
  limit: paginationReactive.pageSize,
});

function getData(params) {
  loading.value = true;
  restAPI.cms
    .getUserAll({
      params,
    })
    .then((res) => {
      const data = res.data.value;
      if (data?.success) {
        resData.value = data || {};
      } else message.error(data?.message || "Lấy dữ liệu thất bại!");
    })
    .catch((err) => console.error(err.message))
    .finally(() => (loading.value = false));
}
function handleSubmit(e) {
  e?.preventDefault();

  getData({
    user_type: formValue.user_type,
    role: formValue.user_role,
    page: paginationReactive.page,
    limit: paginationReactive.pageSize,
  });
}
function handleResetForm() {
  formValue.user_type = "";
  formValue.user_role = "";
  paginationReactive.page = 1;
  paginationReactive.pageSize = 10;
  getData({
    page: paginationReactive.page,
    limit: paginationReactive.pageSize,
  });
}
async function handleOkPopConfirm(row) {
  const { data: resDelete } = await restAPI.cms.deleteUser({
    params: {
      id: row.id,
    },
  });

  if (resDelete.value?.success) {
    message.success("Xoá thành công");
    handleResetForm();
  } else message.error(resDelete.value?.message || "Xóa thất bại!");
}

definePageMeta({
  layout: "cms",
});
</script>

<template>
  <div class="pt-6">
    <NForm ref="formRef" :model="formValue">
      <NGrid x-gap="16" item-responsive responsive="screen">
        <NGi span="24 s:8  xl:6">
          <NFormItem path="user_type" label="User type">
            <NSelect
              v-model:value="formValue.user_type"
              :options="selectTypes"
            />
          </NFormItem>
        </NGi>
        <NGi span="24 s:8  xl:6">
          <NFormItem path="user_role" label="User role">
            <NSelect
              v-model:value="formValue.user_role"
              :options="selectRoles"
            />
          </NFormItem>
        </NGi>
        <NGi span="24 s:8 xl:12" class="flex items-center gap-2 justify-end">
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
          <NButton
            class="bg-blue-500 text-white"
            @click="navigateTo('/cms/user/add-edit')"
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
        :columns="columns"
        :data="data"
        scroll-x="900"
      />
      <div class="mt-3 overflow-x-auto w-full md:w-fit float-right">
        <CmsPagination :options="paginationReactive" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
