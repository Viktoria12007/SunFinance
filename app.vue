<script lang="ts" setup>
import Loader from "~/components/UI/Loader.vue";
import { useLoadingStore } from "~/stores/Loading";

const store = useLoadingStore();
const { isLoading } = storeToRefs(store);
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <Loader :isOpen="isLoading"/>
  </NuxtLayout>
</template>
