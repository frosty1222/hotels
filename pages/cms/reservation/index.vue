<script setup lang="jsx">
import { NForm, useMessage } from 'naive-ui';
const { restAPI } = useApi();
const config = useRuntimeConfig();
const userStore = useUserStore();
const userInfo = userStore.userInfo;
const message = useMessage();
const route = useRoute();
const formValue = reactive({
  childType:'car',
  selectedStatus:''
})
const selectStatus = [
  {
    label:"Complete",
    value:"complete"
  },
  {
    label:"Rejected",
    value:"rejected"
  },
  {
    label:"InComplete",
    value:"in-complete"
  },
]
const selectType = [
   {
    label:"Car reservation",
    value:"car"
   },
   {
    label:"Hotel reservation",
    value:"hotel"
   },
   {
    label:"Rental reservation",
    value:"rental"
   },
   {
    label:"Tour reservation",
    value:"tour"
   },
   {
    label:"Activity reservation",
    value:"activity"
   },
   {
    label:"Package reservation",
    value:"package"
   },
]
let showModal = ref(false);
const status = ref('')
const handleOkPopConfirm =async (record)=>{
     let url = restAPI.API_ENDPOINTEXPORT.cms.reservation.updateReservationstatus;
      const body = {
        status:formValue.selectedStatus,
        user_id:userInfo.id,
        type:formValue.childType,
        service_id:record.id
      };
      const response = await fetch(
        config.public.baseURL + url,
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
        loading.value = true
        message.success(data?.message);
        setInterval(() => {
          window.location.reload();
        }, 3000); 
      } else message.error(data?.message);
}
let object = {}
const showModals = (record)=>{
  showModal.value = true;
  object = record;
  console.log(object)
}
const servicceColums = [
 {
    title: "Index",
    width: 60,
    align: "center",
    render: (_, index) => <div>{index + 1}</div>,
  },
  {
    title: "FirstName",
    align: "center",
    render: (row, index) => <div>{row.first_name}</div>,
  },
  {
    title: "LastName",
    align: "center",
    render: (row, index) => <div>{row.last_name}</div>,
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
    title:"Payment method",
    align:"center",
    render:(row,index)=><div>{row.payment_method}</div>
  },
  {
    title:"Payment method",
    align:"center",
    render:(row,index)=><div>{row.zip_code}</div>
  },
  {
    title: "Actions",
    align: "center",
    width: 100,
    render: (record) => (
      <div class="flex justify-center gap-2">
        <button
          class="flex items-center text-primary-blue bg-transparent outline-none p-0 !font-500"
         onClick={()=>showModals(record)}
        >
          detail
        </button>
        {/* <NPopconfirm
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
            default: () => "reject reservation",
          }}
        </NPopconfirm> */}
      </div>
    ),
  },
];
const loading = ref(false);
const dataTable = ref({
  columns:servicceColums,
  data:[],
});
const { data: resCar } = await restAPI.cms.getCarReservation();
if (resCar.value?.success) {
  dataTable.value = {
    columns:servicceColums,
    data: resCar.value?.data || [],
  };
  console.log("resCar",resCar.value?.data)
} else
  message.error(resCar.value?.message || "Lấy dự liệu thất bại!");
watch(
  () => [formValue.childType],
  async ([newType]) => {
    if (newType) {
      loading.value = true;
      switch (newType) {
        case selectType[0].value:{
          const { data: resCar } = await restAPI.cms.getCarReservation();
          if (resCar.value?.success) {
            dataTable.value = {
              columns:servicceColums,
              data: resCar.value?.data || [],
            };
            console.log("resCar",resCar.value?.data)
          } else
            message.error(resCar.value?.message || "Lấy dự liệu thất bại!");
        }
          break;
        case selectType[1].value:{
          const { data: resHotel } = await restAPI.cms.getHotelReservation();
          if (resHotel.value?.success) {
            dataTable.value = {
              columns:servicceColums,
              data: resHotel.value?.data || [],
            };
            console.log("resHotel",resHotel.value?.data)
          } else
            message.error(resHotel.value?.message || "Lấy dự liệu thất bại!");
        }
          break;
          case selectType[2].value:
          const { data: resRental } = await restAPI.cms.getRentalReservation();
          if (resRental.value?.success) {
            dataTable.value = {
              columns:servicceColums,
              data: resRental.value?.data || [],
            };
            console.log("resRental",resRental.value?.data)
          } else
            message.error(resRental.value?.message || "Lấy dự liệu thất bại!");
          break;
          case selectType[3].value:
          const { data: resTour } = await restAPI.cms.getTourReservation();
          if (resTour.value?.success) {
            loading.value = false
            dataTable.value = {
              columns: servicceColums,
              data: resTour.value?.data || [], 
            };
            console.log("resTour",resTour.value?.data )
          } else
            message.error(resTour.value?.message || "Lấy dự liệu thất bại!");
          break;
          case selectType[4].value:
          const { data: resActivity } = await restAPI.cms.getActivityReservation();
          if (resActivity.value?.success) {
            loading.value = false
            dataTable.value = {
              columns: servicceColums,
              data: resActivity.value?.data || [],
            };
            console.log("resActivity",resActivity.value?.data )
          } else
            message.error(resActivity.value?.message || "Lấy dự liệu thất bại!");
          break;
          case selectType[5].value:
          const { data: resPackage } = await restAPI.cms.getPackageReservation();
          if (resPackage.value?.success) {
            loading.value = false
            dataTable.value = {
              columns: servicceColums,
              data: resPackage.value?.data || [],
            };
            console.log("package",resPackage.value?.data )
          } else
            message.error(resPackage.value?.message || "Lấy dự liệu thất bại!");
          break;
        default:
          console.log("incorrect type")
          break;
      }
      loading.value = false; 
    }
  }
);
definePageMeta({
  layout: "cms"
});
</script>

