import BCard from "@/components/card/BCard.vue"

export default {
  title: 'card',
  component: BCard,
  argTypes: {
    title: {
      control: { type: 'text' },
      defaultValue: "Hello QULOT!",
    },
  }
}

const TemplateWithoutSlot = (arg, { argTypes }) => ({
  components: { BCard },
  props: Object.keys(argTypes),
  template: `<BCard v-bind="$props"/>`,
});

const TemplateBodySlot = (arg, { argTypes }) => ({
  components: { BCard },
  props: Object.keys(argTypes),
  template: `<BCard v-bind="$props"> 
    <p>If a dog chews shoes whose shoes does he choose?</p>
  </BCard>`,
});

const TemplateActionSlot = (arg, { argTypes }) => ({
  components: { BCard },
  props: Object.keys(argTypes),
  template: `<BCard v-bind="$props"> 
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <template slot="actions">
      <button type="submit" class="btn btn-primary">OK</button>
    </template>
  </BCard>`,
});

export const BCardTitle = TemplateWithoutSlot.bind({});
BCardTitle.args = {
  cardTitle: true,
}

export const BCardBody = TemplateBodySlot.bind({});
BCardBody.args = {
  cardTitle: true,
  cardBody: true,
  cardShadow: true,
  cardBorder: true
}

export const BCardAction = TemplateActionSlot.bind({});
BCardAction.args = {
  cardTitle: true,
  cardBody: true,
  cardShadow: true,
  cardBorder: true
}