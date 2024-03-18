<script setup>
import { NButton, NForm, NFormItem, NInput, useMessage } from "naive-ui";
const { restAPI } = useApi();
const router = useRouter();
const route = useRoute();
const message = useMessage();
const userStore = useUserStore();
const config = useRuntimeConfig();

const type = route.query.type || "hotel";
let object = {}
const isEdit = route.query.isEdit || 'no';
if(isEdit === 'yes'){
  object = JSON.parse(route.query.object);
}
const { data: resOwner } = await restAPI.cms.getUserAll({
  params: {
    page: 1,
    limit: 999999,
    role: "owner",
  },
});
const { data: resStar } = await restAPI.cms.getCategoryStar();
const { data: resHotelTheme } = await restAPI.cms.getHotelTheme();
const { data: resHotelFacility } = await restAPI.cms.getHotelFacility();

const { data: resCar } = await restAPI.cms.getCategoryCar();
const { data: resTour } = await restAPI.cms.getCategoryTour();
const { data: resActivityCategory } = await restAPI.cms.getCategoryActivity();
const { data: resActivityCategoryDuration } =
  await restAPI.cms.getCategoryActivityDuration();
const { data: resActivityCategoryLanguage } =
  await restAPI.cms.getCategoryActivityLanguage();

const selectOwner = resOwner.value?.data?.map((c) => ({
  label: c.name,
  value: c.id,
}));
const selectCategory = resStar.value?.data?.map((c) => ({
  label: c.name,
  value: c.id,
}));
const selectHotelTheme = resHotelTheme.value?.data?.map((c) => ({
  label: c.name,
  value: c.id,
}));
const selectHotelFacility = resHotelFacility.value?.data?.map((c) => ({
  label: c.name,
  value: c.id,
}));

const selectCar = resCar.value?.data?.map((c) => ({
  label: c.name,
  value: c.id,
}));
const selectTour = resTour.value?.data?.map((c) => ({
  label: c.name,
  value: c.id,
}));
const selectActivity = resActivityCategory.value?.data?.map((c) => ({
  label: c.name,
  value: c.id,
}));
const selectActivityDuration = resActivityCategoryDuration.value?.data?.map(
  (c) => ({
    label: c.name,
    value: c.id,
  })
);
const selectActivityLanguage = resActivityCategoryLanguage.value?.data?.map(
  (c) => ({
    label: c.name,
    value: c.id,
  })
);

const formValue = ref({
  owner_id: "",
  name: "",
  location_name: "",
  latitude: "",
  longitude: "",
  star_category_id: "",
  from_price: "",
  description: "",
  image: "",
  id:"",
  isEdit:"",
  imageLink:""
});

if(isEdit === 'no'){
  formValue.value = {
    isEdit:isEdit
  }
  switch (type) {
  case "hotel":
    formValue.value = {
      ...formValue.value,
      hotel_theme_id: "",
      hotel_facility_id: "",
    };
    break;
  case "tour":
    formValue.value = {
      ...formValue.value,
      tour_category_id: "",
    };
    break;
  case "car":
    formValue.value = {
      ...formValue.value,
      car_category_id: "",
    };
    break;
  case "activity":
    formValue.value = {
      ...formValue.value,
      activity_category_id: "",
      activity_duration_category_id: "",
      activity_language_category_id: "",
    };
    break;
  }
}
if(isEdit === 'yes'){
  formValue.value = {
    owner_id: object.owner_id,
    name: object.name,
    location_name:object.location_name,
    latitude: object.latitude,
    longitude: object.longitude,
    star_category_id: object.star_category_id,
    from_price: object.from_price,
    description: object.description,
    image: "",
    id:object.id,
    imageLink:object.imageLink ? JSON.stringify(object.imageLink):'',
  }
 switch (type) {
  case "hotel":
    formValue.value = {
      ...formValue.value,
      hotel_theme_id:object.hotel_theme_id,
      hotel_facility_id:object.hotel_facility_id,
    };
    break;
  case "tour":
    formValue.value = {
      ...formValue.value,
      tour_category_id: object.tour_category_id,
    };
    break;
  case "car":
    formValue.value = {
      ...formValue.value,
      car_category_id:object.car_category_id,
    };
    break;
  case "activity":
    formValue.value = {
      ...formValue.value,
      activity_category_id:object.activity_category_id,
      activity_duration_category_id:object.activity_duration_category_id,
      activity_language_category_id:object.activity_language_category_id,
    };
    break;
  }
}
const handleSubmit = async (e, type) => {
  e?.preventDefault();

  switch (type) {
    case "hotel":
      const body = {
        ...formValue.value
      };
      const newBody = useObjectToFormData(body);
      const response = await fetch(
        config.public.baseURL + "/api/service/add-hotel",
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
        message.success("Thêm mới thành công");
        router.go(-1);
      } else message.error("Thêm mới thất bại!");
      break;
    case "tour":
      {
        const body = {
          ...formValue.value,
        };
        const newBody = useObjectToFormData(body);

        const response = await fetch(
          config.public.baseURL + "/api/service/add-tour",
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
          message.success("Thêm mới thành công");
          router.go(-1);
        } else message.error("Thêm mới thất bại!");
      }
      break;
    case "car":
      {
        const body = {
          ...formValue.value,
        };
        const newBody = useObjectToFormData(body);

        const response = await fetch(
          config.public.baseURL + "/api/service/add-car",
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
          message.success("Thêm mới thành công");
          router.go(-1);
        } else message.error("Thêm mới thất bại!");
      }
      break;
    case "activity":
      {
        const body = {
          ...formValue.value,
        };
        const newBody = useObjectToFormData(body);

        const response = await fetch(
          config.public.baseURL + "/api/service/add-activity",
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
          message.success("Thêm mới thành công");
          router.go(-1);
        } else message.error("Thêm mới thất bại!");
      }
      break;
    case "rental":
      {
        const body = {
          ...formValue.value,
        };
        const newBody = useObjectToFormData(body);

        const response = await fetch(
          config.public.baseURL + "/api/service/add-rental",
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
          message.success("Thêm mới thành công");
          router.go(-1);
        } else message.error("Thêm mới thất bại!");
      }
      break;
  }
};
const handleChange = (files) => {
  formValue.value.image = files.fileList;
};
</script>

