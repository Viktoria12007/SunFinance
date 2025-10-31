<script setup lang="ts">
import SearchInput from "~/components/UI/SearchInput.vue";
import RadioInputs from "~/components/UI/RadioInputs.vue";

const store = useWeatherStore();
const { q, unit, radioList } = storeToRefs(store);
const { getCityList, getCityForecastDetails } = store;
</script>

<template>
  <div class="min-h-screen p-[1.4rem]">
    <div class="flex flex-col-reverse flex-wrap lg:flex-row gap-[1.7rem]">
      <SearchInput
        :searchCallback="getCityList"
        :itemCallback="getCityForecastDetails"
        placeholder="Search city"
        empty-text="Such a city does not exist"
        v-model="q"
      />
      <RadioInputs class="self-end" :radioList="radioList" v-model="unit"/>
    </div>
  </div>
</template>
