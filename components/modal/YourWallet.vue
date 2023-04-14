<template>
    <Modal :title="$t('wallet.yourWallet')" v-model="value"
        header-class="px-6 py-4 border-b border-[#D8D8D8] dark:border-slate-400"
        body-class="px-6 py-4 border-b border-[#D8D8D8] dark:border-slate-400" footer-class="px-6 py-4" size="xs">
        <template #body>

            <!-- Account Address -->
            <h4 class="text-sm text-main font-bold mb-2">{{$t('wallet.yourAddress')}}</h4>
            <div class="rounded-lg bg-[#F3EFFF] p-4 flex justify-between items-center">
                <span class="overflow-hidden text-ellipsis max-w-full">{{ wallet.account }}</span>
                <svg-icon name="copy" class="w-4 h-4 cursor-pointer ml-2"/>
            </div>

            <!-- Current Chain -->
            <div class="flex justify-between items-center">
                
            </div>
        </template>
        <template #footer>
            <Button @click="onDisconnectClick" variant="primary" rounded class="w-full">{{ $t('wallet.disconnect')
            }}</Button>
        </template>
    </Modal>
</template>
<script setup lang="ts">
const { wallet, disconnect } = useEthers()
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

const onDisconnectClick = () => {
    disconnect()
    value.value = false
}
</script>