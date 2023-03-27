import RegisterByPhone from "@/components/form/auth/RegisterByPhone.vue"

export default {
  title: 'form',
  component: RegisterByPhone,
  // argTypes: {
  //   errors: {
  //     control: 'array',
  //     defaultValue: []
  //   }
  // }
}

export const RegisterByPhoneForm = (arg, { argTypes }) => ({
  components: { RegisterByPhone },
  props: Object.keys(argTypes),
  template: `<RegisterByPhone v-bind="$props" />`,
});