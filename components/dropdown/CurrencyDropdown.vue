<template>
    <Select v-if="currencies && currencies.length > 0" v-model="inputValue" :options="currencies"
        @input="$emit('input', inputValue)" :class-label="classLabel">
        <template #label="{ label }">
            <div class="flex items-center space-x-2">
                <div class="w-4 h-4 overflow-hidden rounded-full">
                    <img class="max-w-full h-auto" :src="label.icon" :alt="label.title" />
                </div>
                <div>{{ label.title }}</div>
            </div>
        </template>
        <template #option="{ option }">
            <div class="flex items-center space-x-2">
                <div class="w-4 h-4 overflow-hidden rounded-full">
                    <img class="max-w-full h-auto" :src="option.icon" :alt="option.title" />
                </div>
                <div>{{ option.title }}</div>
            </div>
        </template>
    </Select>
</template>
<script>
export default {
    components: {
        Select: () => import('@/components/input/Select.vue'),
    },
    props: {
        currencies: {
            type: Array,
            default: () => [],
        },
        value: [String, Number],
        classLabel: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            inputValue: this.value
        }
    },
}
</script>