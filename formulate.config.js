import { en, vi } from "@braid/vue-formulate-i18n";

// default css
const HELP_CSS = ["text-[11px]", "text-subtitle", "mt-2"];
const MESSAGE_CSS = ["text-error", "text-xs", "mt-2"];
const LABEL_CSS = ["mb-2", "text-[17px]", "font-bold", "inline-block", "text-label"];
const OUTER_CSS = [];
const INPUT_CSS = ["input border border-solid rounded-lg text-sm placeholder:text-disable outline-none focus:outline-none w-full bg-transparent"];
const ERROR_CSS = ["text-error", "text-xs", "mt-2"];

// check box css
const CHECKBOX_LABEL_CSS = [
  "ml-2",
  "mb-3",
  "label-text",
  "text-sm",
];
const CHECKBOX_LEGEND_CSS = ["px-1"];
const CHECKBOX_FIELDSET_CSS = ["card", "card-bordered", "border-accent", "p-2"];
const CHECKBOX_WRAPPER_CSS = [
  "cursor-pointer",
  "flex",
  "items-center",
];
const CHECKBOX_INNER_CSS = ["inline"];
const CHECKBOX_INPUT_CSS = ["checkbox"];
const SELECT_CSS = ['select border border-solid border-default rounded text-sm !font-normal text-title !bg-transparent py-0 pl-4 pr-9 !h-8 !min-h-min']

// button css
const BUTTON_INPUT_CSS = ["btn", "btn-primary"];

// phone number css
const PHONENUMBER_INPUT_CSS = ["!input", "!input-bordered", "w-full", "!pl-0", '!bg-transparent'];

// form error css
const FORM_ERROR_CSS = [...ERROR_CSS];

export default {
  plugins: [en, vi],
  locale: "en",
  library: {
    phonenumber: {
      classification: "text",
      component: "PhoneNumberInput",
    },
    datetime: {
      classification: "text",
      component: 'DateTimeInput'
    }
  },
  validationNameStrategy: ['validationName', 'label', 'name', 'type'],
  rules: {
    phonenumber: ({ value }) => /^\+(?:[0-9] ?){6,14}[0-9]$/.test(value),
  },
  classes: {
    help: HELP_CSS.join(" "),
    message: MESSAGE_CSS.join(" "),
    label(context) {
      switch (context.type) {
        case "checkbox":
          return CHECKBOX_LABEL_CSS.join(" ");
      }
      return LABEL_CSS.join(" ");
    },
    legend(context) {
      switch (context.type) {
        case "checkbox":
          return CHECKBOX_LEGEND_CSS.join(" ");
      }
    },
    fieldset(context) {
      switch (context.type) {
        case "checkbox":
          return CHECKBOX_FIELDSET_CSS.join(" ");
      }
    },
    wrapper(context) {
      switch (context.type) {
        case "checkbox":
          return CHECKBOX_WRAPPER_CSS.join(" ");
      }
    },
    outer: OUTER_CSS.join(" "),
    inner(context) {
      switch (context.type) {
        case "checkbox":
          return CHECKBOX_INNER_CSS.join(" ");
      }
    },
    input(context) {
      switch (context.type) {
        case "select":
          return SELECT_CSS.join(" ");
        case "button":
          return BUTTON_INPUT_CSS.join(" ");
        case "checkbox":
          return CHECKBOX_INPUT_CSS.join(" ");
        case "datetime":
          return INPUT_CSS.concat([
            'border-line'
          ])
        case "phonenumber":
          if (context.hasErrors) {
            return PHONENUMBER_INPUT_CSS.concat([
              '!border-error'
            ]).join(" ")
          } else {
            return PHONENUMBER_INPUT_CSS.concat([
              '!border-line'
            ]).join(" ")
          }
        default:
          if (context.hasErrors) {
            return INPUT_CSS.concat([
              '!border-error'
            ])
          } else {
            return INPUT_CSS.concat([
              'border-line'
            ])
          }
      }
    },
    error: ERROR_CSS.join(" "),
    formError: FORM_ERROR_CSS.join(" "),
  },
};
