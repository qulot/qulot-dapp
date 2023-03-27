import SwitchBox from "@/components/input/SwitchBox.vue"

export default {
  title: 'input',
  component: SwitchBox,
  argTypes: {
    value: {
      type: Boolean,
      control: 'boolean'
    },
  }
}

const Template = (arg, { argTypes }) => ({
  components: { SwitchBox },
  props: Object.keys(argTypes),
  template: `<SwitchBox v-bind="$props" />`,
});

export const SwitchBoxDefault = Template.bind({});
SwitchBoxDefault.args = {
  value: true
}
