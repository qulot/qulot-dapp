import CurrencyDropdown from "@/components/dropdown/CurrencyDropdown.vue"

export default {
  title: 'dropdown',
  component: CurrencyDropdown,
  argTypes: {
    value: {
      type: String,
      control: 'text'
    },
    currencies: {
      type: Array,
      control: 'object',
    }
  }
}

export const Template = (arg, { argTypes }) => ({
  components: { CurrencyDropdown },
  props: Object.keys(argTypes),
  template: `<CurrencyDropdown v-bind="$props" />`,
});

export const CurrencyDropdownDefault = Template.bind({});
CurrencyDropdownDefault.args = {
  value: 'USDT',
  options: [
    {
      "title": "USDT",
      "value": "USDT",
      "icon": "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/usdt.svg"
    }, {
      "title": "USDC", 
      "value": "USDC", 
      "icon": "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/usdc.svg"
    }
  ]
}