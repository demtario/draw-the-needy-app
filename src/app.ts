import chalk from 'chalk'

import { createMailer, sendEmail } from './services/mailer'
import { getRandomNeedy } from './services/needies'
import { getState, saveGeneratedNeedyToState } from './services/state'
import { getEmailTargets } from './services/emailTargets'

require('dotenv').config()

const main = async (): Promise<void> => {
  if (process.env.DEBUG) {
    console.log(
      chalk.bold(chalk.red('App started in debug mode!')),
      "No email will be sent, and generated Needy won't be saved to DB"
    )
  }

  const state = await getState()
  const generatedNeedy = await getRandomNeedy(state)

  console.log(
    '🥳',
    chalk.green(chalk.bold(generatedNeedy.name)),
    'is a Needy of the following week!'
  )

  if (process.env.DEBUG) return

  const mailer = createMailer(process.env.MAIL_USERNAME, process.env.MAIL_PASSWORD)
  sendEmail(mailer)({
    from: `DrawTheNeedyApp <${process.env.MAIL_USERNAME}>`,
    to: await getEmailTargets(),
    subject: `🥳 ${generatedNeedy.name} is a Needy of the following week!`,
    content: `
      <h1>Greetings fellow friend!</h1>
      <p>🥳 &nbsp;<b>${generatedNeedy.name}</b> is a Needy of the following week!</p>
      <p>See ya next time!</p>
      <hr />
      <small>This email was sent to you, because Jan Tobolewski added your email to this notification, contact him if you don't want to hear about it</small>
      `,
  })
  console.log(chalk.blue('Email was sent!'))

  await saveGeneratedNeedyToState(state, generatedNeedy)
}

main()
