<template>
  <BDropdown
    title="Change Language"
    class="text-menu"
    :items="items"
    :positions="['end']"
    :content-class="['shadow', 'bg-base-100', 'rounded-box', 'w-40', 'text-black']"
    @item-click="handleItemClick"
  >
    <div class="h-5 flex items-center justify-center text-menu space-x-2">
      <svg-icon name="global" class="w-4 h-4" />
      <span class="block">{{ $i18n.locale }}</span>
    </div>
  </BDropdown>
</template>
<script>

const MAP_LOCALES_ICONS = {
  en: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ec-1f1e7.svg',
  vi: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1fb-1f1f3.svg',
}

export default {
  components: { BDropdown: () => import('@/components/dropdown/BDropdown.vue') },
  computed: {
    items() {
      return this.$i18n.locales.map((locale) => ({
        code: locale.code,
        text: locale.name,
        icon: `<img loading="lazy" width="20" height="20" src="${MAP_LOCALES_ICONS[locale.code]}" />`,
        active: locale.code === this.$i18n.locale,
      }))
    },
  },
  methods: {
    /**
     *
     * @param {string} code
     */
    switchToLang(code) {
      if (code === this.$i18n.locale) {
        return
      }
      // set language code for i18n module
      this.$i18n.setLocale(code)
      // set language code for vue formulate module
      this.$formulate.setLocale(code)
      this.$forceUpdate()
    },
    handleItemClick(item) {
      this.switchToLang(item.code)
    },
  },
}
</script>
