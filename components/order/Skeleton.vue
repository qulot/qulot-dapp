<template>
  <div
    class="rounded-lg shadow-default p-2 lg:p-4 space-y-2 lg:space-y-4 dark:bg-block animate-pulse"
  >
    <div class="grid grid-rows-2 grid-cols-2 lg:grid-flow-col lg:grid-cols-3">
      <!-- Order Info -->
      <div class="h-4 w-20 bg-slate-200 rounded mb-2 lg:mb-4"></div>

      <!-- Order Detail -->
      <div
        class="order-3 lg:order-2 col-span-2 lg:col-span-2 flex flex-row w-full items-center justify-between space-x-2"
      >
        <div class="h-4 w-40 bg-slate-200 rounded"></div>
        <div class="h-4 w-40 bg-slate-200 rounded"></div>
        <div class="h-4 w-40 bg-slate-200 rounded"></div>
      </div>

      <!-- Order Show Ticket Button -->
      <div
        class="order-2 lg:order-3 lg:row-span-2 flex justify-end lg:items-center"
      >
        <div class="w-4 h-4 bg-slate-200 rounded ml-auto"></div>
      </div>
    </div>
  </div>
</template>
