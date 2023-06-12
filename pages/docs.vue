<template>
  <div class="relative pt-16 pb-4 lg:pb-10">
    <div class="pt-6 lg:pt-10 container mx-auto dark:text-white">
      <div class="editor-content text-justify">
        <!-- Qulot Lottery Documents -->
        <div class="section">
          <h2>Qulot Lottery Documents</h2>
          <p>
            Playing the Qulot Lottery gives you a chance to win huge token
            prizes! It's easy, fair, and you can enter as often as you like as
            long as you have the token to buy a ticket.
          </p>
        </div>

        <!-- Specifics -->
        <DocsSpecifics />

        <!-- Ticket costs -->
        <DocsTicketCosts />

        <!-- How to win -->
        <DocsHowToWin />

        <!-- Prize eligibility -->
        <DocsPrizeEligibility />

        <!-- Prize sharing across prize reward rules -->
        <DocsPrizeSharing />

        <!-- Lottery FAQ -->
        <DocsFAQ />

        <!-- Smart Contracts -->
        <DocsSmartContracts />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const config = useRuntimeConfig()
const title = computed(() => `Documents | ${config.public.metadata.appName}`)

useSeoMeta({
  title,
  ogTitle: title,
})
</script>
