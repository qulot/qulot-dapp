import BButton from "@/components/button/BButton.vue";

export default {
  title: "input",
  argTypes: {
    type: {
      control: { type: 'text' },
      defaultValue: "phonenumber"
    },
    name: {
      control: { type: 'text' },
      defaultValue: "phone"
    },
    label: {
      control: { type: 'text' },
      defaultValue: "Phone number"
    },
    placeholder: {
      control: { type: 'text' },
      defaultValue: "Enter your phone number"
    },
    validation: {
      control: { type: 'text' },
      defaultValue: "required|phonenumber"
    }
  },
};

export const PhoneNumberInput = (arg, { argTypes }) => ({
  components: { BButton },
  props: Object.keys(argTypes),
  template: `<FormulateInput v-bind="$props" />`,
});
