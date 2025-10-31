<script lang="ts" setup>
const props = defineProps<{
  radioList: Array<{ value: string, text: string }>,
}>();

const model = defineModel();
model.value = props.radioList[0].value;

const activeRadioIndex = computed<number>(() => {
  return props.radioList.findIndex((item) => item.value === model.value);
});

function selectRadio(selectedValue: string) {
  model.value = selectedValue;
}
</script>

<template>
  <div class="relative flex items-center gap-[0.3rem] p-[0.3rem] rounded-lg bg-gray-200/50 backdrop-blur-[3.3rem]">
    <div
        class="absolute rounded-lg bg-white w-[8.2rem] h-[2.7rem] transition duration-500"
        :style="{ transform: `translateX(${activeRadioIndex * 8.5}rem)` }"
    ></div>
    <div
        v-for="radio in radioList"
        :key="radio.value"
        class="flex-1 w-[8.2rem] transition-colors z-[2] text-center leading-[2.7rem] cursor-pointer"
        :class="{ 'text-black': model === radio.value }"
        @click="selectRadio(radio.value)"
    >
      {{ radio.text }}
    </div>
  </div>
</template>
