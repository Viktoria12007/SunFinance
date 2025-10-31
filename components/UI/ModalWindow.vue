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
            class="relative w-[17.8rem] max-w-[90%] p-[1.1rem] rounded-lg bg-white text-black"
            @click.stop=""
        >
          <button class="absolute top-[0] right-[-2.8rem] p-[0.4rem] rounded-full bg-white" @click="onClose">
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
