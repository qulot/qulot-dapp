<template>
  <div class="space-y-6">
    <FormKit
      :errors="errors"
      type="form"
      :actions="false"
      @submit="(data: any) => $emit('submit', data)"
    >
      <div class="space-y-4">
        <FormKit
          :placeholder="$t('auth.placeholderPassword')"
          :label="$t('user.password')"
          :type="showPassword ? 'text' : 'password'"
          :disabled="loading"
          name="password"
          validation="required"
          autocomplele="current-password"
          suffix-icon="eyeClosed"
          @suffix-icon-click="handleIconClick"
        >
          <template #help="{ classes }">
            <NuxtLink
              :to="localePath('/auth/reset-password')"
              :class="classes.help"
            >
              {{ $t('auth.forgotYourPassword') }}
            </NuxtLink>
          </template>
        </FormKit>

        <Button
          :is-loading="loading"
          variant="primary"
          type="submit"
          class="w-full rounded-lg"
        >
          {{ $t('labels.confirm') }}
        </Button>
      </div>
    </FormKit>
  </div>
</template>
<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  errors: {
    type: Array<string>,
    default: () => [],
  },
})

defineEmits(['submit'])

const showPassword = ref(false)
const localePath = useLocalePath()

const handleIconClick = (node: any, e: any) => {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
  node.props.type = node.props.type === 'password' ? 'text' : 'password'
}
</script>
