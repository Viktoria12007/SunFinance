<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { CityList, City, CityForecastDetails } from "~/types/City";
import ModalWindow from "~/components/UI/ModalWindow.vue";

const props = defineProps<{
  searchCallback: (search: string) => Promise<CityList | undefined>,
  itemCallback?: (item: City) => Promise<CityForecastDetails | undefined>,
  placeholder: string,
  emptyText: string,
}>();

const emit = defineEmits<{
  (event: 'changeValueSearchInput', value: string): void,
}>();

const search = ref<string>("");
const searchList = ref<Array<City>>([]);
const touchedSearchInput = ref(false);
const isOpenModal = ref(false);
const item = ref<City | null>(null);
const itemDetails = ref<CityForecastDetails | null>(null);

watch(search, async (newValue) => {
  emit('changeValueSearchInput', newValue);
})

function onCloseModal() {
  isOpenModal.value = false;
}

async function handleSearch() {
  if (search.value.length > 2) {
    const data = await props.searchCallback(search.value);
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
  if (props.itemCallback) {
    const data = await props.itemCallback(selectedItem);
    if (data && selectedItem) {
      item.value = selectedItem;
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
        v-model.trim="search"
      />
      <button
        class="px-[25px] py-[10px] bg-white text-black rounded-r-lg"
        @blur="hideSearchList"
        @click="handleSearch"
      >
        Search
      </button>
    </div>

    <Transition name="dropdown">
      <ul
        v-if="searchList.length"
        class="w-full absolute p-[15px] rounded-lg bg-gray-200/50 backdrop-blur-[60px] mt-[10px]"
      >
        <li
          v-for="search in searchList"
          :key="search.id"
          class="columns-4 rounded-lg p-[5px] cursor-pointer hover:bg-white hover:text-black transition duration-500"
          @click="openModal(search)"
        >
          <div>{{ search.name }}</div>
          <div>{{ search.main.temp }}</div>
          <img
              :src="`https://openweathermap.org/img/wn/${search.weather[0].icon}@2x.png`"
              :alt="`Иконка погоды ${search.weather[0].icon}`"
              class="w-[40px] h-[40px]"
          />
          <div>{{ search.coord.lat }}, {{ search.coord.lon }}</div>
        </li>
      </ul>
    </Transition>
    <ModalWindow :isOpen="isOpenModal" :onClose="onCloseModal">
      <CityForecastDetails :city="item as City" :details="itemDetails as CityForecastDetails" />
    </ModalWindow>
    <div v-if="!searchList.length && touchedSearchInput" class="absolute mt-[10px] px-[40px]">
      {{ emptyText }}
    </div>
  </div>
</template>
