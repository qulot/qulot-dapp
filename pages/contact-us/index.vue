<template>
  <div class="relative pt-[50px] lg:pt-[65.25px]">
    <div
      class="bg-[url('/contact-us/background-contact.svg')] lg:bg-no-repeat lg:bg-center flex justify-center w-full h-full"
    >
      <div class="container">
        <div
          class="my-10 bg-white dark:bg-block rounded-lg shadow-default overflow-hidden"
        >
          <div class="flex flex-col lg:flex-row">
            <div
              class="bg-[url('/contact-us/big-left-contact.svg')] bg-bottom bg-no-repeat bg-cover inline-block w-full h-[349px] lg:min-h-full lg:h-[unset] lg:min-w-[480px]"
            ></div>

            <div class="inline-block p-4 pt-8 pb-0">
              <div class="font-bold text-title text-[24px] mb-2 text-center">
                {{ $t('contactUs.information.title') }}
              </div>
              <div class="mx-auto text-sm text-content mb-6 text-center">
                {{ $t('contactUs.information.content') }}
              </div>
              <PageContactUsContactForm
                :value="contactMailData"
                :loading="loading"
                @submit="(data: any) => handleSubmitEmail(data)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const config = useRuntimeConfig()
const { t } = useI18n()
const { send } = useEmail()
const router = useRouter()
const route = useRoute()
const localePath = useLocalePath()

const loading = ref(false)
const contactMailData = ref({})

const title = computed(
  () => `${t('footer.linkContactUs')} | ${config.public.metadata.appName}`
)

useSeoMeta({
  title,
  ogTitle: title,
})

const getTopicLabel = (topic: string) => t(`contactUs.topics.${topic}`)

const handleSubmitEmail = async (data: any) => {
  loading.value = true

  try {
    const subject = `[Contact] ${data.topic} - ${data.subject}`
    const text = `
    Hey ${config.public.emailFrom},

    I want help on the topic ${getTopicLabel(data.topic)}.
    ${data.body}

    Thanks,

    ${data.fromName}
    ${data.fromEmail}
    `
    await send({
      subject,
      text,
      cc: [data.fromEmail],
    })

    router.push(localePath('/contact-us/success'))
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: (error as Error).message,
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  contactMailData.value = Object.assign(contactMailData.value, {
    body: route.query.body,
    subject: route.query.subject,
    topic: route.query.topic,
  })
})
</script>
