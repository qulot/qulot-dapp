<template>
  <section class="">
    <div class="container mx-auto">
      <TitleCard title="Innovative features">
        <template #icon>
          <svg-icon name="rocket" class="h-9 w-9" />
        </template>
      </TitleCard>
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-4 dark:text-white">
        <div
          v-for="(feature, index) in listFeature"
          :key="index"
          class="flex space-x-4 lg:space-x-0 lg:flex-col lg:space-y-8 items-center justify-center py-2 lg:py-8 px-2 dark:bg-block"
        >
          <img
            :src="feature.image"
            alt="image"
            class="w-[90px] h-[90px] lg:w-[140px] lg:h-[140px]"
          />
          <p class="flex-grow text-sm lg:text-center">
            {{ feature.content }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
const listFeature = ref([
  {
    image: '/feature/Group 34284.svg',
    content:
      'Thu hút trực tiếp thế hệ millennials thông qua các trò chơi tức thì.',
  },
  {
    image: '/feature/Group 34440.svg',
    content:
      'Rút thăm hàng ngày và tương tác xã hội với người chơi trên toàn cầu.',
  },
  {
    image: '/feature/Group 34289.svg',
    content:
      'Công nghệ chuỗi khối và hợp đồng thông minh đảm bảo tính minh bạch vô song để giành được sự tin tưởng của người dùng.',
  },
  {
    image: '/feature/Group 34441.svg',
    content: 'Không có lừa đảo hoặc nhà khai thác bị lỗi.',
  },
])
</script>
