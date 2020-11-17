import fs from 'fs'
import util from 'util'

const readFile = util.promisify(fs.readFile)

interface Target {
  name: string
  email: string
}

const transformTargets = (targets: Target[]): string =>
  targets.map((target) => `${target.name} <${target.email}>`).join(', ')

const readTargets = async (): Promise<Target[]> => {
  const fileContent = await readFile(process.env.TARGETS_FILE, 'utf8')
  return JSON.parse(fileContent)
}

export const getEmailTarget = async (): Promise<string> => {
  const targets = await readTargets()
  return transformTargets(targets)
}
