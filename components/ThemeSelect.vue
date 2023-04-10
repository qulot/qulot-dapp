<template>
  <Dropdown
    title="Change Theme"
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
    :arrow="arrow"
    @item-click="switchTheme"
  >
    <div v-show="themeCurrent === 'light'" class="flex">
      <svg-icon name="light" class="w-5 h-5" />
    </div>
    <div v-show="themeCurrent === 'dark'" class="flex">
      <svg-icon name="dark" class="w-5 h-5" />
    </div>
  </Dropdown>
</template>
<script setup lang="ts">
import { ITheme, IThemeSettingOptions } from '~~/composables/useTheme'

defineProps({
  arrow: {
    type: Boolean,
    default: false,
  },
})

const themeSetting = useState<IThemeSettingOptions>('theme.setting')
const themeCurrent = useState<ITheme>('theme.current')
const { t } = useI18n()

const items = computed(() => [
  {
    icon: 'light',
    text: t('theme.light'),
    theme: 'light',
    active: themeSetting.value === 'light',
  },
  {
    icon: 'dark',
    text: t('theme.dark'),
    theme: 'dark',
    active: themeSetting.value === 'dark',
  },
  {
    icon: 'clock-circle',
    text: t('theme.realtime'),
    theme: 'realtime',
    active: themeSetting.value === 'realtime',
  },
  {
    icon: 'laptop',
    text: t('theme.system'),
    theme: 'system',
    active: themeSetting.value === 'system',
  },
])

const switchTheme = (item: any) => {
  themeSetting.value = item.theme
}
</script>
