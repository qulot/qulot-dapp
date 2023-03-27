import Login from "@/components/form/auth/Login.vue"

export default {
  title: 'form',
  component: Login,
  argTypes: {
    errors: {
      control: 'array',
      defaultValue: []
    }
  }
}

export const LoginForm = (arg, { argTypes }) => ({
  components: { Login },
  props: Object.keys(argTypes),
  template: `<Login v-bind="$props" />`,
});