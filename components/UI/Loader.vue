<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps<{
  isOpen: boolean,
}>()
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-[0] z-[1000] flex justify-center items-center bg-linear-to-b bg-[#000000] bg-[#272424B2]"
    >
      <FontAwesomeIcon
        icon="fa-solid fa-spinner"
        size="2xl"
        class="text-white animate-spin"
      />
    </div>
  </Teleport>
</template>
