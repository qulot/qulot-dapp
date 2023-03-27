import Error404 from "@/components/error/404.vue"

export default {
  title: 'error',
  component: Error404,
  argTypes: {
  }
}

export const Error404Section = (arg, { argTypes }) => ({
  components: { Error404 },
  template: `<Error404 v-bind="$props" />`,
});