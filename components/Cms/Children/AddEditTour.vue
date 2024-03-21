<script setup>
import { NButton, NForm, NFormItem, NInput, useMessage } from "naive-ui";
const { restAPI } = useApi();
const router = useRouter();
const route = useRoute();
const message = useMessage();
const userStore = useUserStore();
const config = useRuntimeConfig();

const type = route.query.type || "tour language";
const tourId = route.query.tourId;
let object = route.query.object ? JSON.parse(route.query.object):{}
console.log(object)
const formValue = ref({
  name:"",
  tourId:null,
  id:null,
  status:"",
  icon:"",
  tour_language_category_id:null,
  tour_duration_category_id:null,
  image:""
});
const selectType = [
   {
    label:"Tour language",
    value:"tour language"
   },
   {
    label:"Tour language category",
    value:"tour language category"
   },
   {
    label:"Tour duration",
    value:"tour duration"
   },
   {
    label:"Tour duration category",
    value:"tour duration category"
   },
   {
    label:"Tour facility",
    value:"tour facility"
   },
   {
    label:"Tour bulkdiscount",
    value:"tour bulkdiscount"
   }
]
const TourFacility = ref({
  highlighted: object.highlighted || [{ name: "" }],
  IncludedAndExcluded: [{include:Object.keys(object).length > 0 ? object.IncludedAndExcluded[0]:[]},
  {exclude:Object.keys(object).length > 0 ? object.IncludedAndExcluded[1].exclude:[]}] || [
    { include:[]},
    { exclude:[]}
  ],
  itinerary: object.itinerary || [{ time: "", title: "", description: "" }],
  duration: object.duration || [],
  language: object.language || [],
  passenger: object.passenger || [],
  tourId: object.tourId || null,
  id:object ? object.id:""
});
console.log("TourFacility",TourFacility.value)
const { data: resCateLang } = await restAPI.cms.getTourLanguageCategory();
const selectTourLanguageCategory = resCateLang.value?.data?.map((c) => ({
  label: c.name,
  value: c.id,
}));
const { data: resTourDuration } = await restAPI.cms.getTourDurationCategory();
const selectTourDurationCategory = resTourDuration.value?.data?.map((c) => ({
  label: c.name,
  value: c.id,
}));
const TourBulkDiscount = ref({
   group:"",
   from_adult:"",
   to_adult:"",
   value:"",
   type:"",
   tourId:tourId
})
formValue.value = {
  name:Object.keys(object).length > 0 ? object.name:"",
  tourId:Number(tourId),
  id:Object.keys(object).length > 0 ? object.id:"",
  tour_language_category_id:Object.keys(object).length > 0 ? object.tour_language_category_id:"",
  tour_duration_category_id:Object.keys(object).length > 0 ? object.tour_duration_category_id:"",
}
const handleSubmit = async (e, type) => {
  e?.preventDefault();

  try {
    switch (type) {
      case selectType[0].value:{
          const body = { ...formValue.value };
          const response = await fetch(
            config.public.baseURL + restAPI.API_ENDPOINTEXPORT.cms.children.addLanguageTour,
            {
              method: "POST",
              headers: {
                Authorization: "Bearer " + userStore.userInfo.accessToken,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            }
          );

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();

          if (data?.success) {
            message.success("Thêm mới thành công");
            router.go();
          } else {
            message.error("Thêm mới thất bại!");
          }
      }
        break;
      case selectType[1].value:{
          const body = { ...formValue.value };
          const response = await fetch(
            config.public.baseURL + restAPI.API_ENDPOINTEXPORT.cms.children.addTourCategoryLanguage,
            {
              method: "POST",
              headers: {
                Authorization: "Bearer " + userStore.userInfo.accessToken,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            }
          );

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();

          if (data?.success) {
            message.success("Thêm mới thành công");
            router.go();
          } else {
            message.error("Thêm mới thất bại!");
          }
      }
      break;
      case selectType[2].value:{
          const body = { ...formValue.value };
          const newBody = useObjectToFormData(body);
          const response = await fetch(
            config.public.baseURL + restAPI.API_ENDPOINTEXPORT.cms.children.addTourDuration,
            {
              method: "POST",
              headers: {
                Authorization: "Bearer " + userStore.userInfo.accessToken,
              },
              body: newBody,
            }
          );

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();

          if (data?.success) {
            message.success("Thêm mới thành công");
            router.go();
          } else {
            message.error("Thêm mới thất bại!");
          }
      }
      break;
      case selectType[3].value:{
          const body = { ...formValue.value };
          const response = await fetch(
            config.public.baseURL + restAPI.API_ENDPOINTEXPORT.cms.children.addTourDurationCategory,
            {
              method: "POST",
              headers: {
                Authorization: "Bearer " + userStore.userInfo.accessToken,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            }
          );

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();

          if (data?.success) {
            message.success("Thêm mới thành công");
            router.go();
          } else {
            message.error("Thêm mới thất bại!");
          }
      }
      break;
      case selectType[4].value:{
        const body = { ...TourFacility.value };
          const response = await fetch(
            config.public.baseURL + restAPI.API_ENDPOINTEXPORT.cms.children.addTourFacility,
            {
              method: "POST",
              headers: {
                Authorization: "Bearer " + userStore.userInfo.accessToken,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            }
          );

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();

          if (data?.success) {
            message.success("Thêm mới thành công");
            router.go();
          } else {
            message.error("Thêm mới thất bại!");
          }
      }
        break;
        case selectType[5].value:{
          const body = { ...TourBulkDiscount.value };
          const response = await fetch(
            config.public.baseURL + restAPI.API_ENDPOINTEXPORT.cms.children.addTourBulkDiscount,
            {
              method: "POST",
              headers: {
                Authorization: "Bearer " + userStore.userInfo.accessToken,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            }
          );

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();

          if (data?.success) {
            message.success("Thêm mới thành công");
            router.go();
          } else {
            message.error("Thêm mới thất bại!");
          }
        }
        break;
      default:
        throw new Error('Invalid type');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    message.error('An error occurred. Please try again later.');
  }
};

const handleChange = (file) => {
  console.log(file.fileList[0])
  formValue.value.image = file.fileList[0].file;
};

const onCreate=()=>{
        return {
             name:""
        };
      }
  const onCreateIter=()=>{
    return {
         time:"",
         title:"",
         description:""
    };
  }
  const onCreateINandEx=()=> {
     return {
      name: '',
    }
  }
</script>

<template>
  <div>
    <NForm
      ref="formRef"
      :model="TourFacility"
      size="large"
      class="mt-6 w-full lg:w-1/2"
      v-if="type === selectType[4].value"
    >
    
       <span class="label">Add highlighted</span>
    
      <n-dynamic-input v-model:value="TourFacility.highlighted" :on-create="onCreate">
      <template #create-button-default>
        Add whatever you want
      </template>
      <template #default="{ value }">
        <div style="display: flex; align-items: center; width: 100%">
          <n-input v-model:value="value.name" type="text"  placeholder="Add tour highlighted"/>
        </div>
      </template>
    </n-dynamic-input>
<!-- Add Included -->
<label for="">Add Include</label>
<n-dynamic-input v-model:value="TourFacility.IncludedAndExcluded[0].include" :on-create="onCreateINandEx">
  <template #create-button-default>
    Add whatever you want
  </template>
  <template #default="{ value }">
    <div style="display: flex; align-items: center; width: 100%">
      <div>
        <div >
          <n-input v-model:value="value.name" type="text" placeholder="Add tour include"/>
        </div>
      </div>
    </div>
  </template>
</n-dynamic-input>

<label for="">Add Exclude</label>
<n-dynamic-input v-model:value="TourFacility.IncludedAndExcluded[1].exclude" :on-create="onCreateINandEx">
  <template #create-button-default>
    Add whatever you want
  </template>
  <template #default="{ value }">
    <div style="display: flex; align-items: center; width: 100%">
      <div>
        <div >
          <n-input v-model:value="value.name" type="text" placeholder="Add tour include"/>
        </div>
      </div>
    </div>
  </template>
</n-dynamic-input>
    <span class="label">Add Itinerary</span>
    <!-- <n-dynamic-input
      v-model:value="TourFacility.itinerary"
      :on-create="onCreateIter"
      label="Add tour Itinerary"
    >
      <template #create-button-default>
        Add whatever you want
      </template>
      <template #default="{ value }">
        <div v-for="(item, index) in value" :key="index">
          <div style="display: block; align-items: center; width: 100%">
            <n-input v-model:value="item.time" type="text" placeholder="Time" />
            <n-input v-model:value="item.title" type="text" placeholder="Title" />
            <n-input v-model:value="item.description" type="text" placeholder="Description" />
          </div>
        </div>
      </template>
    </n-dynamic-input> -->
    <n-dynamic-input v-model:value="TourFacility.itinerary" :on-create="onCreateIter">
    <template #create-button-default>
      Add whatever you want
    </template>
    <template #default="{ value }">
      <div style="display: flex; align-items: center; width: 100%">
        <n-input v-model:value="value.time" type="text" />
        <n-input v-model:value="value.title" type="text" />
        <n-input v-model:value="value.description" type="text" />
      </div>
    </template>
  </n-dynamic-input>
    <span class="label">Add Duration</span>
      <n-dynamic-input
      v-model:value="TourFacility.duration"
      placeholder="Please type here"
      :min="1"
      :max="10"
    />
    
    <span class="label">language</span>
    <n-dynamic-input
      v-model:value="TourFacility.language"
      placeholder="Please type here"
      :min="1"
      :max="10"
    />
    
    <span class="label">Allow Age</span>
    <n-dynamic-input
      v-model:value="TourFacility.passenger"
      preset="pair"
      key-placeholder="ex: adult"
      value-placeholder="18+"
    />
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
      </NFormItem>
      </NForm>
  </div>
  <div>
    <NForm
      ref="formRef"
      :model="formValue"
      size="large"
      class="mt-6 w-full lg:w-1/2"
      v-if="type !== selectType[4].value && type !== selectType[5].value"
    >
       <NFormItem v-if="type === selectType[0].value" label="Tour language category">
        <NSelect
          v-model:value="formValue.tour_language_category_id"
          :options="selectTourLanguageCategory"
        />
      </NFormItem>
      <NFormItem v-if="type === selectType[2].value" label="Tour duration category">
        <NSelect
          v-model:value="formValue.tour_duration_category_id"
          :options="selectTourDurationCategory"
        />
      </NFormItem>
      <NFormItem label="Name" v-if="type === selectType[1].value || type === selectType[3].value">
        <NInput v-model:value="formValue.name" />
      </NFormItem>
      <NFormItem label="Image" v-if="type !== selectType[3].value && type !== selectType[1].value && type !== selectType[0].value">
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
      </NFormItem>
      </NForm>
  </div>
  <div>
    <NForm
      ref="formRef"
      :model="TourBulkDiscount"
      size="large"
      class="mt-6 w-full lg:w-1/2"
      v-if="type === selectType[5].value"
    >
      <NFormItem label="Group">
        <NInput v-model:value="TourBulkDiscount.group" />
      </NFormItem>
      <NFormItem label="From Adult">
        <NInput v-model:value="TourBulkDiscount.from_adult" />
      </NFormItem>
      <NFormItem label="To Adult">
        <NInput v-model:value="TourBulkDiscount.to_adult" />
      </NFormItem>
      <NFormItem label="Discount money">
        <NInput v-model:value="TourBulkDiscount.value" />
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
      </NFormItem>
      </NForm>
  </div>
</template>
