import { EventHandler } from 'h3'

export const defineRequireRecaptchaEventHandler = <T>(
  handler: EventHandler<T>
): EventHandler<T> => {
  handler.__is_handler__ = true

  return eventHandler((event) => {
    const recaptcha = event.context.recaptcha

    if (!recaptcha || !recaptcha.verifyResult.success) {
      throw createError({ statusCode: 401, statusMessage: 'Unauthenticated' })
    }

    return handler(event)
  })
}
