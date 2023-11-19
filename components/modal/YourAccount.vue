<template>
  <Modal
    v-model="showValue"
    :title="$t('user.yourAccount')"
    header-class="px-6 py-4 border-b border-[#D8D8D8] dark:border-slate-400"
    body-class="px-6 py-4 border-b border-[#D8D8D8] dark:border-slate-400 space-y-4"
    footer-class="px-6 py-4"
    size="xs"
  >
    <template #body>
      <!-- Account Email -->
      <FormKit
        type="text"
        disabled
        :label="$t('user.email')"
        :value="loggedInUser?.email"
        :classes="{
          label: '$remove:text-[17px] text-main text-sm',
          input: '$remove:h-[3rem]',
        }"
      />

      <!-- Account Full Name -->
      <FormKit
        type="text"
        disabled
        :label="$t('user.fullName')"
        :value="loggedInUser?.lastName + ' ' + loggedInUser?.firstName"
        :classes="{
          label: '$remove:text-[17px] text-main text-sm',
          input: '$remove:h-[3rem]',
        }"
      />

      <!-- Account Address -->
      <FormKit
        type="text"
        disabled
        :label="$t('wallet.yourAddress')"
        :value="loggedInUser?.ethAccount?.address"
        :classes="{
          label: '$remove:text-[17px] text-main text-sm',
          input: '$remove:h-[3rem]',
        }"
        @suffix-icon-click="copyClipboard"
      >
        <template #suffixIcon="context">
          <div :class="context.classes.suffixIcon">
            <svg-icon
              ref="btnCopyAddress"
              name="copy"
              class="w-4 h-4 cursor-pointer self-center"
            />
          </div>
        </template>
        <template #help="{ classes }">
          <NuxtLink :to="localePath('/user/private-key')" :class="classes.help">
            {{ $t('user.showPrivateKey') }}
          </NuxtLink>
        </template>
      </FormKit>

      <!-- Account my orders -->
      <Button
        variant="primary"
        rounded
        type="link"
        :to="localePath('/orders')"
        class="space-x-2"
        @click="onMyOrdersClick"
      >
        <span>{{ $t('order.myOrders') }}</span>
        <svg-icon name="external-link" class="w-4 h-4" />
      </Button>
    </template>
    <template #footer>
      <Button variant="danger" rounded class="w-full" @click="onLogoutClick">
        {{ $t('auth.logout') }}
      </Button>
    </template>
  </Modal>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:show', 'logout', 'leave'])

const localePath = useLocalePath()
const authStore = useAuthStore()
const { loggedInUser } = storeToRefs(authStore)

const btnCopyAddress = ref()

const showValue = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})

const onLogoutClick = () => {
  authStore.logout()
  emit('logout')
}

const onMyOrdersClick = () => {
  emit('leave')
}

const copyClipboard = () => {
  if (loggedInUser.value && loggedInUser.value.ethAccount) {
    copyContent(loggedInUser.value.ethAccount.address).then(() => {
      useTippy(btnCopyAddress.value.$el, {
        content: 'Copied!',
        showOnCreate: true,
        duration: 100,
      })
    })
  }
}
</script>
