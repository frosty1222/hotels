<script lang="ts" setup>
/* eslint-disable no-undef */
// import {onMounted, ref} from 'vue'
import {Loader} from '@googlemaps/js-api-loader'

const config = useRuntimeConfig();
const loader = new Loader({apiKey: config.public.apiKeyGoogleMap})

const mapDiv = ref(null)

const streetViewOptions = {
  position: {lat: 43.0258778, lng: -87.8989059},
  pov: {heading: 270, pitch: 0},
  zoom: 1
};

onMounted(async () => {
  await loader.load()

  const streetViewPanorama = new google.maps.StreetViewPanorama(
      mapDiv.value,
      streetViewOptions
  );

  var streetViewService = new google.maps.StreetViewService();

  // Thiết lập vị trí bạn muốn tìm kiếm ảnh Street View Panorama
  var location = streetViewOptions.position // Ví dụ: New York

// Thiết lập bán kính tìm kiếm (tùy chọn)
  var radius = 50; // Đơn vị là mét

  streetViewService.getPanoramaByLocation(location, radius, function (data, status) {
    if (status === 'OK') {
      // Duyệt qua danh sách kết quả và lấy thông tin của mỗi ảnh
      data.forEach(function (result) {
        // Đường dẫn đến ảnh Street View Panorama
        var imageUrl = result.location.pano;
        console.log('Image URL:', imageUrl);
      });
    } else {
      console.error('No Street View data found for this location');
    }
  });
})

</script>

<template>
  <div ref="mapDiv" style="width: 100%; min-height: 450px"/>
</template>