import { EmailOptions } from '~~/types/email'

export const useEmail = () => {
  const send = async (options: EmailOptions) => {
    try {
      await $fetch('/api/send-email', { body: options, method: 'POST' })
    } catch (error) {
      throw new Error(error.response._data.statusMessage)
    }
  }

  return {
    send,
  }
}
