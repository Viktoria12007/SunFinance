<script lang="ts" setup>
const props = defineProps<{
  radioList: Array<{ value: string, text: string }>,
}>();
const emit = defineEmits<{
  (event: 'changeValueRadio', value: string): void,
}>();

const value = ref(props.radioList[0].value);

watch(value, (newValue) => {
  emit("changeValueRadio", newValue);
})

const activeRadioIndex = computed<number>(() => {
  return props.radioList.findIndex((item) => item.value === value.value);
});

function selectUnit(selectedValue: string) {
  value.value = selectedValue;
  emit('changeValueRadio', selectedValue);
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
        :class="{ 'text-black': value === radio.value }"
        @click="selectUnit(radio.value)"
    >
      {{ radio.text }}
    </div>
  </div>
</template>
