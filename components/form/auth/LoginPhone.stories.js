import LoginPhone from "@/components/form/auth/LoginPhone.vue";

export default {
  title: "form",
  component: LoginPhone,
  argTypes: {
    errors: {
      control: "array",
      defaultValue: [],
    },
  },
};

export const LoginPhoneForm = (arg, { argTypes }) => ({
  components: { LoginPhone },
  props: Object.keys(argTypes),
  template: `<LoginPhone v-bind="$props" />`,
});
