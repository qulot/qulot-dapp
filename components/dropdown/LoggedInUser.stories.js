import LoggedInUser from "@/components/dropdown/LoggedInUser.vue"
import User from "~/models/auth/user";

export default {
  title: 'dropdown',
  component: LoggedInUser,
  argTypes: {
    user: {
      control: { type: 'object' },
      defaultValue: new User({
        username: "user@123",
        firstName: "First",
        lastName: "Last Name",
        email: "user@gmail.com",
        picture: "https://gravatar.com/avatar/9107cb5473336ab6de024c2042700780?s=400&d=robohash&r=x"
      })
    }
  }
}

export const LoggedinUser = (arg, { argTypes }) => ({
  components: { LoggedInUser },
  props: Object.keys(argTypes),
  template: `<LoggedInUser v-bind="$props" />`,
});