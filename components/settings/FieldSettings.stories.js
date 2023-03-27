import FieldSetting from "@/components/settings/FieldSetting.vue"
import SwitchBox from "@/components/input/SwitchBox.vue"

export default {
  title: 'settings',
  component: [FieldSetting, SwitchBox],
  argTypes: {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
  }
}

const Template = (arg, { argTypes }) => ({
  components: { FieldSetting, SwitchBox },
  props: Object.keys(argTypes),
  template: `<FieldSetting v-bind="$props" class="w-96"><SwitchBox /></FieldSetting>`,
});

export const FieldSettingDefault = Template.bind({});
FieldSettingDefault.args = {
  name: 'Ngôn ngữ thông báo',
  description: 'Cài đặt ngôn ngữ thông báo qua email và ứng dụng'
}
