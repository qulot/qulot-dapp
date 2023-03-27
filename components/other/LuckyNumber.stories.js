import LuckyNumber from "@/components/other/LuckyNumber.vue"

export default {
  title: 'other',
  component: LuckyNumber,
  argTypes: {
    number: {
      control: 'number',
      defaultValue: Math.floor(Math.random() * 100)
    }
  }
}

export const OneLuckyNumber = (arg, { argTypes }) => ({
  components: { LuckyNumber },
  props: Object.keys(argTypes),
  template: `<LuckyNumber v-bind="$props" />`,
});

export const ManyLuckyNumber = (arg, { argTypes }) => ({
  components: { LuckyNumber },
  props: Object.keys(argTypes),
  template: `
    <div class="flex flex-rows w-full">
      <LuckyNumber class="mr-2" v-bind="$props" />
      <LuckyNumber class="mr-2" v-bind="$props" />
      <LuckyNumber class="mr-2" v-bind="$props" />
      <LuckyNumber class="mr-2" v-bind="$props" />
      <LuckyNumber class="mr-2" v-bind="$props" />
      <LuckyNumber class="mr-2" v-bind="$props" />
  </div>
  `,
});