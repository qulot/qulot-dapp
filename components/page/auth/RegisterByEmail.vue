<template>
  <div>
    <FormKit
      :errors="errors"
      type="form"
      :actions="false"
      @submit="(data: any) => $emit('submit', data)"
    >
      <div class="space-y-4">
        <FormKit
          type="text"
          name="email"
          :placeholder="$t('auth.placeholderEmail')"
          :label="$t('auth.email')"
          :disabled="loading"
          validation="required|email"
        />

        <div class="grid lg:grid-flow-col lg:columns-2 gap-4 lg:gap-2">
          <FormKit
            type="text"
            name="firstName"
            :placeholder="$t('auth.placeholderFirstName')"
            :label="$t('user.firstName')"
            :disabled="loading"
            validation="required"
          />
          <FormKit
            type="text"
            name="lastName"
            :placeholder="$t('auth.placeholderLastName')"
            :label="$t('user.lastName')"
            :disabled="loading"
          />
        </div>

        <FormKit
          name="password"
          :placeholder="$t('auth.placeholderPassword')"
          :label="$t('auth.password')"
          :disabled="loading"
          validation="required"
          suffix-icon="eyeClosed"
          @suffix-icon-click="handleIconClick"
        />

        <FormKit
          v-model="isAccept"
          type="checkbox"
          :label="$t('auth.termsAndConditions')"
          help="help"
        >
          <template #help="context">
            <i18n-t
              tag="span"
              :class="context.classes.help"
              keypath="auth.acceptPolicy"
            >
              <template #terms>
                <nuxt-link
                  :to="localePath('/terms-of-service')"
                  class="underline"
                >
                  {{ $t('auth.terms') }}
                </nuxt-link>
              </template>
              <template #policy>
                <nuxt-link :to="localePath('/terms-of-service')">{{
                  $t('auth.policy')
                }}</nuxt-link>
              </template>
            </i18n-t>
          </template>
        </FormKit>

        <Button
          :is-loading="loading"
          variant="primary"
          type="submit"
          class="w-full rounded-lg"
          :disabled="!isAccept"
        >
          {{ $t('auth.signupNow') }}
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

const localePath = useLocalePath()

const isAccept = ref(false)

const handleIconClick = (node: any, e: any) => {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
  node.props.type = node.props.type === 'password' ? 'text' : 'password'
}
</script>
