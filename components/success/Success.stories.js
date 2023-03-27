import Success from "@/components/success/Success.vue"

export default {
  title: 'Success',
  component: Success,
  argTypes: {
  }
}

export const SuccessSection = (arg, { argTypes }) => ({
  components: { Success },
  template: `<Success v-bind="$props" />`,
});
