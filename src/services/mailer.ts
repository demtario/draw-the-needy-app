import { createTransport, Transporter } from 'nodemailer'

interface EmailParams {
  from: string
  to: string
  subject: string
  content: string
}

class Mailer {
  transporter: Transporter

  constructor(email: string, password: string, service: string = 'gmail') {
    this.transporter = createTransport({
      service,
      auth: {
        user: email,
        pass: password,
      },
    })
  }

  sendMail(email: EmailParams): Promise<void> {
    return this.transporter.sendMail({
      from: email.from,
      to: email.to,
      subject: email.subject,
      text: email.content,
      html: email.content,
    })
  }
}

export const createMailer = (email: string, password: string) => new Mailer(email, password)
