<template>
  <Dropdown
    title="Change Language"
    class="text-white p-2 lg:px-3"
    :items="items"
    :positions="['end']"
    :content-class="[
      'shadow',
      'bg-base-100',
      'rounded-box',
      'w-fit',
      'text-black',
    ]"
    arrow-class="text-menu"
    @item-click="switchLang"
  >
    <svg-icon name="global" class="w-4 h-4" />
    <span class="block capitalize">{{ locale }}</span>
  </Dropdown>
</template>
<script setup lang="ts">
import { LocaleObject } from 'vue-i18n-routing'

const { locales, locale, setLocale } = useI18n()

const items = computed(() =>
  locales.value.map((lang: any) => ({
    code: (lang as LocaleObject).code,
    text: (lang as LocaleObject).name,
    active: (lang as LocaleObject).code === locale.value,
  }))
)

const switchLang = (item: LocaleObject) => {
  setLocale(item.code)
}
</script>
