<template>
  <div class="section">
    <NuxtLink href="#FAQ">
      <h2>Lottery FAQ</h2>
    </NuxtLink>
    <div class="section-child">
      <h3>1. What if there are no winners?</h3>
      <p class="section-child">
        If {{ token?.symbol }} in the prize pools isn't won it doesn't go to
        waste! Unclaimed {{ token?.symbol }} rolls over to the next Lottery
        round.
      </p>

      <h3>2. Can I swap my tickets back to {{ token?.symbol }}?</h3>
      <p class="section-child">
        No, once purchased you will not be able to convert your ticket back to
        {{ token?.symbol }}.
      </p>

      <h3>3. If I win, do I need to manually claim the prize?</h3>
      <p class="section-child">
        Yes, you will need to go to my ticket page. Find the ticket labeled "Win
        Prize" and click on the prize to claim it.
      </p>

      <h3>4. How often is the lottery?</h3>
      <div class="section-child">
        <p>The operation of the lottery will be in the following order:</p>
        <div class="flex items-center space-x-2 lg:space-x-4">
          <p>Close →</p>
          <p>Draw →</p>
          <p>Reward →</p>
          <p>Open</p>
        </div>
        <p>
          If there is a problem during the process of drawing or rewarding
          prizes or opening the next round, this process will take place in the
          next cycle.
        </p>
        <div class="section-child">
          <p>
            1. PowerQ 6/55 round will be active every Tuesday, Thursday and
            Saturday. Which will close at 03:00 AM UTC, draw at 03:05 AM UTC,
            reward at 03:10 AM UTC and next round will open at 03:15 AM UTC.
          </p>
          <p>
            2. LiteQ 3/66 round will be active every days. Which will close at
            02:00 AM UTC, draw at 02:05 AM UTC, reward at 02:10 AM UTC and next
            round will open at 02:15 AM UTC.
          </p>
        </div>
      </div>

      <h3>5. What transaction fee will I pay for buying tickets?</h3>
      <p class="section-child">
        Every ticket purchase you make will be one transaction. Purchasing a
        single ticket in a Lottery purchase will cost the normal amount of fees
        for a transaction.
      </p>

      <h3>6. Why can I only buy 100 tickets?</h3>
      <p class="section-child">
        You can only buy a maximum of 100 tickets in one purchase, but you can
        make multiple purchases. There's nothing to stop you buying more tickets
        after your first 100.
      </p>

      <h3>
        7. If I manually create two or more tickets with the same numbers and
        they win, am I eligible for prizes for each ticket?
      </h3>
      <p class="section-child">
        Yes, each ticket is treated as a separate entry to the Lottery. Keep in
        mind that the prizes will not be 1:1 though, as each winning ticket you
        have dilutes each share of the reward rules total prizes.
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
const { token } = useQulot()
</script>
