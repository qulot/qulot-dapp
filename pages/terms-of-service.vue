<template>
  <div class="relative pt-16 pb-4 lg:pb-10">
    <div class="pt-6 lg:pt-10 container mx-auto">
      <div class="editor-content">
        <div class="section">
          <h2 class="text-title">{{ $t('termsOfService.title') }}</h2>
          <p class="text-content">{{ $t('termsOfService.about') }}</p>
        </div>
        <div class="section">
          <h2 class="text-title">{{ $t('termsOfService.useOfOurSite') }}</h2>
          <h3 class="text-title">{{ $t('termsOfService.eligibility') }}</h3>
          <p class="text-content">
            {{ $t('termsOfService.eligibilityDetail') }}
          </p>
          <h3 class="text-title">{{ $t('termsOfService.access') }}</h3>
          <p class="text-content">{{ $t('termsOfService.accessDetail') }}</p>
          <h3 class="text-title">{{ $t('termsOfService.siteRules') }}</h3>
          <p class="text-content">{{ $t('termsOfService.siteRulesDetail') }}</p>
          <h3 class="text-title">{{ $t('termsOfService.siteLocation') }}</h3>
          <p class="text-content">
            {{ $t('termsOfService.siteLocationDetail') }}
          </p>
        </div>
        <div class="section">
          <h2 class="text-title">
            {{ $t('termsOfService.noProfessionalAdvice') }}
          </h2>
          <p class="text-content">
            {{ $t('termsOfService.noProfessionalAdviceDetail') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
