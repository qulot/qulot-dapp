import RegisterByEmail from "@/components/form/auth/RegisterByEmail.vue"

export default {
  title: 'form',
  component: RegisterByEmail,
  // argTypes: {
  //   errors: {
  //     control: 'array',
  //     defaultValue: []
  //   }
  // }
}

export const RegisterByEmailForm = (arg, { argTypes }) => ({
  components: { RegisterByEmail },
  props: Object.keys(argTypes),
  template: `<RegisterByEmail v-bind="$props" />`,
});