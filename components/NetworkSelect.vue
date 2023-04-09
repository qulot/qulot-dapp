<template>
  <Dropdown
    title="Network select"
    :items="items"
    class="p-2 lg:px-3"
    @item-click="onChange"
  >
    <template v-if="selected">
      <span
        class="rounded-full bg-white w-7 h-7 p-1 flex items-center justify-center"
      >
        <svg-icon :name="selected.icon" class="text-main h-4 w-4" />
      </span>
      <span class="text-white hidden lg:inline-block">{{ selected.text }}</span>
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
const { networks, networkSetting } = useNetwork()
const items = computed(() =>
  networks.map((network) => ({
    key: network.key,
    icon: network.icon as any,
    text: network.name,
    active: network.key === networkSetting.value,
  }))
)

const selected = computed(() =>
  items.value.find((network) => network.key === networkSetting.value)
)

const onChange = (newValue: any) => {
  if (selected.value?.key === newValue.key) {
    return
  }

  networkSetting.value = newValue.key
}
</script>
