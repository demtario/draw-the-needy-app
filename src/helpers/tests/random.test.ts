import { getRandomFromArray, getRandomNumber } from '../random'

describe('random number generator', () => {
  test('should return number', () => {
    expect(typeof getRandomNumber()).toBe('number')
  })
})

describe('random item from array picker', () => {
  test('should one item from array', () => {
    const array = [1, 2, 3]

    const randomItem = getRandomFromArray(array)
    expect(array.find((item) => item === randomItem)).toBeTruthy()
  })
})
