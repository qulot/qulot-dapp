<template>
  <transition name="fade" mode="out-in">
    <NuxtChild />
  </transition>
</template>
<script>
export default {
  layout: 'app',
  name: 'AccountPage',
  data() {
    return {}
  },
}
</script>
