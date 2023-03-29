<template>
  <section>
    <div class="container mx-auto">
      <TitleCard title="How it works">
        <template #icon>
          <svg-icon name="hand" class="h-9 w-9" />
        </template>
      </TitleCard>
      <ul class="space-y-8">
        <li class="flex items-center gap-x-4 lg:gap-x-8">
          <img
            src="/work/step1Icon.svg"
            alt="step 1"
            class="block md:w-[120px] md:h-[120px]"
          />
          <div class="flex-grow">
            <h2 class="text-title font-bold text-base mb-2 md:text-2xl">
              Step 1
            </h2>
            <p class="text-sm md:text-base">
              Gửi tiền vào sản phẩm mà bạn muốn giành cơ hội chiến thắng
            </p>
          </div>
        </li>
        <li class="flex items-center gap-x-4 lg:gap-x-8">
          <img
            src="/work/step2Icon.svg"
            alt="step 2"
            class="block md:w-[120px] md:h-[120px]"
          />
          <div class="flex-grow">
            <h2 class="text-title font-bold text-base mb-2 md:text-2xl">
              Step 2
            </h2>
            <p class="text-sm md:text-base">Giải thưởng được trao mỗi ngày</p>
          </div>
        </li>
        <li class="flex items-center gap-x-4 lg:gap-x-8">
          <img
            src="/work/step3Icon.svg"
            alt="step 3"
            class="block md:w-[120px] md:h-[120px]"
          />
          <div class="flex-grow">
            <h2 class="text-title font-bold text-base mb-2 md:text-2xl">
              Step 3
            </h2>
            <p class="text-sm md:text-base">
              Ngay cả khi bạn không thắng, hãy giữ tất cả lãi suất của bạn!
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
