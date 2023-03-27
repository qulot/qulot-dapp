import BNavbar from "@/components/menu/BNavbar.vue";

export default {
  title: "menu",
  component: BNavbar,
  argTypes: {},
};

export const NavMenuHeader = (arg, { argTypes }) => ({
  components: { BNavbar },
  props: Object.keys(argTypes),
  template: `<BNavbar v-bind="$props" />`,
});