<template>
  <div>
    <NForm
      ref="formRef"
      :model="formValue"
      size="large"
      class="mt-6 w-full lg:w-1/2"
    >
      <NFormItem label="Select owner">
        <NSelect v-model:value="formValue.owner_id" :options="selectOwner" />
      </NFormItem>
      <NFormItem label="Name">
        <NInput v-model:value="formValue.name" />
      </NFormItem>
      <NFormItem label="Location name">
        <NInput v-model:value="formValue.location_name" />
      </NFormItem>
      <NFormItem label="Latitude">
        <NInput v-model:value="formValue.latitude" />
      </NFormItem>
      <NFormItem label="Longitude">
        <NInput v-model:value="formValue.longitude" />
      </NFormItem>
      <NFormItem label="From price">
        <NInput v-model:value="formValue.from_price" />
      </NFormItem>
      <NFormItem label="Description">
        <NInput v-model:value="formValue.description" />
      </NFormItem>
      <NFormItem label="CategoryStar">
        <NSelect
          v-model:value="formValue.star_category_id"
          :options="selectCategory"
        />
      </NFormItem>
      <!-- Hotel -->
      <NFormItem v-if="type == 'hotel'" label="Hotel theme">
        <NSelect
          v-model:value="formValue.hotel_theme_id"
          :options="selectHotelTheme"
        />
      </NFormItem>
      <NFormItem v-if="type == 'hotel'" label="Hotel facility">
        <NSelect
          v-model:value="formValue.hotel_facility_id"
          :options="selectHotelFacility"
        />
      </NFormItem>

      <!-- Car -->
      <NFormItem v-if="type == 'car'" label="Car category">
        <NSelect
          v-model:value="formValue.car_category_id"
          :options="selectCar"
        />
      </NFormItem>
      <!-- Tour -->
      <NFormItem v-if="type == 'tour'" label="Tour category">
        <NSelect
          v-model:value="formValue.tour_category_id"
          :options="selectTour"
        />
      </NFormItem>
      <!-- Activity -->
      <NFormItem v-if="type == 'activity'" label="Activity category">
        <NSelect
          v-model:value="formValue.activity_category_id"
          :options="selectActivity"
        />
      </NFormItem>
      <NFormItem v-if="type == 'activity'" label="Activity duration">
        <NSelect
          v-model:value="formValue.activity_duration_category_id"
          :options="selectActivityDuration"
        />
      </NFormItem>
      <NFormItem v-if="type == 'activity'" label="Activity language">
        <NSelect
          v-model:value="formValue.activity_language_category_id"
          :options="selectActivityLanguage"
        />
      </NFormItem>

      <NFormItem label="Image">
        <NUpload
          accept="image/*"
          list-type="image-card"
          multiple
          :data="formValue.image"
          :on-change="handleChange"
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
      </NFormItem></NForm
    >
  </div>
</template>
