<template>
  <section class="container mx-auto flex flex-col items-center">
    <div class="-mb-10 lg:-mb-28">
      <img src="/errors.svg" alt="" class="max-w-full h-auto" />
    </div>

    <div class="font-bold text-2xl lg:text-5xl mb-4 mt-2 text-error">
      {{ $t('message.internalServerError') }}
    </div>

    <div class="text-sm lg:text-2xl text-title mb-2">
      {{ $t('message.serverHasDeserted') }}
    </div>
    <Button type="link" rounded :to="localePath('/')" class="text-title">{{
      $t('labels.backToHome')
    }}</Button>
  </section>
</template>
<script lang="ts" setup>
const localePath = useLocalePath()
</script>
