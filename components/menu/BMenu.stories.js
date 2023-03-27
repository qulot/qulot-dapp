import BMenu from "@/components/menu/BMenu.vue"

export default {
  title: 'menu',
  component: BMenu,
  argTypes: {
    items: {
      type: Array
    },
  }
}

const Template = (arg, { argTypes }) => ({
  components: { BMenu },
  props: Object.keys(argTypes),
  template: `<BMenu v-bind="$props" />`,
});

export const BMenuNormal = Template.bind({});
BMenuNormal.args = {
  items: [
    {
      text: "Profile",
      href: "#",
      icon: '<ion-icon name="person-outline"/>',
    },
    {
      text: "Api Keys",
      icon: '<ion-icon name="cube-outline"/>',
    },
  ]
}

export const BMenuHorizontal = Template.bind({});
BMenuHorizontal.args = {
  horizontal: true,
  items: [
    {
      text: "Profile",
      href: "#",
      icon: '<ion-icon name="person-outline"/>',
    },
    {
      text: "Api Keys",
      icon: '<ion-icon name="cube-outline"/>',
    },
  ]
}

export const BMenuCompact = Template.bind({});
BMenuCompact.args = {
  compact: true,
  items: [
    {
      text: "Profile",
      href: "#",
      icon: '<ion-icon name="person-outline"/>',
    },
    {
      text: "Api Keys",
      icon: '<ion-icon name="cube-outline"/>',
    },
  ]
}


export const BMenuTitle = Template.bind({});
BMenuTitle.args = {
  items: [
    {
      title: "Accounts",
    },
    {
      text: "Profile",
      href: "#",
      icon: '<ion-icon name="person-outline"/>',
    },
    {
      text: "Api Keys",
      icon: '<ion-icon name="cube-outline"/>',
    },
  ]
}

export const BMenuActiveItem = Template.bind({});
BMenuActiveItem.args = {
  items: [
    {
      text: "Profile",
      href: "#",
      icon: '<ion-icon name="person-outline"/>',
    },
    {
      text: "Api Keys",
      active: true,
      icon: '<ion-icon name="cube-outline"/>',
    },
  ]
}

export const BMenuRounded = Template.bind({});
BMenuRounded.args = {
  rounded: true,
  items: [
    {
      text: "Profile",
      href: "#",
      icon: '<ion-icon name="person-outline"/>',
    },
    {
      text: "Api Keys",
      active: true,
      icon: '<ion-icon name="cube-outline"/>',
    },
  ]
}