<template>
  <div>
      <NForm>
          <n-modal v-model:show="showModal">
              <n-card
              style="width: 600px"
              title="Show detail"
              :bordered="false"
              size="huge"
              role="dialog"
              aria-modal="true"
              >
                  <ul>
                       <li>First Name:{{ object?.first_name }}</li>
                       <li>Last Name:{{ object?.last_name }}</li>
                       <li>Email:{{ object?.email }}</li>
                       <li>Phone:{{ object?.phone }}</li>
                       <li>Payment Method:{{ object?.payment_method }}</li>
                       <li>Zip Code:{{ object?.zip_code }}</li>
                       <li>Total Price: <b>{{ object?.total_price }}</b></li>
                       <li>
                           Pick Up:
                           <span v-if="formValue.childType === 'car'">{{ object.pick_up }}</span>
                           <span v-if="formValue.childType === 'activity'">{{ object.departure_date }}</span>
                           <span v-if="formValue.childType === 'tour' || formValue.childType === 'package'">{{ object.start_date }}</span>
                           <span v-if="formValue.childType === 'hotel' || formValue.childType === 'rental'">{{ object.check_in }}</span>
                       </li>
                       <li>
                           Drop off:
                           <span v-if="formValue.childType === 'car'">{{ object.drop_off }}</span>
                           <span v-if="formValue.childType === 'activity'">{{ object.start_date }}</span>
                           <span v-if="formValue.childType === 'tour' || formValue.childType === 'package' ">{{ object.end_date }}</span>
                           <span v-if="formValue.childType === 'hotel' || formValue.childType === 'rental'">{{ object.check_out }}</span>
                       </li>
                       <li>Status:<b>{{ object.status }}</b></li>
                       <li v-if="formValue.childType === 'car'">Baby seat:<b>{{ object.baby_seat }}</b></li>
                       <li v-if="formValue.childType === 'car'">Car Name:<b>{{ object.car.name }}</b></li>
                       <li v-if="formValue.childType === 'hotel'">Hotel Name:<b>{{ object.hotel.name }}</b></li>
                       <li v-if="formValue.childType === 'tour' || formValue.childType === 'package'">Tour Name:<b>{{ object.tour.name }}</b></li>
                       <li v-if="formValue.childType === 'rental'">Rental Name:<b>{{ object.rental.name }}</b></li>
                       <li v-if="formValue.childType === 'activity'">Activity Name:<b>{{ object.activity.name }}</b></li>
                  </ul>
                  <NForm ref="formRef" :model="formValue">
                    <NGrid x-gap="16" item-responsive responsive="screen">
                      <NGi span="24 s:8 m:8 xl:6">
                        <NFormItem path="childType"  label="Select Type">
                          <NSelect
                            v-model:value="formValue.selectedStatus"
                            :options="selectStatus"
                          />
                        </NFormItem>
                      </NGi>
                      <NGi
                          span="24 s:8 m:16 xl:18"
                          class="flex items-center gap-2 justify-end"
                        >
                          <NButton
                            class="bg-blue-500 text-white"
                            @click="handleOkPopConfirm(object)"
                          >
                            Update status
                          </NButton>
                        </NGi>
                        </NGrid>
                  </NForm>
              </n-card>
          </n-modal>
      </NForm>
  </div>
<div>
    <NForm ref="formRef" :model="formValue">
      <NGrid x-gap="16" item-responsive responsive="screen">
        <NGi span="24 s:8 m:8 xl:6">
          <NFormItem path="childType"  label="Select Type">
            <NSelect
              v-model:value="formValue.childType"
              :options="selectType"
            />
          </NFormItem>
        </NGi>
        <!-- <NGi span="24 s:8 m:8 xl:6">
          <NFormItem path="serviceId" label="Select rental">
            <NSelect
              v-model:value="formValue.serviceId"
              :options="selectCar"
            />
          </NFormItem>
        </NGi> -->
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
        />
      </div>
</div>

</template>