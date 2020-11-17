import nodemailer, { Transporter } from 'nodemailer'

interface Email {
  from: string
  to: string
  subject: string
  content: string
}

export const createMailer = (email: string, password: string): Transporter =>
  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password,
    },
  })

export const sendEmail = (mailer: Transporter) => async (email: Email): Promise<void> =>
  mailer.sendMail({
    from: email.from,
    to: email.to,
    subject: email.subject,
    text: email.content,
    html: email.content,
  })
