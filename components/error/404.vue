<template>
  <section class="container mx-auto flex flex-col items-center">
    <div class="-mb-10 lg:-mb-28">
      <img src="/errors.svg" alt="" class="max-w-full h-auto" />
    </div>

    <div class="font-bold text-2xl lg:text-5xl mb-4 mt-2 text-error">404</div>

    <div class="text-sm lg:text-2xl text-title mb-4">
      {{ $t('message.pageYouLookingNotFound') }}
    </div>

    <Button type="link" rounded :to="localePath('/')">{{
      $t('labels.backToHome')
    }}</Button>
  </section>
</template>
<script lang="ts" setup>
const localePath = useLocalePath()
</script>
