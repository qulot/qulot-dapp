import Google from "@/components/button/Google.vue"

export default {
  title: 'button',
  component: Google,
  argTypes: {
    ['btn-class']: {
      control: 'text',
      defaultValue: 'text-sm'
    }
  }
}

export const GoogleButton = (arg, { argTypes }) => ({
  components: { Google },
  props: Object.keys(argTypes),
  template: '<Google v-bind="$props">Login with Google</Google>',
});