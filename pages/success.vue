<template>
  <div class="flex flex-col justify-center pt-16 pb-6 container mx-auto">
    <Success
      :title="$route.query.title"
      :description="$route.query.description"
      :link="$route.query.link"
      :link-text="$route.query.linkText"
    />
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  validate: (route) => {
    let isValid = true

    const { linkText, title } = route.query

    if (isEmpty(title as string) || isEmpty(linkText as string)) {
      isValid = false
    }

    return isValid
  },
})
</script>
