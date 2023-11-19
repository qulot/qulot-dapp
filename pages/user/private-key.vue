<template>
  <div class="flex flex-col justify-center pt-16 pb-6 container mx-auto">
    <Breadcrumb :list="[{ name: $t('user.privateKey'), url: '' }]" />
    <div class="lg:py-6 px-4">
      <div class="sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <div>
          <p
            class="text-xl font-bold leading-tight text-center mb-0 lg:text-2xl text-title"
          >
            {{ $t('user.showPrivateKey') }}
          </p>
        </div>
      </div>
      <div class="sm:mx-auto sm:w-full sm:max-w-md space-y-8">
        <!-- Input password form -->
        <PageUserPrivateKey
          :errors="errors"
          :loading="isLoading"
          @submit="submitGetPrivateKey"
        />

        <div v-show="ethPrivateKey">
          <FormKit
            v-model="ethPrivateKey"
            type="textarea"
            name="privatekey"
            :label="$t('user.yourPrivateKey')"
            :help="$t('user.helpPrivateKey')"
          >
            <template #suffixIcon="context">
              <div :class="context.classes.suffixIcon">
                <svg-icon
                  ref="btnCopyAddress"
                  name="copy"
                  class="w-4 h-4 cursor-pointer self-center"
                  @click="copyClipboard"
                />
              </div>
            </template>
          </FormKit>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const config = useRuntimeConfig()
const authStore = useAuthStore()
const { isLoading, ethPrivateKey, errors } = storeToRefs(authStore)

const title = computed(
  () => `${t('user.privateKey')} | ${config.public.metadata.appName}`
)

useSeoMeta({
  title,
  ogTitle: title,
})

definePageMeta({
  middleware: ['auth'],
})

const btnCopyAddress = ref()

const submitGetPrivateKey = async (data: any) => {
  await authStore.fetchEthPrivateKey(data.password)
}

const copyClipboard = () => {
  if (ethPrivateKey.value) {
    copyContent(ethPrivateKey.value).then(() => {
      useTippy(btnCopyAddress.value.$el, {
        content: 'Copied!',
        showOnCreate: true,
        duration: 100,
      })
    })
  }
}

onUnmounted(() => {
  authStore.clear()
})
</script>
