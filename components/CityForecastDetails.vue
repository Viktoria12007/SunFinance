<script lang="ts" setup>
import { type CityForecastDetails } from "~/types/City";

const props = defineProps<{
  details: CityForecastDetails,
}>()

const currentDate = computed(() => {
    return new Date(props.details.current.dt * 1000);
})

const store = useWeatherStore();
const { displayUnit, city } = storeToRefs(store);
</script>

<template>
  <div v-if="details && city" class="flex flex-col items-center gap-y-[10px]">
    <img
        :src="`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`"
        :alt="`Weather's icon ${city.weather[0].icon}`"
        class="w-[50px] h-[50px]"
    />
    <div>
      {{ city.name }}, {{ city.sys.country }}
    </div>
    <div>
      {{ currentDate.toLocaleString('en-US', { weekday: 'long', timeZone: details.timezone }) }},
      {{ currentDate.getDate() }}
    </div>
    <div>
      {{ details.current.temp }} {{ displayUnit }}
    </div>
    <div>
      {{ details.daily[0].temp.min }} {{ displayUnit }}
      /
      {{ details.daily[0].temp.max }} {{ displayUnit }}
    </div>
  </div>
</template>
