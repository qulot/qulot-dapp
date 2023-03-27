import BButton from "@/components/button/BButton.vue"
import { VARIANTS } from "@/const/theme"

export default {
  title: 'button',
  component: BButton,
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(VARIANTS),
      defaultValue: VARIANTS.primary
    }
  }
}

const TemplateIconSlot = (arg, { argTypes }) => ({
  components: { BButton },
  props: Object.keys(argTypes),
  template: `<BButton v-bind="$props" class="w-64">
    <ion-icon name="person-outline" size="small" />
    Helo QULOT
  </BButton>`,
});
const TemplateWithoutSlot = (arg, { argTypes }) => ({
  components: { BButton },
  props: Object.keys(argTypes),
  template: `<BButton v-bind="$props" class="w-64">
    Helo QULOT
  </BButton>`,
});


export const BButtonNormal = TemplateWithoutSlot.bind({});

export const BButtonDisable = TemplateWithoutSlot.bind({});
BButtonDisable.args = {
  disabled: true
}


export const BButtonIcon = TemplateIconSlot.bind({});


const TemplateButtonLink = (arg, { argTypes }) => ({
  components: { BButton },
  props: Object.keys(argTypes),
  template: `<BButton v-bind="$props" class="btn-link w-64">
    Helo QULOT
  </BButton>`,
});

export const BButtonLink = TemplateButtonLink.bind({});


const TemplateButtonGhost = (arg, { argTypes }) => ({
  components: { BButton },
  props: Object.keys(argTypes),
  template: `<BButton v-bind="$props" class="btn-ghost w-64">
    Helo QULOT
  </BButton>`,
});

export const BButtonGhost = TemplateButtonGhost.bind({});