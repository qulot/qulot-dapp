<template>
  <Dropdown
    title="Network select"
    :items="items"
    class="p-2 lg:px-3 bg-main rounded-lg"
  >
    <!-- Connected Icons -->
    <div
      v-if="isConnected || (isAuthenticated && hasLoggedInUser)"
      class="flex items-center"
    >
      <div
        class="flex items-center"
        :class="{
          'overflow-hidden -space-x-2':
            isConnected && isAuthenticated && hasLoggedInUser,
        }"
      >
        <Avatar
          v-if="isConnected"
          v-tippy="readableAddress"
          size-class="w-6"
          inner-class="bg-white"
        >
          <template #default>
            <svg-icon name="wallet" class="text-main w-4 h-4" />
          </template>
        </Avatar>
        <Avatar
          v-if="hasLoggedInUser"
          v-tippy="loggedInUser?.email"
          size-class="w-6"
          inner-class="bg-white"
        >
          <template #default>
            <svg-icon name="person" class="text-main w-4 h-4" />
          </template>
        </Avatar>
      </div>
    </div>

    <!-- Account Label -->
    <span
      class="text-white"
      :class="{
        'hidden lg:block': isConnected || (isAuthenticated && hasLoggedInUser),
      }"
    >
      {{ $t('auth.account') }}
    </span>
  </Dropdown>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import {
  ModalYourWallet,
  ModalSelectWallet,
  ModalYourAccount,
} from '#components'

const route = useRoute()
const localePath = useLocalePath()
const { t } = useI18n()
const { wallet } = useEthers()
const { isConnected } = useAccount()
const authStore = useAuthStore()
const { isAuthenticated, hasLoggedInUser, loggedInUser } =
  storeToRefs(authStore)

const { open: openModalYourAccount, close: closeModalYourAccount } = useModal({
  component: ModalYourAccount,
  attrs: {
    onLogout() {
      closeModalYourAccount()
    },
    onLeave() {
      closeModalYourAccount()
    },
  },
})

const { open: openModalYourWallet, close: closeModalYourWallet } = useModal({
  component: ModalYourWallet,
  attrs: {
    onDisconnect() {
      closeModalYourWallet()
    },
  },
})

const { open: openModalSelectWallet, close: closeModalSelectWallet } = useModal(
  {
    component: ModalSelectWallet,
  }
)

const items = computed(() => {
  const dropdownItems = []

  if (isAuthenticated.value && hasLoggedInUser.value) {
    dropdownItems.push({
      id: 'my-account',
      text: t('user.yourAccount'),
      icon: 'person',
      onClick: openModalYourAccount,
    })
  } else {
    dropdownItems.push({
      id: 'login',
      text: t('auth.login'),
      href: localePath('/auth/login'),
    })
  }

  if (isConnected.value) {
    dropdownItems.push({
      id: 'my-wallet',
      text: t('wallet.yourWallet'),
      icon: 'wallet',
      onClick: openModalYourWallet,
    })
  } else {
    dropdownItems.push({
      id: 'connect-wallet',
      text: t('wallet.connect'),
      onClick: openModalSelectWallet,
    })
  }

  return dropdownItems
})

const readableAddress = computed(() =>
  shortEthAddress(wallet.value.account as string)
)

watch(
  () => route.fullPath,
  (fullPath) => {
    const isOpenSelectWallet = fullPath.includes('#connect-wallet')

    if (isOpenSelectWallet) {
      openModalSelectWallet()
    } else {
      closeModalYourWallet()
      closeModalYourAccount()
    }
  }
)

watch(
  wallet,
  (newValue) => {
    if (newValue.status === 'connected') {
      closeModalSelectWallet()
    }
  },
  { deep: true }
)
</script>
