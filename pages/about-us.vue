<template>
  <div class="relative pt-10 lg:pt-16 pb-4 lg:pb-10">
    <div>
      <Information />
      <OurServices />
      <Guidelines />
      <BusinessModel />
      <TrackRecord />
      <SimpleSecure />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageAboutUs',
  auth: false,
  components: {
    Information: () => import('@/components/about-us/Information'),
    OurServices: () => import('@/components/about-us/OurServices'),
    Guidelines: () => import('@/components/about-us/Guidelines'),
    BusinessModel: () => import('@/components/about-us/BusinessModel'),
    TrackRecord: () => import('@/components/about-us/TrackRecord'),
    SimpleSecure: () => import('@/components/about-us/SimpleSecure'),
  },
}
</script>
