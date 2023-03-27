<template>
  <section>
    <div class="container mx-auto text-sm">
      <TitleCard title="Team & partners" />
      <div class="mb-6 space-y-5">
        <p>
          <strong class="text-title">Qulot</strong> là công ty cung cấp giải pháp phần mềm thế hệ tiếp theo sáng tạo
          được thiết kế để nâng cao trải nghiệm của người tham gia và tiếp tục là điểm gặp gỡ giữa công nghệ, công bằng
          và giải trí.
        </p>
        <p>
          Chúng tôi có một cách tiếp cận độc đáo để đổi mới và hiện đại hóa ngành xổ số do kiến thức sâu rộng của chúng
          tôi về lĩnh vực này và thành tích thành công của chúng tôi trong việc hợp tác với các tổ chức quốc tế như IBM.
        </p>
        <p>
          <strong class="text-title">Qulot</strong> không chỉ được hỗ trợ bởi một đội ngũ những người phi thường với
          kinh nghiệm phong phú trong mọi thứ từ thiết kế đến an ninh mạng đến phát triển phần mềm, quan hệ khách hàng
          và hoạch định chiến lược.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-4 xl:gap-6 lg:grid-cols-6">
        <div
          v-for="(member, index) in listMember"
          :key="`team-${index}`"
          class="
            flex flex-col
            items-center
            pt-8
            px-4
            pb-6
            cursor-pointer
            rounded
            hover:bg-[#F3F3F3] hover:dark:bg-block
            text-center
            dark:text-white
          "
        >
          <div class="mb-5 h-20 w-20 rounded-full overflow-hidden">
            <img :src="member.image" :alt="member.name" class="inline-block max-w-full h-auto" />
          </div>
          <h2 class="font-bold text-title text-[17px] mb-1.5">{{ member.name }}</h2>
          <p class="text-sm">{{ member.position }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  components: {
    TitleCard: () => import('@/components/titlecard/TitleCard.vue'),
  },
  data() {
    return {
      listMember: [
        {
          name: 'Andy Nguyen',
          image: require('~/static/team/andy.png'),
          position: 'CEO',
        },
        {
          name: 'Andy Nguyen',
          image: require('~/static/team/andy2.png'),
          position: 'CTO',
        },
        {
          name: 'Andy Nguyen',
          image: require('~/static/team/andy3.png'),
          position: 'PM',
        },
        {
          name: 'Andy Nguyen',
          image: require('~/static/team/andy4.png'),
          position: 'Designer',
        },
        {
          name: 'Andy Nguyen',
          image: require('~/static/team/andy5.png'),
          position: 'DEV',
        },
        {
          name: 'Andy Nguyen',
          image: require('~/static/team/andy.png'),
          position: 'DEV',
        },
      ],
    }
  },
}
</script>
