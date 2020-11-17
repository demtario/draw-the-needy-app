const getRandom = (max: number): number => Math.floor(Math.random() * max)

export const getRandomFromArray = <T extends Object>(array: T[]): T => {
  return array[getRandom(array.length)]
}
