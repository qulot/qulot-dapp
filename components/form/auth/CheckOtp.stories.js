import CheckOtp from "@/components/form/auth/CheckOtp.vue";

export default {
  title: "form",
  component: CheckOtp,
  argTypes: {
    errors: {
      control: "array",
      defaultValue: [],
    },
  },
};

export const CheckOtpForm = (arg, { argTypes }) => ({
  components: { CheckOtp },
  props: Object.keys(argTypes),
  template: `<CheckOtp v-bind="$props" />`,
});
