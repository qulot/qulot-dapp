import { parseCookies, isMethod, H3Event } from 'h3'

interface VerifyRecaptchaResponse {
  success: boolean
  'error-codes': string[]
}

const siteVerifyEndpoint = 'https://www.google.com/recaptcha/api/siteverify'
const recaptchaCookieKey = '_GRECAPTCHA'

const { recaptcha } = useRuntimeConfig()

const verify = async (token: string) => {
  const response = await $fetch<VerifyRecaptchaResponse>(siteVerifyEndpoint, {
    method: 'GET',
    query: {
      secret: recaptcha.secretKey,
      response: token,
    },
  })

  return {
    success: response.success || false,
    errorCodes: response['error-codes'] || [],
  }
}

export default defineEventHandler(async (event: H3Event) => {
  if (!isMethod(event, 'POST')) {
    return
  }

  const cookies = parseCookies(event)
  if (cookies && cookies[recaptchaCookieKey]) {
    const verifyResult = await verify(cookies[recaptchaCookieKey])

    if (verifyResult.success) {
      event.context.recaptcha = {
        token: cookies[recaptchaCookieKey],
        verifyResult,
      }
    }
  }
})
