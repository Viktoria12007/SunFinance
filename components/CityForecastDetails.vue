<script lang="ts" setup>
import type { City, CityForecastDetails } from "~/types/City";

const props = defineProps<{
  city: City,
  details: CityForecastDetails,
}>()

const currentDate = computed(() => {
  return new Date((props.details.current.dt + props.details.timezone_offset) * 1000);
})
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
      {{ currentDate.toLocaleString('en-US', { weekday: 'long' }) }},
      {{ currentDate.getDate() }}
    </div>
    <div>
      {{ details.current.temp }}
    </div>
    <div>
      {{ details.daily[0].temp.min }}/{{ details.daily[0].temp.max }}
    </div>
  </div>
</template>
