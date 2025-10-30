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
  <div class="relative flex items-center gap-[5px] p-[5px] rounded-lg bg-gray-200/50 backdrop-blur-[60px]">
    <div
        class="absolute rounded-lg bg-white w-[110pt] h-[36pt] transition duration-500"
        :style="{ transform: `translateX(${activeRadioIndex * 113}pt)` }"
    ></div>
    <div
        v-for="radio in radioList"
        :key="radio.value"
        class="flex-1 w-[110pt] transition-colors z-[2] text-center leading-[36pt] cursor-pointer"
        :class="{ 'text-black': model === radio.value }"
        @click="selectRadio(radio.value)"
    >
      {{ radio.text }}
    </div>
  </div>
</template>
