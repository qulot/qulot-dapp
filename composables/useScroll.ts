export const useScrollTop = (offset: number) => {
  const scrollAtTop = useState<boolean>('scroll.atTop', () => false)

  const onScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    if (scrollTop > offset) {
      scrollAtTop.value = true
    } else {
      scrollAtTop.value = false
    }
  }

  // lifecycle hooks
  onMounted(() => {
    window.addEventListener('scroll', onScroll)
  })
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return {
    scrollAtTop,
  }
}
