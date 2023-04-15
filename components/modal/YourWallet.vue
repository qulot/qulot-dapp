<template>
    <Modal :title="$t('wallet.yourWallet')" v-model="value"
        header-class="px-6 py-4 border-b border-[#D8D8D8] dark:border-slate-400"
        body-class="px-6 py-4 border-b border-[#D8D8D8] dark:border-slate-400 space-y-4" footer-class="px-6 py-4" size="xs">
        <template #body>

            <!-- Account Address -->
            <div class="w-100">
                <h4 class="text-sm text-main font-bold mb-2">{{ $t('wallet.yourAddress') }}</h4>
                <div class="rounded-lg bg-[#F3EFFF] p-2 flex justify-between items-center">
                    <span class="overflow-hidden text-ellipsis max-w-full">{{ wallet.account }}</span>
                    <svg-icon name="copy" class="w-4 h-4 cursor-pointer ml-2" />
                </div>
            </div>

            <!-- Current Chain -->
            <div class="w-100">
                <h4 class="text-sm text-main font-bold mb-2">{{ $t('wallet.viewOnExplorer') }}</h4>
                <div class="flex justify-between items-center whitespace-nowrap space-x-2" v-if="selectedChain">
                    <div
                        class="flex items-center space-x-2 rounded-full border dark:border-none dark:bg-slate-900 p-2 w-1/2">
                        <span
                            class="rounded-full bg-white min-w-[1.5rem] min-h-[1.5rem] p-1 flex items-center justify-center">
                            <img :src="getChainIcon(selectedChain)" :alt="selectedChain.name" class="h-4 w-4">
                        </span>
                        <span class="text-sm dark:text-white overflow-ellipsis overflow-hidden">{{ selectedChain.name
                        }}</span>
                    </div>
                    <nuxt-link v-if="explorerAccount" :to="explorerAccount.link" class="text-main" target="_blank">
                        {{ explorerAccount.name }}
                        <svg-icon name="external-link" class="w-4 h-4" />
                    </nuxt-link>
                </div>
            </div>

            <!-- Account Balance -->
            <div class="w-100 space-y-2" v-if="balance && tokenBalance">
                <!-- Chain balance -->
                <h4 class="text-sm text-main font-bold">{{ $t('wallet.balances') }}</h4>
                <div class="flex items-center justify-between dark:text-white">
                    <h5>{{ $t('wallet.balance', { balance: balance.symbol }) }}</h5>
                    <span class="font-bold">{{ formatFloatFixed(balance.formatted, 4) }}</span>
                </div>

                <!-- Token balance -->
                <div class="flex items-center justify-between dark:text-white">
                    <h5>{{ $t('wallet.balance', { balance: tokenBalance.symbol }) }}</h5>
                    <span class="font-bold">{{ formatFloatFixed(tokenBalance.formatted, 4) }}</span>
                </div>
            </div>
        </template>
        <template #footer>
            <Button @click="onDisconnectClick" variant="primary" rounded class="w-full">{{ $t('wallet.disconnect')
            }}</Button>
        </template>
    </Modal>
</template>
<script setup lang="ts">
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:show'])

const value = computed({
    get() {
        return props.show;
    },
    set(value) {
        emit("update:show", value);
    },
})

const { wallet, chainId, disconnect, getChain } = useEthers()
const { balance, tokenBalance } = useAccount()

const onDisconnectClick = () => {
    disconnect()
    value.value = false
}

const selectedChain = computed(() => getChain(chainId.value))

const explorerAccount = computed(() => {
    if (selectedChain.value && selectedChain.value.blockExplorers && wallet.value.account) {
        return {
            name: selectedChain.value.blockExplorers.default.name,
            link: `${selectedChain.value.blockExplorers.default.url}/address/${wallet.value.account}`
        }
    }
    return null
})
</script>