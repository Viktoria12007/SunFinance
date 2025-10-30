<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { type CityList, type City, type CityForecastDetails } from "~/types/City";
import ModalWindow from "~/components/UI/ModalWindow.vue";

const props = defineProps<{
  searchCallback: (search: string) => Promise<CityList | undefined>,
  itemCallback?: (item: City) => Promise<CityForecastDetails | undefined>,
  placeholder: string,
  emptyText: string,
}>();

const model = defineModel({ default: '' });

const dropdown = useTemplateRef('dropdown');

const searchList = ref<Array<City>>([]);
const touchedSearchInput = ref(false);
const isOpenModal = ref(false);
const itemDetails = ref<CityForecastDetails | null>(null);

const store = useWeatherStore();
const { displayUnit } = storeToRefs(store);

onMounted(() => {
    document.addEventListener('keydown', handleEnter);
    document.addEventListener('click', handleClick);
})

onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleEnter);
    document.removeEventListener('click', handleClick);
})

function handleEnter(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    handleSearch();
  }
}

function handleClick(event: MouseEvent) {
  if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
    isOpenModal.value = false;
  }
}

function onCloseModal() {
  isOpenModal.value = false;
  store.selectCity(null);
}

async function handleSearch() {
    if (model.value.length > 2) {
      const data = await props.searchCallback(model.value);
      if (data) {
        searchList.value = data.list;
      }
      touchedSearchInput.value = true;
    }
}

function hideSearchList() {
  searchList.value = [];
  touchedSearchInput.value = false;
}

async function openModal(selectedItem: City) {
  model.value = '';
  if (props.itemCallback) {
    const data = await props.itemCallback(selectedItem);
    if (data && selectedItem) {
      store.selectCity(selectedItem);
      itemDetails.value = data;
      isOpenModal.value = true;
    }
  }
}
</script>

<template>
  <div class="relative grow">
    <div class="relative flex">
      <FontAwesomeIcon
        :icon="['fas', 'magnifying-glass']"
        size="lg"
        class="absolute z-[2] top-[50%] left-[20px] -translate-y-1/2 text-white"
      />
      <input
        type="text"
        name="city"
        :placeholder="placeholder"
        class="w-full py-[20px] pl-[60px] pr-[20px] rounded-l-lg bg-gray-200/50 backdrop-blur-[60px] placeholder:text-white"
        @blur="hideSearchList"
        v-model.trim="model"
      />
      <button
        class="min-w-[103px] px-[25px] py-[10px] bg-white text-black rounded-r-lg"
        @blur="hideSearchList"
        @click="handleSearch"
      >
        Search
      </button>
    </div>

    <Transition name="dropdown">
      <ul
        v-if="searchList.length"
        ref="dropdown"
        class="w-full absolute p-[15px] rounded-lg bg-gray-200/50 backdrop-blur-[60px] mt-[10px]"
      >
        <li
          v-for="search in searchList"
          :key="search.id"
          class="grid grid-cols-5 gap-1 items-center rounded-lg p-[5px] cursor-pointer hover:bg-white hover:text-black transition duration-500"
          @click="openModal(search)"
        >
          <div class="col-span-2 flex items-center gap-[5px]">
            <span>{{ search.name }}, {{ search.sys.country }}</span>
            <img
              :src="`https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/4x3/${search.sys.country.toLowerCase()}.svg`"
              :alt="`Flag's icon ${search.weather[0].icon}`"
              class="w-[23px] h-[20px] inline-block"
            />
          </div>
          <div>{{ search.main.temp }} {{ displayUnit }}</div>
          <img
            :src="`https://openweathermap.org/img/wn/${search.weather[0].icon}@2x.png`"
            :alt="`Weather's icon ${search.weather[0].icon}`"
            class="w-[50px] h-[50px]"
          />
          <div>{{ search.coord.lat }}, {{ search.coord.lon }}</div>
        </li>
      </ul>
    </Transition>
    <ModalWindow :isOpen="isOpenModal" :onClose="onCloseModal">
      <CityForecastDetails :details="itemDetails as CityForecastDetails"/>
    </ModalWindow>
    <div v-if="!searchList.length && touchedSearchInput" class="absolute mt-[10px] px-[40px]">
      {{ emptyText }}
    </div>
  </div>
</template>
