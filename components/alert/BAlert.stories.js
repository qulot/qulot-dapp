import BAlert from "@/components/alert/BAlert.vue"
import BButton from "@/components/button/BButton.vue";
import { VARIANTS } from "@/const/theme";

export default {
  title: 'alert',
  component: BAlert,
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(VARIANTS)
    }
  }
}

const TemplateWithoutSlot = (arg, { argTypes }) => ({
  components: { BAlert },
  props: Object.keys(argTypes),
  template: `<BAlert v-bind="$props" />`,
});

export const BAlertSuccess = TemplateWithoutSlot.bind({});
BAlertSuccess.args = {
  variant: 'success',
  text: 'Your purchase has been confirmed!'
}

export const BAlertInfo = TemplateWithoutSlot.bind({});
BAlertInfo.args = {
  variant: 'info',
  text: 'New software update available.'
}

export const BAlertWarning = TemplateWithoutSlot.bind({});
BAlertWarning.args = {
  variant: 'warning',
  text: 'Warning: Invalid email address!'
}

export const BAlertError = TemplateWithoutSlot.bind({});
BAlertError.args = {
  variant: 'error',
  text: 'Error! Task failed successfully.'
}

const TemplatetSlot = (arg, { argTypes }) => ({
  components: { BAlert, BButton },
  props: Object.keys(argTypes),
  template: `<BAlert v-bind="$props"> 
    <template slot="buttons">
      <BButton variant="primary">Accept</BButton>
    </template>
  </BAlert>`,
});

export const BAlertButton = TemplatetSlot.bind({});
BAlertButton.args = {
  variant: 'info',
  text: 'We use cookies for no reason.'
}