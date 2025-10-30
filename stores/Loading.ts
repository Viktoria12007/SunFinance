export const useLoadingStore = defineStore('loading', () => {
    const isLoading = ref(false);

    function start() {
        isLoading.value = true;
    }

    function stop() {
        isLoading.value = false;
    }

    return {
        isLoading,
        start,
        stop
    }
});
