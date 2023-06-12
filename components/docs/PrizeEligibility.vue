<template>
  <div class="section">
    <NuxtLink href="#prize-eligibility">
      <h2>Prize eligibility</h2>
    </NuxtLink>
    <p>
      For example:
      <br />
      There are a total of six lottery balls, from 1 to 55, on each ticket. To
      win, your numbers need to match the numbers drawn like lottery balls, no
      matter the order.
    </p>

    <div class="mt-4">
      <p>Drawn numbers:</p>
      <div class="flex items-center space-x-2">
        <BallItem :number="12" />
        <BallItem :number="34" />
        <BallItem :number="20" />
        <BallItem :number="8" />
        <BallItem :number="51" />
        <BallItem :number="15" />
      </div>
    </div>

    <div class="mt-4">
      <p>Your ticket's numbers:</p>
      <div class="flex items-center space-x-2">
        <BallItem :number="34" />
        <BallItem :number="8" disable />
        <BallItem :number="41" disable />
        <BallItem :number="5" disable />
        <BallItem :number="12" />
        <BallItem :number="51" />
      </div>
    </div>
  </div>
</template>
