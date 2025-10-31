import { type City, type CityForecastDetails, type CityList, Units } from "~/types/City";
import { consola } from "consola";

export const useWeatherStore = defineStore('weather', () => {
    const loading = useLoadingStore();

    const q = ref("");
    const unit = ref("metric");
    const cityList = ref<Map<string, City>>(new Map());
    const city = ref<City | null>(null);
    const cityForecastDetailsList = ref(new Map());
    const radioList = ref([{ value: "metric", text: "Metric: °C, m/s" }, { value: "imperial", text: "Imperial: °F, mph" }]);

    const displayUnit = computed(() => {
       return unit.value === "imperial" ? Units.imperial : Units.metric;
    });

    function selectCity(selectedCity: City | null) {
        city.value = selectedCity;
    }

    async function cash(purpose: Ref, key: string, url: string) {
        try {
            loading.start();
            if (!purpose.value.has(key)) {
                const res = await fetch(url);
                const data = await res.json();
                purpose.value.set(key, data);
                return data;
            }
            return purpose.value.get(key);
        } catch (e) {
            consola.error(e);
        } finally {
            loading.stop();
        }
    }

    async function getCityList(): Promise<CityList | undefined> {
        return await cash(cityList, `${q.value}-${unit.value}`,`https://api.openweathermap.org/data/2.5/find?q=${q.value}&appid=5796abbde9106b7da4febfae8c44c232&units=${unit.value}`);
    }

    async function getCityForecastDetails(city: City): Promise<CityForecastDetails | undefined> {
        return await cash(cityForecastDetailsList, `${city.coord.lat}-${city.coord.lon}-${unit.value}`,`https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&units=${unit.value}&appid=5796abbde9106b7da4febfae8c44c232`);
    }

    return {
        q,
        radioList,
        unit,
        city,
        cityForecastDetailsList,
        displayUnit,
        selectCity,
        getCityList,
        getCityForecastDetails,
    }
})
