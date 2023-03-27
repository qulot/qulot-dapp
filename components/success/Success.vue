<template>
  <section class="container mx-auto flex flex-col items-center">
    <div class="-mb-10 lg:-mb-28">
      <img src="/success.svg" alt="" class="max-w-full h-auto" />
    </div>

    <div class="font-bold text-2xl lg:text-5xl mb-4 mt-2 text-main">{{ title }}</div>

    <div class="text-sm lg:text-2xl text-title mb-4">{{ description }}</div>
    <nuxt-link to="/" class="bg-main rounded px-4 py-3 text-white text-sm">{{ $t('labels.backToHome') }}</nuxt-link>
  </section>
</template>
<script>
export default {
  name: 'success',
  props: {
    title: {
      type: String,
      default: 'Success!',
    },
    description: {
      type: String,
      default: "Logged in successfully. We're glad you're here",
    },
  },
  data() {
    return {}
  },
}
</script>
