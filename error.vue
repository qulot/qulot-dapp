<template>
  <NuxtLayout>
    <div class="nuxt-error pt-16 pb-4 lg:pb-14 space-y-4">
      <component :is="errorPage" :error="error" />

      <!-- Report error link -->
      <section
        v-if="error.statusCode !== 404"
        class="container mx-auto flex flex-col items-center"
      >
        <ClientOnly>
          <NuxtLink
            :to="createReportErrorLink()"
            class="text-sm text-title underline"
          >
            {{ $t('message.reportBugsToUs') }}
          </NuxtLink>
        </ClientOnly>
      </section>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const Error404 = resolveComponent('Error404')
const Error500 = resolveComponent('Error500')
const router = useRouter()
const route = useRoute()
const localePath = useLocalePath()
const { themeCurrent } = useTheme()
const { t, locale } = useI18n()

const props = defineProps({
  error: {
    type: Object,
    default: () => {},
  },
})

const errorPage = computed(() => {
  if (props.error.statusCode === 404) {
    return Error404
  }
  // catch everything else
  return Error500
})

const createReportErrorLink = () => {
  const subject = `Report bugs on web link ${route.path}`
  const body = `Something wrong happened to me on a site.
  Url: ${window.location.href}
  Error details: ${JSON.stringify(props.error)}
  `
  return localePath({
    name: 'contact-us',
    query: { subject, body, topic: 'reportTechnicalProblem' },
  })
}

if (process.client) {
  console.log(props.error)
}

// Load data on client
onBeforeMount(() => {
  useHead({
    htmlAttrs: {
      class: themeCurrent,
      lang: locale,
    },
  })
})
</script>
