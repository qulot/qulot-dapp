<template>
  <Dropdown
    title="Change Theme"
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
    @item-click="switchTheme"
  >
    <div class="h-5 flex items-center justify-center text-menu space-x-2">
      <div v-show="themeCurrent === 'light'" class="mx-auto my-auto">
        <svg-icon name="light" />
      </div>
      <div v-show="themeCurrent === 'dark'" class="mx-auto my-auto">
        <svg-icon name="dark" />
      </div>
    </div>
  </Dropdown>
</template>
<script setup lang="ts">
import { ITheme, IThemeSettingOptions } from '@/composables/useTheme'

const themeSetting = useState<IThemeSettingOptions>('theme.setting')
const themeCurrent = useState<ITheme>('theme.current')
const { t } = useLang()

const items = computed(() => [
  { icon: 'light', text: t('theme.light'), theme: 'light' },
  { icon: 'dark', text: t('theme.dark'), theme: 'dark' },
  { icon: 'clock_circle', text: t('theme.realtime'), theme: 'realtime' },
  { icon: 'laptop', text: t('theme.system'), theme: 'system' },
])

const switchTheme = (item: any) => {
  themeSetting.value = item.theme
}
</script>
