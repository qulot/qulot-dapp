<template>
  <Html :class="themeCurrent" :lang="locale">
    <Body>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
<script setup lang="ts">
const { themeCurrent } = useTheme()
const locale = useState<string>('locale.setting')
</script>
