import fs from 'fs'
import util from 'util'

const readFile = util.promisify(fs.readFile)

interface EmailTarget {
  name: string
  email: string
}

const transformEmailTargetToString = (targets: EmailTarget[]): string =>
  targets.map((target) => `${target.name} <${target.email}>`).join(', ')

const readEmailTargets = async (): Promise<EmailTarget[]> => {
  const fileContent = await readFile(process.env.TARGETS_FILE, 'utf8')
  return JSON.parse(fileContent)
}

export const getEmailTargets = async (): Promise<string> => {
  const targets = await readEmailTargets()
  return transformEmailTargetToString(targets)
}
