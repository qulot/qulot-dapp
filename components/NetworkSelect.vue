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
        <img :src="selected.iconUrl" :alt="selected.text" class="h-4 w-4" />
      </span>
      <span class="text-white hidden lg:inline-block">{{ selected.text }}</span>
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
const { chains, chainId } = useEthers()

const items = computed(() =>
  chains.map((network) => ({
    id: network.id,
    iconUrl: getChainIcon(network),
    text: network.name,
    active: network.id === chainId.value,
  }))
)

const selected = computed(() =>
  items.value.find((network) => network.id === chainId.value)
)

const onChange = (newValue: any) => {
  if (selected.value?.id === newValue.key) {
    return
  }

  chainId.value = newValue.key
}
</script>
