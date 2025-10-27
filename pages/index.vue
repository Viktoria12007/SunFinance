<script setup lang="ts">
import SearchInput from "~/components/UI/SearchInput.vue";
import type { CityList, City, CityForecastDetails } from "~/types/City";
import RadioInputs from "~/components/UI/RadioInputs.vue";
import { consola } from "consola";

const q = ref("");
const unit = ref("metric");
const citiesList = ref(new Map());
const radioList = ref([{ value: "metric", text: "Metric: °C, m/s" }, { value: "imperial", text: "Imperial: °F, mph" }]);

async function getCityList(): Promise<CityList | undefined> {
  try {
    if (!citiesList.value.has(`${q.value}-${unit.value}`)) {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${q.value}&appid=5796abbde9106b7da4febfae8c44c232&units=${unit.value}`);
      const data = await res.json();
      citiesList.value.set(`${q.value}-${unit.value}`, data);
      return data;
    }
    return citiesList.value.get(`${q.value}-${unit.value}`);
  } catch (e) {
    consola.error(e);
  }
}

async function getCityForecastDetails(city: City): Promise<CityForecastDetails | undefined> {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&units=${unit.value}&appid=5796abbde9106b7da4febfae8c44c232`);
    return await res.json();
  } catch (e) {
    consola.error(e);
  }
}

function selectQ(selectedQ: string): void {
  q.value = selectedQ;
}

function selectUnit(selectedUnit: string): void {
  unit.value = selectedUnit;
}
</script>

<template>
  <div class="min-h-screen p-[25px]">
    <div class="flex gap-[30px]">
      <SearchInput
          :searchCallback="getCityList"
          :itemCallback="getCityForecastDetails"
          placeholder="Search city"
          empty-text="Such a city does not exist"
          @changeValueSearchInput="selectQ"
      />
      <RadioInputs :radioList="radioList" @changeValueRadio="selectUnit"/>
    </div>
  </div>
</template>
