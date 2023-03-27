import Error500 from "@/components/error/500.vue"

export default {
  title: 'error',
  component: Error500,
  argTypes: {
  }
}

export const Error500Section = (arg, { argTypes }) => ({
  components: { Error500 },
  template: `<Error500 v-bind="$props" />`,
});