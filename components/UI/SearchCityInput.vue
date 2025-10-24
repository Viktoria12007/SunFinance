<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const city = ref("");
const citiesList = ref([]);
const touchedSearchInput = ref(false);
watch(city, async (newValue, oldValue) => {
  try {
    citiesList.value = [];
    if (newValue.length > 2) {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${newValue}&appid=5796abbde9106b7da4febfae8c44c232&units=metric`);
      const data = await res.json();
      citiesList.value = data.list;
      touchedSearchInput.value = true;
    }
  } catch (e) {
    console.error(e);
  }
})
</script>

<template>
  <div class="relative">
    <FontAwesomeIcon
        :icon="['fas', 'magnifying-glass']"
        size="lg"
        class="absolute z-[2] top-[50%] left-[20px] -translate-y-1/2 text-white"
    />
    <input
        type="text"
        name="city"
        placeholder="Search city"
        class="w-full py-[20px] pl-[60px] pr-[20px] rounded-lg bg-gray-200/50 backdrop-blur-[60px]"
        v-model.trim.lazy="city"
    />
  </div>

  <ul
      v-if="citiesList.length"
      class="w-full p-[20px] rounded-lg bg-gray-200/50 backdrop-blur-[60px]"
  >
    <li v-for="city in citiesList" :key="city.id">{{ city.name }}</li>
  </ul>
  <div v-else-if="!citiesList.length && touchedSearchInput">Such a city does not exist</div>
</template>
