import Select from "@/components/input/Select.vue"

export default {
  title: 'input',
  component: Select,
  argTypes: {
    value: {
      type: String,
      control: 'text'
    },
    options: {
      type: Array,
      control: 'object',
    }
  }
}

const Template = (arg, { argTypes }) => ({
  components: { Select },
  props: Object.keys(argTypes),
  template: `<Select v-bind="$props" />`,
});

export const SelectDefault = Template.bind({});
SelectDefault.args = {
  value: 'en',
  options: [
    {
      title: 'Tiếng Anh',
      value: 'en',
    },
    {
      title: 'Tiếng Việt',
      value: 'vi',
    },
  ]
}
