<template>
  <RecaptchaCheckbox
    :theme="themeCurrent === 'light' ? 'light' : 'dark'"
    @success="(response) => handleVerifyResult(true, response)"
    @error="() => handleVerifyResult(false, null)"
  />
</template>
<script setup lang="ts">
const { themeCurrent } = useTheme()
const grecaptcha = useCookie('_GRECAPTCHA')

defineProps({
  success: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:success'])

const handleVerifyResult = (success: boolean, response: string) => {
  grecaptcha.value = response
  emit('update:success', success)
}
</script>
