import { onMounted, onUnmounted, ref } from 'vue'
import { WindowSize } from '@/interfaces'

export default (): WindowSize => {

  const winSizes = ref<WindowSize>({ width: 0, height: 0 })

  const setWindowSizes = (): void => {
    winSizes.value.width = window.innerWidth
    winSizes.value.height = window.innerHeight
  }

  onMounted((): void => {
    window.addEventListener("resize", setWindowSizes);
  })

  onUnmounted((): void => {
    window.removeEventListener("resize", setWindowSizes);
  })
  return winSizes.value
}