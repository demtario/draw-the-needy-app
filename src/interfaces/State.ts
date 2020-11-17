import { GeneratedNeedy } from './Needy'

export interface State {
  lastGeneratedAt: number
  previouslyGenerated: GeneratedNeedy[]
}
