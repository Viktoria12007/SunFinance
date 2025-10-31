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
const searchButton = useTemplateRef('searchButton');

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
  if (dropdown.value && !dropdown.value.contains(event.target as Node) && searchButton.value !== event.target) {
    hideSearchList();
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
        class="absolute z-[2] top-[50%] left-[1.1rem] -translate-y-1/2 text-white"
      />
      <input
        type="text"
        name="city"
        :placeholder="placeholder"
        class="w-full py-[1.1rem] pl-[3.3rem] pr-[1.1rem] rounded-l-lg bg-gray-200/50 backdrop-blur-[3.3rem] placeholder:text-white"
        @blur="hideSearchList"
        v-model.trim="model"
      />
      <button
        ref="searchButton"
        class="min-w-[5.7rem] px-[1.4rem] py-[0.6rem] bg-white text-black rounded-r-lg"
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
        class="w-full absolute z-[5] p-[0.8rem] rounded-lg bg-gray-200/50 backdrop-blur-[3.3rem] mt-[0.6rem]"
      >
        <li
          v-for="search in searchList"
          :key="search.id"
          class="grid grid-cols-5 gap-1 items-center rounded-lg p-[0.3rem] cursor-pointer hover:bg-white hover:text-black transition duration-500"
          @click="openModal(search)"
        >
          <div class="col-span-2 flex items-center gap-[0.3rem]">
            <span>{{ search.name }}, {{ search.sys.country }}</span>
            <img
              :src="`https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/4x3/${search.sys.country.toLowerCase()}.svg`"
              :alt="`Flag's icon ${search.weather[0].icon}`"
              class="w-[1.3rem] h-[1.1rem] inline-block"
            />
          </div>
          <div>{{ search.main.temp }} {{ displayUnit }}</div>
          <img
            :src="`https://openweathermap.org/img/wn/${search.weather[0].icon}@2x.png`"
            :alt="`Weather's icon ${search.weather[0].icon}`"
            class="w-[2.8rem] h-[2.8rem]"
          />
          <div>{{ search.coord.lat }}, {{ search.coord.lon }}</div>
        </li>
      </ul>
    </Transition>
    <ModalWindow :isOpen="isOpenModal" :onClose="onCloseModal">
      <CityForecastDetails :details="itemDetails as CityForecastDetails"/>
    </ModalWindow>
    <div v-if="!searchList.length && touchedSearchInput" class="absolute mt-[0.6rem] px-[2.2rem]">
      {{ emptyText }}
    </div>
  </div>
</template>
