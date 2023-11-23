<template>
  <footer
    class="pt-6 pb-6 lg:pt-32 lg:pb-20 bg-[#231E36] font-normal text-[17px]"
  >
    <div class="container mx-auto lg:flex lg:space-x-10 justify-between">
      <!-- Description -->
      <div
        class="mb-4 pb-4 border-b border-solid border-[#C5C5C5] lg:border-b-0 lg:pb-0 lg:mb-0 lg:w-5/12"
      >
        <div class="inline-flex text-2xl mb-4 lg:mb-6">
          <img
            src="/logo-text.svg"
            class="w-[90px] lg:w-[120px] h-auto"
            alt="logo"
          />
        </div>
        <p class="text-sm lg:text-[17px] text-[#A8A8A8]">
          {{ $t('app.description') }}
        </p>
      </div>
      <!-- Separator -->
      <div
        class="min-w-[1px] w-px h-[205px] bg-[#C5C5C5] hidden lg:block"
      ></div>
      <!-- Links -->
      <div
        class="lg:w-6/12 flex justify-center text-white text-sm lg:text-base"
      >
        <div class="flex flex-row justify-between w-full">
          <div class="flex">
            <ul class="space-y-4 my-auto">
              <li class="hover:text-main">
                <nuxt-link :to="localePath('/')">{{
                  $t('footer.linkHome')
                }}</nuxt-link>
              </li>
              <li class="hover:text-main">
                <nuxt-link
                  :to="localePath('/about-us')"
                  :title="$t('footer.linkAboutUs')"
                >
                  {{ $t('footer.linkAboutUs') }}
                </nuxt-link>
              </li>
              <li class="hover:text-main">
                <nuxt-link
                  :to="localePath('/contact-us')"
                  :title="$t('footer.linkContactUs')"
                >
                  {{ $t('footer.linkContactUs') }}
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="flex">
            <ul class="space-y-4 my-auto">
              <li class="hover:text-main">
                <nuxt-link :to="localePath('/terms-of-service')">{{
                  $t('footer.linkTermsOfService')
                }}</nuxt-link>
              </li>
              <li class="hover:text-main">
                <nuxt-link
                  to="https://luckynumber.qulot.io/log/viewer"
                  target="_blank"
                  :title="$t('footer.liveDrawing')"
                >
                  {{ $t('footer.liveDrawing') }}
                </nuxt-link>
              </li>
              <li class="hover:text-main">
                <nuxt-link
                  to="https://twitter.com/qulot48856"
                  target="_blank"
                  title="Twitter"
                >
                  Twitter
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="flex">
            <ul class="space-y-4 my-auto">
              <li class="hover:text-main">
                <nuxt-link
                  to="https://docs.qulot.io/"
                  target="_blank"
                  :title="$t('footer.linkDocument')"
                >
                  {{ $t('footer.linkDocument') }}
                </nuxt-link>
              </li>
              <li class="hover:text-main">
                <nuxt-link to="https://github.com/qulot">{{
                  $t('footer.linkGithub')
                }}</nuxt-link>
              </li>
              <li>
                <CurrencySelect
                  :label-class="['text-white', 'text-sm', 'lg:text-base']"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script lang="ts" setup>
const localePath = useLocalePath()
</script>
