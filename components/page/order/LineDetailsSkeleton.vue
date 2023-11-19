<template>
  <div class="rounded-lg shadow-default p-2 lg:p-4 space-y-2 dark:bg-block">
    <div class="w-[150px] h-[18px] bg-slate-200 rounded"></div>

    <!-- Order Line Amount -->
    <div class="flex items-center justify-between text-content">
      <div class="w-[60px] h-[18px] bg-slate-200 rounded"></div>
      <div class="w-[40px] h-[18px] bg-slate-200 rounded"></div>
    </div>

    <!-- Order Line Eth Order ID -->
    <div class="flex items-center justify-between text-content">
      <div class="w-[60px] h-[18px] bg-slate-200 rounded"></div>
      <div class="w-[30px] h-[18px] bg-slate-200 rounded"></div>
    </div>

    <!-- Order Line Create Date -->
    <div class="flex items-center justify-between text-content">
      <div class="w-[50px] h-[18px] bg-slate-200 rounded"></div>
      <div class="w-[60px] h-[18px] bg-slate-200 rounded"></div>
    </div>

    <!-- Order Line Tickets -->
    <div class="flex flex-col">
      <div class="w-[70px] h-[18px] bg-slate-200 rounded mb-2"></div>
      <div class="space-y-2">
        <TicketSkeletonItem />
      </div>
    </div>
  </div>
</template>
