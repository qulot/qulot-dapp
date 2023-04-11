<template>
    <Modal :title="title" v-model="value" header-class="px-6 py-4 border-b border-[#D8D8D8]"
        body-class="px-6 py-4 border-b border-[#D8D8D8]" footer-class="flex px-6 py-4">
        <template #body>
            <p class="text-dark">{{ content }}</p>
        </template>
        <template #footer>
            <Button @click="value = false" variant="primary" rounded class="ml-auto">OK</Button>
        </template>
    </Modal>
</template>
<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    modelValue: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
})

</script>