<template>
  <section class="container mx-auto flex flex-col items-center">
    <div class="-mb-10 lg:-mb-28">
      <img src="/errors.svg" alt="" class="max-w-full h-auto" />
    </div>

    <div class="font-bold text-2xl lg:text-5xl mb-4 mt-2 text-error">
      {{ $t('message.internalServerError') }}
    </div>

    <div class="text-sm lg:text-2xl text-title mb-4">
      {{ $t('message.serverHasDeserted') }}
    </div>
    <nuxt-link to="/" class="bg-main rounded px-4 py-3 text-white text-sm">{{ $t('labels.backToHome') }}</nuxt-link>
  </section>
</template>
<script>
import { StatusCodes } from 'http-status-codes'
export default {
  name: 'error-500',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      errorStatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    }
  },
}
</script>
