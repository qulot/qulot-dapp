<template>
  <div class="section">
    <NuxtLink href="#specifics"><h2>Specifics</h2></NuxtLink>
    <div class="section-child">
      <h3>1. PowerQ 6/55</h3>
      <div class="section-child">
        <p>
          a. Lottery ticket cost for 1 ticket: ~$1 USD in {{ token?.symbol }}.
          10% discount for each ticket.
        </p>
        <p>
          b. Individual user Lottery entry limit: No overall limit, but only 100
          tickets can be bought at a time.
        </p>
        <p>
          c. Choose a lucky number from 1 to 55 consisting of 6 digits, for
          example 12-34-20-08-54-15. The more matching numbers, the bigger the
          prize shared for you, at least 3 digits.
        </p>
        <p>
          d. For each round, 10% of the total prize will be deducted for the
          next round.
        </p>
      </div>
    </div>
    <div class="section-child">
      <h3>2. LiteQ 3/66 (soon)</h3>
      <div class="section-child">
        <p>
          a. Lottery ticket cost for 1 ticket: ~$1 USD in {{ token?.symbol }}.
          10% discount for each ticket.
        </p>
        <p>
          b. Individual user Lottery entry limit: No overall limit, but only 100
          tickets can be bought at a time.
        </p>
        <p>
          c. Choose a lucky number from 1 to 66 consisting of 3 digits, for
          example 12-34-20. The more matching numbers, the bigger the prize
          shared for you, at least 2 digits.
        </p>
        <p>
          d. For each round, 10% of the total prize will be deducted for the
          next round.
        </p>
      </div>
    </div>
    <p>
      Lottery uses Chainlink's implementation of VRF for true, secure
      randomness. In the third quarter of 2023, we will use quantum computers to
      get random numbers.
    </p>
  </div>
</template>
<script setup lang="ts">
const { token } = useQulot()
</script>
