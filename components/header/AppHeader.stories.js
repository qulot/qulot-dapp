import AppHeader from "@/components/header/AppHeader.vue"

export default {
  title: 'header',
  component: AppHeader,
  parameters: {
    layout : 'padded'
  },
  argTypes: {
  }
}

export const AppHeaderBase = (arg, { argTypes }) => ({
  components: { AppHeader },
  props: Object.keys(argTypes),
  template: `<AppHeader class="w-full" />`,
});