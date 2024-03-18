<script setup>
import { NConfigProvider, NMessageProvider } from "naive-ui";

const themeOverrides = {
  common: {
    primaryColor: "#009DFF",
  },
  Select: {
    peers: {
      InternalSelection: {
        textColor: "black",
      },
    },
  },
};
</script>

<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <NMessageProvider placement="top">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </NMessageProvider>
  </NConfigProvider>
</template>
