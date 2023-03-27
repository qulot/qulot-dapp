import Theme from "@/components/switcher/Theme.vue"

export default {
  title: 'switcher',
  component: Theme,
  argTypes: {
  }
}

export const theme = (arg, { argTypes }) => ({
  components: { Theme },
  props: Object.keys(argTypes),
  template: `<Theme />`,
});