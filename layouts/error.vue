<template>
  <div class="nuxt-error pt-16 pb-4 lg:pb-14">
    <component :is="errorPage" :error="error" />
  </div>
</template>

<script>
import Error404 from '@/components/error/404.vue'
import Error500 from '@/components/error/500.vue'
import { StatusCodes } from 'http-status-codes'
export default {
  name: 'nuxt-error',
  layout: 'other',
  components: { Error404, Error500 },
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    errorPage() {
      if (this.error.statusCode === StatusCodes.NOT_FOUND) {
        return Error404
      }
      // catch everything else
      return Error500
    },
  },
}
</script>
