<template>
  <Modal
    v-model="showValue"
    :title="$t('wallet.connect')"
    header-class="px-6 py-4"
    body-class="grid -mt-[56px] lg:min-h-[477.6px]"
    :footer="false"
    close-button-class="z-10"
    title-class="text-black z-10"
    size="md"
  >
    <template #body>
      <div class="grid grid-cols-1 lg:grid-cols-2 h-full">
        <!-- Wallet list -->
        <div class="order-2 flex flex-col px-6 pb-4 pt-4 lg:pt-[56px] gap-y-6">
          <!-- Wallet connect warning message -->
          <p class="text-title-nodark dark:text-white">
            {{ $t('wallet.connectMsg') }}
          </p>
          <!-- Wallet available list -->
          <div class="flex items-center justify-start gap-6">
            <WalletItem
              v-for="item in wallets"
              :key="item.id"
              :icon="item.icon"
              :name="item.name"
              @click="onClick(item)"
            />
          </div>
        </div>
        <!-- Wallet banner -->
        <div
          class="order-1 lg:order-2 bg-[#EFEAFF] dark:bg-slate-700 flex items-center justify-center gap-y-5 py-6 pb-6 pt-[56px]"
        >
          <Transition name="slide-up" mode="out-in">
            <div
              v-if="wallet.status === 'connecting' && selected"
              class="flex flex-col items-center justify-center gap-y-3"
            >
              <div
                class="flex items-center justify-center w-[160px] h-[160px] p-3 rounded bg-[#E1E1E1]"
              >
                <img
                  :src="selected.icon"
                  :alt="selected.name"
                  class="h-100 w-auto"
                />
              </div>
              <h2 class="text-dark dark:text-white font-bold text-lg">
                {{ $t('wallet.opening', { wallet: selected.name }) }}
              </h2>
              <span class="text-dark dark:text-white">{{
                $t('wallet.plsConfirmIn', { wallet: selected.name })
              }}</span>
            </div>
            <div
              v-else
              class="flex flex-col items-center justify-center gap-y-3 lg:gap-y-6"
            >
              <h3 class="text-black">{{ $t('wallet.notInstallWallet') }}</h3>
              <img
                src="/wallet/banner.svg"
                alt="wallet-claim"
                class="w-100 h-auto"
              />
              <Button variant="primary" rounded>
                {{ $t('wallet.learnConnectWallet') }}
                <svg-icon name="external-link" class="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Transition>
        </div>
      </div>
    </template>
  </Modal>
</template>
<script setup lang="ts">
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:show'])

const showValue = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})

const { wallets, wallet, connect, disconnect } = useEthers()

const selected = ref()

watch(showValue, (newValue) => {
  if (!newValue && wallet.value.status === 'connecting') {
    disconnect()
  }
})

const onClick = async (wallet: any) => {
  selected.value = wallet
  await connect(wallet.id)
}
</script>
