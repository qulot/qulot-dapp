// formkit.config.ts
import { en, vi } from '@formkit/i18n'
import { DefaultConfigOptions } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'
import { genesisIcons } from '@formkit/icons'

const config: DefaultConfigOptions = {
  locales: { en, vi },
  locale: 'en',
  icons: {
    // include supporting icons from @formkit/icons
    ...genesisIcons,
  },
  config: {
    classes: generateClasses({
      global: {
        fieldset: 'border rounded px-2 pb-1',
        help: 'text-[14px] text-subtitle',
        inner: `
          formkit-disabled:bg-gray-200 
          formkit-disabled:cursor-not-allowed 
          formkit-disabled:pointer-events-none 
          `,
        input:
          'appearance-none bg-transparent focus:outline-none focus:ring-0 focus:shadow-none',
        label: 'block mb-2 font-bold text-[17px] text-label',
        legend: 'font-bold text-sm',
        loaderIcon: 'inline-flex items-center w-4 text-gray-600 animate-spin',
        message: 'text-error mb-2 text-xs',
        messages: 'list-none p-0 mt-2 mb-0',
        outer: 'formkit-disabled:opacity-50',
        prefixIcon: `
          w-10 
          flex 
          self-stretch 
          grow-0 
          shrink-0 
          rounded-tl 
          rounded-bl 
          to-gray-200 
          [&>svg]:w-full 
          [&>svg]:max-w-[1em] 
          [&>svg]:max-h-[1em] 
          [&>svg]:m-auto`,
        suffixIcon: `
          pr-3 
          p-3 
          flex 
          self-stretch 
          grow-0 
          shrink-0 
          [&>svg]:w-full 
          [&>svg]:max-w-[1em] 
          [&>svg]:max-h-[1em] 
          [&>svg]:m-auto
          text-content`,
      },

      // Family styles apply to all inputs that share a common family
      'family:box': {
        decorator: `
          block 
          relative 
          h-4 
          w-4 
          mr-2 
          rounded 
          bg-white 
          bg-gradient-to-b 
          from-transparent 
          to-gray-200 
          ring-1 
          ring-disable 
          peer-checked:ring-main 
          text-transparent 
          peer-checked:text-main`,
        decoratorIcon: `
          flex 
          p-[2px] 
          w-full 
          h-full 
          absolute 
          top-1/2 
          left-1/2 
          -translate-y-1/2 
          -translate-x-1/2`,
        help: 'mb-2 mt-1.5',
        input:
          'absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none peer',
        inner: '$remove:formkit-disabled:bg-gray-200',
        label: '$reset text-[14px] text-black mt-1 select-none',
        wrapper: 'flex items-center mb-1',
      },
      'family:text': {
        inner: `
          flex 
          items-center 
          ring-1 
          ring-disable 
          focus-within:ring-main 
          focus-within:ring-2 
          [&>label:first-child]:focus-within:text-blue-500
          rounded-lg
          overflow-hidden
          mb-1`,
        input: `
          w-full 
          px-3 
          py-2 
          border-none 
          text-base
          text-sm
          dark:text-white
          placeholder-[#A8A8A8]
          h-[3rem]`,
      },
      'family:date': {
        inner: `
          flex 
          items-center 
          ring-1 
          ring-disable 
          focus-within:ring-main 
          focus-within:ring-2 
          [&>label:first-child]:focus-within:text-blue-500 
          rounded mb-1`,
        input: `
          w-full 
          px-3 
          py-2 
          border-none 
          text-gray-700 
          placeholder-[#A8A8A8]`,
      },
      select: {
        inner: `
          flex 
          relative
          items-center 
          rounded-lg 
          mb-1 
          ring-1 
          ring-disable 
          focus-within:ring-main 
          focus-within:ring-2 
          [&>span:first-child]:focus-within:text-blue-500`,
        input: `
          w-full 
          h-[3rem]
          pl-3 
          pr-8 
          py-2 
          border-none 
          text-base 
          dark:text-white
          formkit-multiple:p-0 
          data-[placeholder="true"]:text-[#A8A8A8] 
          formkit-multiple:data-[placeholder="true"]:text-inherit`,
        selectIcon: `
          flex 
          p-[3px] 
          shrink-0 
          w-5 
          mr-2 
          -ml-[1.5em] 
          h-full 
          pointer-events-none 
          [&>svg]:w-[1em]
          text-content`,
        option: `
          formkit-multiple:p-3 
          formkit-multiple:text-sm 
          text-gray-700`,
      },
      textarea: {
        inner: `
          flex 
          rounded 
          mb-1 
          ring-1 
          ring-disable 
          focus-within:ring-main 
          [&>label:first-child]:focus-within:text-blue-500`,
        input: `
          block 
          w-full 
          h-32 
          px-3 
          py-3 
          border-none 
          text-base 
          dark:text-white 
          placeholder-[#A8A8A8] 
          focus:shadow-outline`,
      },
    }),
  },
}
export default config
