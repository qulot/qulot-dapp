<template>
    <Modal :title="$t('wallet.connect')" v-model="value" header-class="px-6 py-4" body-class="-mt-[56px]" :footer="false"
        close-button-class="z-10" size="md">
        <template #body>
            <div class="grid grid-cols-1 lg:grid-cols-2">
                <!-- Wallet list -->
                <div class="order-2 flex flex-col px-6 pb-4 pt-4 lg:pt-[56px] gap-y-6">
                    <!-- Wallet connect warning message -->
                    <p class="text-title-nodark">{{ $t('wallet.connectMsg') }}</p>
                    <!-- Wallet available list -->
                    <div class="flex items-center justify-start gap-6">
                        <WalletItem v-for="wallet in wallets" :key="wallet.key" :icon="wallet.icon" :name="wallet.name" />
                    </div>
                </div>
                <!-- Wallet banner -->
                <div
                    class="order-1 lg:order-2 bg-[#EFEAFF] flex flex-col items-center justify-center gap-y-5 py-6 pb-6 pt-[56px]">
                    <h3>{{ $t('wallet.notInstallWallet') }}</h3>
                    <img src="/wallet/banner.svg" alt="wallet-claim" class="w-100 h-auto">
                    <Button variant="primary" rounded>
                        {{ $t('wallet.learnConnectWallet') }} <svg-icon name="external-link" class="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </template>
    </Modal>
</template>
<script setup lang="ts">
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue'])

const { wallets } = useWallet()

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
})
</script>