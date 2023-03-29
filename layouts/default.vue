<template>
  <div class="flex flex-col min-h-screen">
    <!-- App header -->
    <AppHeader />
    <!-- Render contents with transition -->
    <main class="flex-grow">
      <slot></slot>
    </main>
    <!-- App footer -->
    <AppFooter />
  </div>
</template>
