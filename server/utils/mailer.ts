import nodemailer from 'nodemailer'

type EmailProvider = 'mailtrap' | 'brevo' | 'mailgun'

// Get the current email provider from env (defaults to mailtrap for development)
const MAIL_PROVIDER = (process.env.MAIL_PROVIDER || 'mailtrap') as EmailProvider

// Configure transporters for different providers
const transporters = {
  mailtrap: nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  }),

  brevo: nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.BREVO_KEY
    }
  }),

  mailgun: nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    auth: {
      user: process.env.MAILGUN_USER,
      pass: process.env.MAILGUN_PASS
    }
  })
}

interface EmailData {
  from: string
  name: string
  subject: string
  message: string
}

export const sendEmail = async (data: EmailData) => {
  const { from, name, subject, message } = data
  
  // Get the appropriate transporter
  const transporter = transporters[MAIL_PROVIDER]
  
  if (!transporter) {
    throw new Error(`Invalid email provider: ${MAIL_PROVIDER}`)
  }

  const mailOptions = {
    from: `"${name}" <${from}>`,
    to: process.env.MAIL_TO || "support@wanderheat.com",
    subject: subject,
    text: message,
    html: `
      <div>
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${from})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <div style="margin-top: 20px;">
          <strong>Message:</strong>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      </div>
    `
  }

  try {
    console.log(`Sending email using ${MAIL_PROVIDER} provider`)
    const info = await transporter.sendMail(mailOptions)
    console.log('Message sent: %s', info.messageId)
    return info
  } catch (error) {
    console.error(`Error sending email with ${MAIL_PROVIDER}:`, error)
    throw error
  }
} 