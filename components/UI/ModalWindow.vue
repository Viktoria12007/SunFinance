<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps<{
  isOpen: boolean,
  onClose: () => void,
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="dropdown">
      <div
          v-if="isOpen"
          class="fixed inset-[0] z-[1000] flex justify-center items-center bg-linear-to-b bg-[#000000] bg-[#272424B2]"
          @click="onClose"
      >
        <div
            class="relative w-[320px] max-w-[90%] p-[20px] rounded-lg bg-white text-black"
            @click.stop=""
        >
          <button class="absolute top-[0] right-[-50px] p-[8px] rounded-full bg-white" @click="onClose">
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </button>
          <div class="modal-body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
