export const getRandomNumber = (max: number = 1): number => Math.floor(Math.random() * max)

export const getRandomFromArray = <T>(array: T[]): T => {
  return array[getRandomNumber(array.length)]
}
