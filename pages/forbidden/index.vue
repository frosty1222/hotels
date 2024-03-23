<script setup lang="jsx">
const route = useRoute();
const backHome=()=>{
    window.location.href = '/'
}
definePageMeta({
  layout: "cms"
});
</script>

<template>
    <div class="forbidden-page">
      <h1>Forbidden</h1>
      <p>You are not authorized to access this page.</p>
      <button @click="backHome">Back to home</button>
    </div>
</template>
<style scoped>
.forbidden-page {
  /* Add your styles for the forbidden page */
  /* Example styles */
  margin: auto;
  text-align: center;
  padding: 20px;
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button{
    background-color: aquamarine;
    padding: 7px 10px;
    border-radius: 5px;
    cursor: pointer;
}
button:hover{
    background-color: black;
    color: #fff;
}
</style>