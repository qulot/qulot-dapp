import Profile from "@/components/form/account/Profile.vue"

export default {
  title: 'form',
  component: Profile,
  argTypes: {
    errors: {
      control: 'array',
      defaultValue: []
    }
  }
}

export const ProfileForm = (arg, { argTypes }) => ({
  components: { Profile },
  props: Object.keys(argTypes),
  template: `<div class="w-96"><Profile v-bind="$props" /></div>`,
});
