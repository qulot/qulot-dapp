<template>
  <section class="relative flex items-center w-full">
    <div class="container mx-auto">
      <div class="space-y-4 lg:space-y-6">
        <PrizeSummaryCard class="w-full p-3 md:p-6" v-for="(product, i) in products" :key="i" :product="product" />
      </div>
    </div>
  </section>
</template>
<script>
import PrizeSummaryCard from '@/components/card/PrizeSummary.vue'
export default {
  components: {
    PrizeSummaryCard,
  },
  props: {
    products: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
}
</script>
