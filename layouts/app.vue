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
  </div>
</template>
<script>

export default {
  name: 'LayoutApp',
  components: {
    AppHeader: () => import('@/components/header/AppHeader.vue'),
  },
}
</script>
