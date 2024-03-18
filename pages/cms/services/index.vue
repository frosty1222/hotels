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

const isReload = ref(false);
const formRef = ref(null);
const formValue = reactive({
  serviceType: "hotel",
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
const columnsHotel = [
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
    title: "Location",
    align: "center",
    render: (row, index) => <div>{row.location_name}</div>,
  },
  {
    title: "From price",
    align: "center",
    render: (row, index) => <div>{row.from_price}</div>,
  },
  {
    title: "Image",
    align: "center",
    render: (row, index) => (
      <div class="flex justify-center">
        <img
          src={`${config.public.baseURL}/photo/${row.imageLink?.[0]?.fileName}`}
          class="w-10 h-8 rounded-[10px]"
        />
      </div>
    ),
  },
  {
    title: "Actions",
    align: "center",
    width: 100,
    render: (record) => (
      <div class="flex justify-center gap-2">
        <button
          class="flex items-center text-primary-blue bg-transparent outline-none p-0 !font-500"
          onClick={() => navigateTo(`/cms/services/add-edit?id=${record.id}&&type=${formValue.serviceType}&&object=${JSON.stringify(record)}&&isEdit=yes`)}
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
const columnsCar = [
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
    title: "Location",
    align: "center",
    render: (row, index) => <div>{row.location_name}</div>,
  },
  {
    title: "From price",
    align: "center",
    render: (row, index) => <div>{row.from_price}</div>,
  },
  {
    title: "Image",
    align: "center",
    render: (row, index) => (
      <div class="flex justify-center">
        <img
          src={`${config.public.baseURL}/photo/${row.imageLink?.[0]?.fileName}`}
          class="w-10 h-8 rounded-[10px]"
        />
      </div>
    ),
  },
  {
    title: "Actions",
    align: "center",
    width: 100,
    render: (record) => (
      <div class="flex justify-center gap-2">
        <button
          class="flex items-center text-primary-blue bg-transparent outline-none p-0 !font-500"
          onClick={() => navigateTo(`/cms/services/add-edit?id=${record.id}&&type=${formValue.serviceType}&&object=${JSON.stringify(record)}&&isEdit=yes`)}
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
const columnsTour = [
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
    title: "Location",
    align: "center",
    render: (row, index) => <div>{row.location_name}</div>,
  },
  {
    title: "From price",
    align: "center",
    render: (row, index) => <div>{row.from_price}</div>,
  },
  {
    title: "Image",
    align: "center",
    render: (row, index) => (
      <div class="flex justify-center">
        <img
          src={`${config.public.baseURL}/photo/${row.imageLink?.[0]?.fileName}`}
          class="w-10 h-8 rounded-[10px]"
        />
      </div>
    ),
  },
  {
    title: "Actions",
    align: "center",
    width: 100,
    render: (record) => (
      <div class="flex justify-center gap-2">
        <button
          class="flex items-center text-primary-blue bg-transparent outline-none p-0 !font-500"
          onClick={() => navigateTo(`/cms/services/add-edit?id=${record.id}&&type=${formValue.serviceType}&&object=${JSON.stringify(record)}&&isEdit=yes`)}
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
const columnsRental = [
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
    title: "Location",
    align: "center",
    render: (row, index) => <div>{row.location_name}</div>,
  },
  {
    title: "From price",
    align: "center",
    render: (row, index) => <div>{row.from_price}</div>,
  },
  {
    title: "Image",
    align: "center",
    render: (row, index) => (
      <div class="flex justify-center">
        <img
          src={`${config.public.baseURL}/photo/${row.imageLink?.[0]?.fileName}`}
          class="w-10 h-8 rounded-[10px]"
        />
      </div>
    ),
  },
  {
    title: "Actions",
    align: "center",
    width: 100,
    render: (record) => (
      <div class="flex justify-center gap-2">
        <button
          class="flex items-center text-primary-blue bg-transparent outline-none p-0 !font-500"
          onClick={() => navigateTo(`/cms/services/add-edit?id=${record.id}${record.id}&&type=${formValue.serviceType}&&object=${JSON.stringify(record)}&&isEdit=yes`)}
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
const columnsActivity = [
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
    title: "Location",
    align: "center",
    render: (row, index) => <div>{row.location_name}</div>,
  },
  {
    title: "From price",
    align: "center",
    render: (row, index) => <div>{row.from_price}</div>,
  },
  {
    title: "Image",
    align: "center",
    render: (row, index) => (
      <div class="flex justify-center">
        <img
          src={`${config.public.baseURL}/photo/${row.imageLink?.[0]?.fileName}`}
          class="w-10 h-8 rounded-[10px]"
        />
      </div>
    ),
  },
  {
    title: "Actions",
    align: "center",
    width: 100,
    render: (record) => (
      <div class="flex justify-center gap-2">
        <button
          class="flex items-center text-primary-blue bg-transparent outline-none p-0 !font-500"
          onClick={() => navigateTo(`/cms/services/add-edit?id=${record.id}&&type=${formValue.serviceType}&&object=${JSON.stringify(record)}&&isEdit=yes`)}
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

const loading = ref(false);
const dataTable = ref({
  columns: columnsHotel,
  data: [],
});

const { data: resHotel } = await restAPI.cms.getSVHotel();
if (resHotel.value?.success) {
  dataTable.value = {
    columns: columnsHotel,
    data: resHotel.value?.data || [],
  };
} else message.error(resHotel.value?.message || "Lấy dự liệu thất bại!");

const handleOkPopConfirm = async (row) => {
  const { data: resDelete } = await restAPI.cms.deleteServices({
    body: {
      service_type: formValue.serviceType,
      id: row.id,
    },
  });

  if (resDelete.value?.success) {
    message.success("Xoá thành công");
    isReload.value = true;
  } else message.error(resDelete.value?.message || "Xóa thất bại!");
};

watch(
  () => [formValue.serviceType, isReload.value],
  async ([newType, newReload]) => {
    if (newType || newReload) {
      loading.value = true;
      switch (newType) {
        case "hotel":
          const { data: resHotel } = await restAPI.cms.getSVHotel({
            params: {
              page: paginationReactive.page,
              limit: paginationReactive.pageSize,
            },
          });
          if (resHotel.value?.success) {
            dataTable.value = {
              columns: columnsHotel,
              data: resHotel.value?.data || [],
            };
          } else
            message.error(resHotel.value?.message || "Lấy dự liệu thất bại!");
          break;
        case "car":
          const { data: resCar } = await restAPI.cms.getSVCar({
            params: {
              page: paginationReactive.page,
              limit: paginationReactive.pageSize,
            },
          });
          if (resCar.value?.success) {
            dataTable.value = {
              columns: columnsCar,
              data: resCar.value?.data || [],
            };
          } else
            message.error(resCar.value?.message || "Lấy dự liệu thất bại!");
          break;
        case "rental":
          const { data: resRental } = await restAPI.cms.getSVRental({
            params: {
              page: paginationReactive.page,
              limit: paginationReactive.pageSize,
            },
          });
          if (resRental.value?.success) {
            dataTable.value = {
              columns: columnsRental,
              data: resRental.value?.data || [],
            };
          } else
            message.error(resRental.value?.message || "Lấy dự liệu thất bại!");
          break;
        case "tour":
          const { data: resTour } = await restAPI.cms.getSVTour({
            params: {
              page: paginationReactive.page,
              limit: paginationReactive.pageSize,
            },
          });
          if (resTour.value?.success) {
            dataTable.value = {
              columns: columnsTour,
              data: resTour.value?.data || [],
            };
          } else
            message.error(resTour.value?.message || "Lấy dự liệu thất bại!");
          break;
        case "activity":
          const { data: resActivity } = await restAPI.cms.getSVActivity({
            params: {
              page: paginationReactive.page,
              limit: paginationReactive.pageSize,
            },
          });
          if (resActivity.value?.success) {
            dataTable.value = {
              columns: columnsActivity,
              data: resActivity.value?.data || [],
            };
          } else
            message.error(
              resActivity.value?.message || "Lấy dự liệu thất bại!"
            );
          break;
      }
    }
  }
);

definePageMeta({
  layout: "cms",
});
</script>

<template>
  <div>
    <NForm ref="formRef" :model="formValue">
      <NGrid x-gap="16" item-responsive responsive="screen">
        <NGi span="24 s:8 m:8 xl:6">
          <NFormItem path="serviceType">
            <NSelect
              v-model:value="formValue.serviceType"
              :options="selectType"
            />
          </NFormItem>
        </NGi>
        <NGi
          span="24 s:8 m:16 xl:18"
          class="flex items-center gap-2 justify-end"
        >
          <NButton
            class="bg-blue-500 text-white"
            @click="
              navigateTo('/cms/services/add-edit?type=' + formValue.serviceType)
            "
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
        :columns="dataTable.columns"
        :data="dataTable.data"
        scroll-x="900"
        :pagination="paginationReactive"
      />
    </div>
  </div>
</template>

<style scoped></style>
