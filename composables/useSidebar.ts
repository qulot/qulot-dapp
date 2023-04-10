export const useSidebar = () => {
  const showSidebar = useState('showSidebar', () => false)

  onMounted(() => {
    const route = useRoute()
    watch(
      route,
      (_) => {
        if (showSidebar.value) {
          showSidebar.value = false
        }
      },
      { deep: true, immediate: true }
    )
  })

  return { showSidebar }
}
