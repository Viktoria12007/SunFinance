import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

config.autoAddCss = false;

library.add(faMagnifyingGlass, faXmark, faSpinner);

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
