import { readBody, H3Event } from 'h3'
import { createTransport } from 'nodemailer'
import { defineRequireRecaptchaEventHandler } from '../defineRequireRecaptchaEventHandler '

const { mail } = useRuntimeConfig()
const transporter = createTransport(mail.smtp)

const handleSendMail = async (event: H3Event) => {
  const body = await readBody(event)
  const options = {
    ...mail.message,
    ...body,
  }
  try {
    const { response, messageId } = await transporter.sendMail(options)
    return {
      response,
      messageId,
    }
  } catch (error) {
    console.error('send mail request error: ', { options, error })
    throw createError({ statusCode: 500, statusMessage: error?.message })
  }
}

export default defineRequireRecaptchaEventHandler(handleSendMail)
