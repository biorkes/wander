import { H3Event } from 'h3'
import { sendEmail } from '../utils/mailer'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = await readBody(event)
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      throw createError({
        statusCode: 400,
        message: 'All fields are required'
      })
    }

    // Send email using Mailtrap
    await sendEmail({
      from: email,
      name: name,
      subject: subject,
      message: message
    })

    return {
      status: 'success',
      message: 'Message sent successfully'
    }
  } catch (error) {
    console.error('Error in contact API:', error)
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Failed to send message'
    })
  }
}) 