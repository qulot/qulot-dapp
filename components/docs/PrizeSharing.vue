<template>
  <div class="section">
    <NuxtLink href="#prize-sharing">
      <h2>Prize sharing across prize reward rules</h2>
    </NuxtLink>
    <p>
      After a round is drawn, and tickets with matching numbers are determined,
      the prizes are awarded. The amount won by each ticket will depend on how
      many other tickets won in the same prize reward rules.
    </p>
    <p>
      For example, if you have the only ticket that matched three numbers in
      order, and the predetermined share of the prize pool for your reward rule
      was 100 {{ token?.symbol }}, you'll receive the full 100
      {{ token?.symbol }}.
    </p>
    <p>
      If, however, you and five other people match three numbers, the 100
      {{ token?.symbol }} would be split between the four winning tickets,
      meaning you would receive 20 {{ token?.symbol }}.
    </p>
  </div>
</template>
<script setup lang="ts">
const { token } = useQulot()
</script>
