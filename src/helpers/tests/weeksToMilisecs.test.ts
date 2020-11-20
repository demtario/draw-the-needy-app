import { weeksToMilisecs } from '../weeksToMilisecs'

describe('weeks to miliseconds converter', () => {
  test('should convert number of weeks to miliseconds', () => {
    expect(weeksToMilisecs(1)).toBe(604800000)
  })

  test('should convert negative number of weeks to miliseconds', () => {
    expect(weeksToMilisecs(1)).toBe(604800000)
  })

  test('should return Infinity', () => {
    expect(weeksToMilisecs(Infinity)).toBe(Infinity)
  })
})
