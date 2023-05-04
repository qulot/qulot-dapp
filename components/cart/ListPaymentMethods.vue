<template>
  <div class="flex flex-col space-y-2">
    <div
      v-for="method in paymentMethods"
      :key="method.id"
      class="rounded-lg border border-default py-3 px-4"
    >
      <InputRadioBox
        :value="payment"
        :model-value="method.id"
        :disabled="!method.active"
        :class="{ 'opacity-70': !method.active }"
        @change="changePaymentMethod(method.id)"
      >
        <div class="ml-4 cursor-pointer flex items-center">
          <div class="w-6 h-6 mr-2.5">
            <img
              :src="method.icon"
              :alt="method.name"
              class="max-w-full h-auto"
            />
          </div>
          <div class="text-sm title-nodark">{{ method.name }}</div>
        </div>
      </InputRadioBox>
    </div>
  </div>
</template>
<script setup lang="ts">
const { paymentMethods, payment } = usePayment()
const changePaymentMethod = (methodId: string) => {
  payment.value = methodId
}
</script>
