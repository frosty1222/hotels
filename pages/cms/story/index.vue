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
const userStore = useUserStore();
const config = useRuntimeConfig();

const formRef = ref(null);
const formValue = reactive({
  q: null,
  title:""
});
const resData = ref({});
const paginationReactive = reactive({
  page: 1,
  pageSize: 10,
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

const columns = [
  {
    title: "Index",
    width: 60,
    align: "center",
    render: (_, index) => <div>{index + 1}</div>,
  },
  {
    title: "Title",
    align: "center",
    render: (row, index) => <div>{row.title}</div>,
  },
  {
    title: "Top contnet",
    align: "center",
    render: (row, index) => <div>{row.top_content}</div>,
  },
  {
    title: "Bottom content",
    align: "center",
    render: (row, index) => <div>{row.top_content}</div>,
  },
  {
    title: "Type",
    align: "center",
    render: (row, index) => <div>{row.type}</div>,
  },
  {
    title: "Image",
    align: "center",
    render: (row, index) => (
      <div class="flex justify-center">
        <img
          src={`${config.public.baseURL}/photo/${row.list_image?.[0]?.fileName}`}
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
          onClick={() =>
            navigateTo(
              `/cms/story/add-edit/${row.id}?data=${JSON.stringify(row)}`
            )
          }
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
const loading = ref(false);
const data = computed(() => {
  const result = resData.value.data || [];
  return result;
});

const getData = (params) => {
  loading.value = true;
  restAPI.cms
    .getStory({
      params,
    })
    .then((res) => {
      const data = res.data.value;
      if (data?.success) resData.value = data;
      else message.error(data?.message);
    })
    .catch((err) => console.error(err.message))
    .finally(() => (loading.value = false));
};
getData({
  page: paginationReactive.page,
  limit: paginationReactive.pageSize,
});

const handleSubmit = (e) => {
  e?.preventDefault();

  getData({
    poster_id: formValue.q,
    page: paginationReactive.page,
    limit: paginationReactive.pageSize,
    title:formValue.title
  });
};
const handleResetForm = () => {
  formValue.q = "";
  paginationReactive.page = 1;
  paginationReactive.pageSize = 10;

  getData({
    page: paginationReactive.page,
    limit: paginationReactive.pageSize,
  });
};
const handleOkPopConfirm = async (row) => {
  const body = {
    ...row,
    poster_id: userStore.userInfo.id,
    image: "",
    status: "Xoa",
  };
  const newBody = useObjectToFormData(body);

  const response = await fetch(config.public.baseURL + "/api/story/add-story", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + userStore.userInfo.accessToken,
    },
    body: newBody,
  });
  const data = await response.json();

  if (data?.success) {
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
    <label for="">Search by poster Id Or Title</label>
    <NForm ref="formRef" :model="formValue">
      <NGrid x-gap="16" item-responsive responsive="screen">
        <NGi span="24 s:8 xl:6">
          <NFormItem path="q">
            <NInput
              placeholder="Porter id..."
              v-model:value="formValue.q"
              @keyup.enter="handleSubmit(true)"
            />
          </NFormItem>
        </NGi>
        <NGi span="24 s:8 xl:6">
          <NFormItem path="title">
            <NInput
              placeholder="Title..."
              v-model:value="formValue.title"
              @keyup.enter="handleSubmit(true)"
            />
          </NFormItem>
        </NGi>
        <NGi span="24 s:16 xl:18" class="flex items-center gap-2 justify-end">
          <NButton class="bg-green-600 text-white" @click="handleSubmit">
            Search
          </NButton>
          <NButton
            text-color="black"
            class="bg-gray-300"
            @click="handleResetForm"
          >
            Reset </NButton
          ><NButton
            class="bg-blue-500 text-white"
            @click="navigateTo('/cms/story/add-edit')"
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
        :pagination="paginationReactive"
      />
    </div>
  </div>
</template>

<style scoped></style>
