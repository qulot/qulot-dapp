<template>
  <section class="relative flex items-center w-full">
    <div class="container mx-auto">
      <div class="space-y-4 lg:space-y-6">
        <PrizeSummary
          v-for="(product, i) in products"
          :key="i"
          class="w-full p-3 md:p-6"
          :product="product"
        />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
defineProps({
  products: {
    type: Array<Object>,
    require: true,
    default: () => [],
  },
})
</script>
