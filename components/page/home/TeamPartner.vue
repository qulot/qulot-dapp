<template>
  <section>
    <div class="container mx-auto text-sm">
      <TitleCard
        :title="$t('home.teamAndPartners')"
        tag="a"
        :title-props="{ href: '#team-and-partners' }"
      >
        <template #icon>
          <svg-icon name="handbag" class="h-9 w-9" />
        </template>
      </TitleCard>
      <div class="mb-6 space-y-5 text-content">
        <p>
          <strong class="text-title">Qulot</strong>
          {{ $t('home.teamAndPartnersAbout') }}
        </p>
        <p>
          {{ $t('home.teamAndPartnersConnect') }}
        </p>
        <p>
          <strong class="text-title">Qulot</strong>
          {{ $t('home.teamAndPartnersTeam') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>
