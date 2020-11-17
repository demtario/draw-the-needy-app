import fs from 'fs'
import util from 'util'
import { GeneratedNeedy } from '../interfaces/Needy'
import { State } from '../interfaces/State'

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const DEFAULT_DB_FILE = 'db.json'

const INITIAL_STATE: State = {
  lastGeneratedAt: 0,
  previouslyGenerated: [],
}

const initState = async (): Promise<State> => {
  try {
    await saveState(INITIAL_STATE)
  } catch (err) {
    console.error(err)
  } finally {
    return INITIAL_STATE
  }
}

export const saveState = async (newState: State): Promise<void> =>
  writeFile(process.env.DB_FILE || DEFAULT_DB_FILE, JSON.stringify(newState, null, 2), 'utf8')

export const saveGeneratedNeedyToState = async (
  currentState: State,
  generatedNeedy: GeneratedNeedy
): Promise<void> =>
  saveState({
    lastGeneratedAt: generatedNeedy.generatedAt,
    previouslyGenerated: [...currentState.previouslyGenerated, generatedNeedy],
  })

export const getState = async (): Promise<State> => {
  try {
    const fileContent = await readFile(process.env.DB_FILE || DEFAULT_DB_FILE, 'utf8')
    return JSON.parse(fileContent)
  } catch {
    return initState()
  }
}
