<template>
  <FormKit
    v-model="fromData"
    type="form"
    :actions="false"
    @submit="(data: any) => $emit('submit', data)"
  >
    <div class="space-y-2 lg:space-y-4">
      <!-- Full name -->
      <FormKit
        type="text"
        :placeholder="$t('contactUs.labels.PlaceholderYourName')"
        :label="$t('contactUs.labels.yourName')"
        validation="required"
        name="fromName"
      />

      <!-- Your email -->
      <FormKit
        type="email"
        :placeholder="$t('contactUs.labels.PlaceholderEmail')"
        :label="$t('contactUs.labels.email')"
        validation="required"
        name="fromEmail"
      />

      <!-- Topic -->
      <FormKit
        type="select"
        :placeholder="$t('contactUs.labels.placeholderTopic')"
        :label="$t('contactUs.labels.topic')"
        :options="topics"
        validation="required"
        name="topic"
      />

      <!-- Subject -->
      <FormKit
        type="text"
        :placeholder="$t('contactUs.labels.placeholderSubject')"
        :label="$t('contactUs.labels.subject')"
        validation="required"
        name="subject"
      />
      <!-- Content -->
      <FormKit
        type="textarea"
        :placeholder="$t('contactUs.labels.placeholderContent')"
        :label="$t('contactUs.labels.content')"
        validation="required"
        name="body"
        input-class="input-area"
      />
      <div class="flex flex-col items-end">
        <!-- ReCaptcha check -->
        <Recaptcha v-model:success="isCaptchaSuccess" />

        <!-- Submit button -->
        <Button
          variant="primary"
          type="submit"
          class="w-full lg:w-40 mt-4 mb-4 lg:mb-11 lg:mt-6"
          rounded
          :is-loading="loading"
          :disabled="!isCaptchaSuccess"
        >
          {{ $t('contactUs.labels.Send') }}
        </Button>
      </div>
    </div>
  </FormKit>
</template>

<script setup lang="ts">
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  errors: {
    type: Array<string>,
    default: () => [],
  },
  value: {
    type: Object,
    default: () => {},
  },
})

defineEmits(['submit'])

const { t } = useI18n()

const isCaptchaSuccess = ref(false)
const fromData = ref({})

const getTopicLabel = (topic: string) => t(`contactUs.topics.${topic}`)

const topics = ref([
  { label: getTopicLabel('complaint'), value: 'complaint' },
  { label: getTopicLabel('howToPlayGames'), value: 'howToPlayGames' },
  { label: getTopicLabel('howToClaimPrize'), value: 'howToClaimPrize' },
  { label: getTopicLabel('onlinePurchases'), value: 'onlinePurchases' },
  {
    label: getTopicLabel('reportTechnicalProblem'),
    value: 'reportTechnicalProblem',
  },
  { label: getTopicLabel('other'), value: 'other' },
])

onMounted(() => {
  fromData.value = props.value
})
</script>
