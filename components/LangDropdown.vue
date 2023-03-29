<template>
  <Dropdown
    title="Change Language"
    class="text-menu"
    :items="items"
    :positions="['end']"
    :content-class="[
      'shadow',
      'bg-base-100',
      'rounded-box',
      'w-40',
      'text-black',
    ]"
    @item-click="switchLang"
  >
    <div class="h-5 flex items-center justify-center text-menu space-x-2">
      <svg-icon name="global" class="w-4 h-4" />
      <span class="block capitalize">{{ locale }}</span>
    </div>
  </Dropdown>
</template>
<script setup lang="ts">
import { LocaleObject } from 'vue-i18n-routing'

const { locales, locale, setLocale } = useLang()

const items = computed(() =>
  locales.value.map((locale) => {
    return {
      code: (locale as LocaleObject).code,
      text: (locale as LocaleObject).name,
    }
  })
)

const switchLang = (item: LocaleObject) => {
  setLocale(item.code)
}
</script>
