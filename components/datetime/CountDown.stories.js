import CountDown from "@/components/datetime/CountDown.vue"

export default {
  title: 'datetime',
  component: CountDown,
  argTypes: {
    target: {
      control: { type: 'date' },
      defaultValue: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    }
  }
}

export const Countdown = (arg, { argTypes }) => ({
  components: { CountDown },
  props: Object.keys(argTypes),
  template: `<CountDown :target="new Date($props.target)" />`,
});