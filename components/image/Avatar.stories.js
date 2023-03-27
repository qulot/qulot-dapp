import Avatar from "@/components/image/Avatar.vue"

export default {
  title: 'image',
  component: Avatar,
  argTypes: {
    type: {
      control: 'text',
      defaultValue: 'rounded-full'
    },
    src: {
      control: 'text',
    },
    sizeClass: {
      control: 'text',
    },
    border: {
      control: 'select',
      options: ['primary', 'error',],
    },
    text: {
      control: 'text',
    }
  }
}

const Template = (arg, { argTypes }) => ({
  components: { Avatar },
  props: Object.keys(argTypes),
  template: `<Avatar v-bind="$props">
    <template slot="default">
      <ion-icon name="person-outline" size="large" />
    </template>
  </Avatar>`,
});

export const AvatarDefaultSlot = Template.bind({});
AvatarDefaultSlot.args = {
  size: "40px"
}

export const AvatarUrl = Template.bind({});
AvatarUrl.args = {
  size: "40px",
  src: "https://gravatar.com/avatar/9107cb5473336ab6de024c2042700780?s=400&d=robohash&r=x"
}

export const AvatarBorder = Template.bind({});
AvatarBorder.args = {
  size: "40px",
  border: "primary"
}

export const AvatarText = Template.bind({});
AvatarText.args = {
  size: "40px",
  text: "NA"
}