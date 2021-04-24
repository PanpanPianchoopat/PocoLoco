import { computed, onMounted, onUnmounted, ref } from "vue";

export const useScreenHeight = () => {
  let windowHeight = ref(window.innerHeight);

  const onHeightChange = () => (windowHeight.value = window.innerHeight);
  onMounted(() => window.addEventListener("resize", onHeightChange));
  onUnmounted(() => window.removeEventListener("resize", onHeightChange));

  const height = computed(() => windowHeight.value);
  const tableRow = computed(() => Math.floor((windowHeight.value - 430) / 35));

  return { height, tableRow };
};
