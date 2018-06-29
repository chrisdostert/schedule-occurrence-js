const dayOfWeeks = require('./dayOfWeeks')
jest.mock('./dayOfWeeks', () => jest.fn())

const days = require('./days')
jest.mock('./days', () => jest.fn())

const objectUnderTest = require('./index')

describe('monthly', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  describe('monthly.days truthy', () => {
    it('should call days w/ expected args', async () => {
      /* arrange */
      const providedDateTime = 'providedDateTime'
      const providedMonthly = { days: 'days' }
      const providedInterval = 'providedInterval'

      /* act */
      await objectUnderTest(
        providedDateTime,
        providedMonthly,
        providedInterval
      )

      /* assert */
      expect(days)
        .toBeCalledWith(
          providedDateTime,
          providedMonthly.days,
          providedInterval
        )
    })
  })
  describe('monthly.dayOfWeeks truthy', () => {
    it('should call days w/ expected args', async () => {
      /* arrange */
      const providedDateTime = 'providedDateTime'
      const providedMonthly = { dayOfWeeks: 'dayOfWeeks' }
      const providedInterval = 'providedInterval'

      /* act */
      await objectUnderTest(
        providedDateTime,
        providedMonthly,
        providedInterval
      )

      /* assert */
      expect(dayOfWeeks)
        .toBeCalledWith(
          providedDateTime,
          providedMonthly.dayOfWeeks,
          providedInterval
        )
    })
  })
})
