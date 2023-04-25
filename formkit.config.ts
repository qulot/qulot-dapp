// formkit.config.ts
import { en, vi } from '@formkit/i18n'
import { DefaultConfigOptions } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'

// default css
const OUTER_CSS = [] as string[]
const HELP_CSS = ['text-[11px]', 'text-subtitle', 'mt-2']
const MESSAGE_CSS = ['text-error', 'text-xs', 'mt-2']
const LABEL_CSS = [
  'mb-2',
  'text-[17px]',
  'font-bold',
  'inline-block',
  'text-label',
]
const INPUT_CSS = [
  'input border border-solid rounded-lg text-sm placeholder:text-disable outline-none focus:outline-none w-full bg-transparent',
]
const ERROR_CSS = ['text-error', 'text-xs', 'mt-2']

// check box css
const CHECKBOX_LABEL_CSS = ['ml-2', 'mb-3', 'label-text', 'text-sm']
const CHECKBOX_LEGEND_CSS = ['px-1']
const CHECKBOX_FIELDSET_CSS = ['card', 'card-bordered', 'border-accent', 'p-2']
const CHECKBOX_WRAPPER_CSS = ['cursor-pointer', 'flex', 'items-center']
const CHECKBOX_INNER_CSS = ['inline']
const CHECKBOX_INPUT_CSS = ['checkbox']
const SELECT_CSS = [
  'select border border-solid border-default rounded text-sm !font-normal text-title !bg-transparent py-0 pl-4 pr-9 !h-8 !min-h-min',
]

// button css
const BUTTON_INPUT_CSS = ['btn', 'btn-primary']

// form error css
const FORM_ERROR_CSS = [...ERROR_CSS]

function join(classes: string[]) {
  return classes.join(' ')
}

const config: DefaultConfigOptions = {
  locales: { en, vi },
  locale: 'en',
  config: {
    classes: generateClasses({
      global: {
        outer: join(OUTER_CSS),
        label: join(LABEL_CSS),
        help: join(HELP_CSS),
        message: join(MESSAGE_CSS),
        error: join(ERROR_CSS),
        input: join([...INPUT_CSS, 'border-line']),
        formError: join(FORM_ERROR_CSS),
        inner: 'relative',
      },
      select: {
        input: join(SELECT_CSS),
      },
      button: {
        input: join(BUTTON_INPUT_CSS),
      },
      checkbox: {
        input: join(CHECKBOX_INPUT_CSS),
        inner: join(CHECKBOX_INNER_CSS),
        wrapper: join(CHECKBOX_WRAPPER_CSS),
        fieldset: join(CHECKBOX_FIELDSET_CSS),
        legend: join(CHECKBOX_LEGEND_CSS),
        label: join(CHECKBOX_LABEL_CSS),
      },
      date: {
        input: join([...INPUT_CSS, 'border-line']),
      },
    }),
  },
}
export default config
