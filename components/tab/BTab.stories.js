import BTab from "@/components/tab/BTab.vue"

export default {
  title: 'tab',
  component: BTab,
  argTypes: {
    items: {
      type: Array
    },
  }
}

const Template = (arg, { argTypes }) => ({
  components: { BTab },
  props: Object.keys(argTypes),
  template: `<BTab v-bind="$props" />`,
});

export const BTabNormal = Template.bind({});
BTabNormal.args = {
  autoActive: false,
  items: [
    {
      text: "Profile",
      active: true
    },
    {
      text: "Api Keys",
    },
  ]
}

export const BTabLink = Template.bind({});
BTabLink.args = {
  autoActive: true,
  items: [
    {
      text: "Profile",
      href: "#item-1"
    },
    {
      text: "Api Keys",
      href: "#item-2"
    },
  ]
}