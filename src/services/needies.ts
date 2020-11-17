import fs from 'fs'
import util from 'util'
import { weeksToMilisecs } from '../helpers/weeksToMilisecs'

import { GeneratedNeedy, Needy } from '../interfaces/Needy'
import { State } from '../interfaces/State'
import { getRandomFromArray } from '../helpers/random'

const readFile = util.promisify(fs.readFile)

const getAllNeedies = async (): Promise<Needy[]> => {
  const fileContent = await readFile(process.env.NEEDIES_FILE, 'utf8')
  return JSON.parse(fileContent).map((name) => ({ name }))
}

const getNeediesToUse = (generatedNeedies: GeneratedNeedy[], allNeedies: Needy[]): Needy[] => {
  const timeout = weeksToMilisecs(parseInt(process.env.NEEDY_TIMEOUT_WEEKS))
  const now = Date.now()

  return allNeedies.filter((needy: Needy): boolean => {
    const latestGenerated = generatedNeedies.find(({ name }) => name === needy.name)
    return latestGenerated ? now > latestGenerated.generatedAt + timeout : true
  })
}

export const mapNeedyToGeneratedNeedy = (needy: Needy): GeneratedNeedy => ({
  name: needy.name,
  generatedAt: Date.now(),
})

export const getRandomNeedy = async (state: State): Promise<GeneratedNeedy> => {
  const allNeedies = await getAllNeedies()
  const neediesToUse = getNeediesToUse(state.previouslyGenerated, allNeedies)

  if (neediesToUse.length === 0) throw new Error('There is no Needies to generate from!')

  const randomNeedy = getRandomFromArray(neediesToUse)

  return mapNeedyToGeneratedNeedy(randomNeedy)
}
