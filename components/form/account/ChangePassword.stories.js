import ChangePassword from "@/components/form/account/ChangePassword.vue"

export default {
  title: 'form',
  component: ChangePassword,
  argTypes: {
    errors: {
        control: 'array',
        defaultValue: []
      }
  }
}

export const ChangePasswordForm = (arg, { argTypes }) => ({
  components: { ChangePassword },
  props: Object.keys(argTypes),
  template: `<ChangePassword v-bind="$props" />`,
});