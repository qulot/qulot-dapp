import Lang from "@/components/dropdown/Lang.vue"

export default {
  title: 'dropdown',
  component: Lang,
  argTypes: {
  }
}

export const Language = (arg, { argTypes }) => ({
  components: { Lang },
  props: Object.keys(argTypes),
  template: `<Lang />`,
});