<template>
  <div class="mb-4">
    <div class="title mb-1 lg:mb-4">
      {{ $t('cart.paymentMethod') }}
    </div>
    <div class="text-sm mb-2 text-disable">
      {{ $t('cart.choosePaymentMethod') }}
    </div>

    <div class="flex flex-col space-y-2">
      <template v-for="method in paymentMethods" :key="method.id">
        <div
          v-if="method.show()"
          :key="method.id"
          :class="{ 'opacity-70': !method.active }"
          class="rounded-lg border border-default py-3 px-4 flex items-center"
        >
          <InputRadioBox
            :value="payment"
            :model-value="method.id"
            :disabled="!method.active"
            @change="changePaymentMethod(method.id)"
          >
            <div class="ml-4 cursor-pointer flex items-center">
              <!-- Payment icon -->
              <div class="w-7 h-7 -my-1 mr-2.5">
                <img
                  :src="method.icon"
                  :alt="method.name()"
                  class="max-w-full h-auto"
                />
              </div>

              <!-- Payment label -->
              <div class="text-sm title-nodark">{{ method.name() }}</div>
            </div>
          </InputRadioBox>

          <!-- Help icon -->
          <tippy class="mr-0 ml-auto align-middle" tag="div">
            <svg-icon
              name="info-circle"
              class="w-4 h-4 cursor-pointer text-content"
            />

            <template #content>
              <!-- Payment method help text -->
              <h6
                class="mb-2"
                v-html="$t('payment.methodsHelp.' + method.id)"
              ></h6>
              <!-- Payment method help fee -->
              <PaymentVerboseFees :method="method" />
            </template>
          </tippy>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
const { paymentMethods, payment } = usePayment()
const changePaymentMethod = (methodId: string) => {
  payment.value = methodId
}
</script>
