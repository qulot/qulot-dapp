<template>
  <div class="relative pt-[50px] lg:pt-[65.25px]">
    <div
      class="layout__contact_box lg:bg-no-repeat lg:bg-center flex justify-center w-full h-full"
    >
      <div
        class="contact-box w-[343px] m-4 lg:w-[1202px] lg:mt-10 lg:mb-10 box-border bg-white dark:bg-inherit rounded-lg border"
      >
        <div class="flex flex-col lg:flex-row">
          <!-- left -->
          <div
            class="box-img inline-block w-full h-[349px] lg:min-h-full lg:h-[unset] lg:min-w-[480px]"
          ></div>
          <!-- right -->
          <div class="box-right inline-block p-4 pt-8 pb-0">
            <div class="font-bold text-title text-[24px] mb-2 text-center">
              {{ $t('contactUs.information.title') }}
            </div>
            <div class="mx-auto text-sm mb-6 text-center">
              {{ $t('contactUs.information.content') }}
            </div>
            <!-- First name -->
            <FormKit
              v-model="contact.firstName"
              type="text"
              :placeholder="$t('contactUs.labels.PlaceholderFirstName')"
              :label="$t('contactUs.labels.FirstName')"
            >
              <template #label="{ label }">
                <div class="font-bold text-[17px] text-title mb-2">
                  {{ label }}
                </div>
              </template>
            </FormKit>
            <!-- Email address -->
            <FormKit
              v-model="contact.email"
              type="text"
              name="email"
              :placeholder="$t('contactUs.labels.PlaceholderEmailAddress')"
              :label="$t('contactUs.labels.EmailAddress')"
              validation="email"
            >
              <template #label="{ label }">
                <div class="font-bold text-[17px] text-title mb-2 mt-6">
                  {{ label }}
                </div>
              </template>
              <template #errors="{ visibleValidationErrors }">
                <div
                  v-if="
                    visibleValidationErrors &&
                    visibleValidationErrors.length > 0
                  "
                  class="flex items-center space-x-2 text-error text-xs mt-2"
                >
                  <svg-icon name="warnning" class="h-3 w-3" />
                  <span>{{ visibleValidationErrors[0] }}</span>
                </div>
              </template>
            </FormKit>
            <div class="font-bold text-[17px] text-title mb-2 mt-6">
              {{ $t('contactUs.labels.Topic') }}
            </div>
            <InputSelect
              v-model="contact.topic"
              :options="optionsList as any"
              :placeholder="$t('contactUs.labels.PlaceholderTopic')"
              class="select-topic"
            >
              <template #label="{ label }">
                <div
                  v-if="label"
                  class="flex items-center space-x-2 text-title-nodark"
                >
                  <span>{{ label.title }}</span>
                </div>
              </template>
              <template #option="{ option }">
                <div class="flex items-center space-x-2">
                  <div class="w-4 h-4 overflow-hidden rounded-full"></div>
                  <div>{{ option.title }}</div>
                </div>
              </template>
            </InputSelect>
            <!-- Subject -->
            <FormKit
              v-model="contact.subject"
              type="text"
              :placeholder="$t('contactUs.labels.PlaceholderSubject')"
              :label="$t('contactUs.labels.Subject')"
            >
              <template #label="{ label }">
                <div class="font-bold text-[17px] text-title mb-2 mt-6">
                  {{ label }}
                </div>
              </template>
            </FormKit>
            <!-- Your messenger -->
            <FormKit
              v-model="contact.messenger"
              type="textarea"
              :placeholder="$t('contactUs.labels.PlaceholderYourMessenger')"
              :label="$t('contactUs.labels.YourMessenger')"
              :input-class="(context: any, classes: string) => ['input-area'].concat(classes)"
              :drag-handle="false"
            >
              <template #label="{ label }">
                <div class="font-bold text-[17px] text-title mb-2 mt-6">
                  {{ label }}
                </div>
              </template>
            </FormKit>
            <div class="flex justify-end">
              <Button
                variant="primary"
                type="submit"
                class="w-full lg:w-40 rounded-lg mt-4 mb-4 lg:mb-11 lg:mt-6"
                @click="submit()"
              >
                {{ $t('contactUs.labels.Send') }}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const optionsList = ref([
  {
    title: 'Đức',
    value: 1,
  },
  {
    title: 'Đạt',
    value: 2,
  },
  {
    title: 'Đỗ',
    value: 3,
  },
])
const contact = ref({
  topic: '',
  firstName: '',
  email: '',
  subject: '',
  messenger: '',
})

const submit = () => {
  console.log('contact: ', contact.value)
}
</script>

<style lang="scss" scoped>
.layout__contact_box {
  background-image: url('/contact-us/background-contact.svg');
  background-size: cover;
}

.box-img {
  background-image: url('/contact-us/big-left-contact.svg');
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width: 1023px) {
    background-position: bottom;
    border-radius: 8px 8px 0 0;
  }
}
</style>
