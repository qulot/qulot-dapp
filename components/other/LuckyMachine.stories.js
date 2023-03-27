import LuckyMachine from "@/components/other/LuckyMachine.vue"

export default {
  title: 'other',
  component: LuckyMachine,
  argTypes: {
    totalWinner: {
      control: 'number',
      defaultValue: Math.floor(Math.random() * 1000000000)
    },
    totalPlayer: {
      control: 'number',
      defaultValue: Math.floor(Math.random() * 1000000000)
    }
  }
}

export const LuckyMachineComponent = (arg, { argTypes }) => ({
  components: { LuckyMachine },
  props: Object.keys(argTypes),
  template: `<LuckyMachine v-bind="$props" />`,
});