<template>
  <div class="flex flex-col min-h-screen">
    <!-- App header -->
    <AppHeader />
    <!-- Render contents with transition -->
    <main class="flex-grow">
      <transition name="fade" mode="out-in">
        <Nuxt />
      </transition>
    </main>
    <!-- App footer -->
    <AppFooter />
  </div>
</template>
<script>

export default {
  name: 'LayoutDefault',
  components: {
    AppHeader: () => import('@/components/header/AppHeader.vue'),
    AppFooter: () => import('@/components/footer/App.vue'),
  },
}
</script>
