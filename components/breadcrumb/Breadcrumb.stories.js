import Breadcrumb from "@/components/breadcrumb/Breadcrumb.vue"

export default {
  title: 'Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    list: {
      type: Array
    },
  }
}

const Template = (arg, { argTypes }) => ({
  components: { Breadcrumb },
  props: Object.keys(argTypes),
  template: `<Breadcrumb v-bind="$props" />`,
});

export const Default = Template.bind({});
Default.args = {
  list: [
    {
      name: "Profile",
      url: "#item-1"
    },
    {
      name: "Profile 2",
      url: "#item-2"
    },
  ]
}
