<script setup>
import { NButton, NForm, NFormItem, NInput, useMessage } from "naive-ui";
const { restAPI } = useApi();
const router = useRouter();
const route = useRoute();
const message = useMessage();
const userStore = useUserStore();
const config = useRuntimeConfig();

const type = route.query.type || "activity duration";
const activityId = route.query.activityId;
let object = route.query.object ? JSON.parse(route.query.object):{}
const formValue = ref({
  name:"",
  activityId:null,
  id:"",
  status:""
});
formValue.value = {
  name:Object.keys(object).length > 0 ? object.name:"",
  activityId:Number(activityId),
  id:Object.keys(object).length > 0 ? object.id:""
}
const ActivityFacility = ref({
  highlighted: object.highlighted || [{ name: "" }],
  IncludedAndExcluded: [{include:Object.keys(object).length > 0 ? object.IncludedAndExcluded[0].include:[]},
  {exclude:Object.keys(object).length > 0 ? object.IncludedAndExcluded[1].exclude:[]}] || [
    { include:[]},
    { exclude:[]}
  ],
  itinerary: object.itinerary || [{ time: "", title: "", description: "" }],
  duration: object.duration || [],
  language: object.language || [],
  passenger: object.passenger || [],
  activityId: object.activityId || activityId,
  id:object ? object.id:""
});
const selectType = [
   {
    label:"Activity duration",
    value:"activity duration"
   },
   {
    label:"Activity language",
    value:"activity language"
   },
   {
    label:"Activity category",
    value:"activity category"
   },
   {
    label:"Activity category language",
    value:"activity category language"
   },
   {
    label:"Activity facility",
    value:"activity facility"
   }
]
const handleSubmit = async (e, type) => {
  e?.preventDefault();

  try {
    let endpoint;

    switch (type) {
      case selectType[0].value:
        endpoint = restAPI.API_ENDPOINTEXPORT.cms.children.addActivityDuration;
        break;
      case selectType[1].value:
        endpoint = restAPI.API_ENDPOINTEXPORT.cms.children.addActivityLanguage;
        break;
      case selectType[2].value:
        endpoint = restAPI.API_ENDPOINTEXPORT.cms.children.addActivityCategory;
      break;
      case selectType[3].value:
        endpoint = restAPI.API_ENDPOINTEXPORT.cms.children.addActivityCategoryLanguage;
      break;
      case selectType[4].value:
        endpoint = restAPI.API_ENDPOINTEXPORT.cms.children.addActivityFacility;
      break;
      default:
        throw new Error('Invalid type');
    }

    const body = type !== selectType[4].value ? { ...formValue.value }:{...ActivityFacility.value};
    const response = await fetch(
      config.public.baseURL + endpoint,
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
      :model="ActivityFacility"
      size="large"
      class="mt-6 w-full lg:w-1/2"
      v-if="type === selectType[4].value"
    >
    
       <span class="label">Add highlighted</span>
    
      <n-dynamic-input v-model:value="ActivityFacility.highlighted" :on-create="onCreate">
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
<n-dynamic-input v-model:value="ActivityFacility.IncludedAndExcluded[0].include" :on-create="onCreateINandEx">
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
<n-dynamic-input v-model:value="ActivityFacility.IncludedAndExcluded[1].exclude" :on-create="onCreateINandEx">
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
      v-model:value="ActivityFacility.itinerary"
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
    <n-dynamic-input v-model:value="ActivityFacility.itinerary" :on-create="onCreateIter">
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
      v-model:value="ActivityFacility.duration"
      placeholder="Please type here"
      :min="1"
      :max="10"
    />
    
    <span class="label">language</span>
    <n-dynamic-input
      v-model:value="ActivityFacility.language"
      placeholder="Please type here"
      :min="1"
      :max="10"
    />
    
    <span class="label">Allow Age</span>
    <n-dynamic-input
      v-model:value="ActivityFacility.passenger"
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
      v-if="type !== selectType[4].value"
    >
      <NFormItem label="Name">
        <NInput v-model:value="formValue.name" />
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
      </NFormItem></NForm
    >
  </div>
</template>
