const dayOfWeeks = require('./dayOfWeeks')
jest.mock('./dayOfWeeks', () => jest.fn())

const days = require('./days')
jest.mock('./days', () => jest.fn())

const objectUnderTest = require('./index')

describe('getNextMonthly', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  describe('monthly.days truthy', () => {
    it('should call days w/ expected args', async () => {
      /* arrange */
      const providedTimeZoneId = 'providedTimeZoneId'
      const providedStartDateTime = 'providedStartDateTime'
      const providedMonthly = { days: 'days' }
      const providedInterval = 'providedInterval'

      /* act */
      await objectUnderTest(
        providedTimeZoneId,
        providedStartDateTime,
        providedMonthly,
        providedInterval
      )

      /* assert */
      expect(days)
        .toBeCalledWith(
          providedTimeZoneId,
          providedStartDateTime,
          providedMonthly.days,
          providedInterval
        )
    })
  })
  describe('monthly.dayOfWeeks truthy', () => {
    it('should call days w/ expected args', async () => {
      /* arrange */
      const providedTimeZoneId = 'providedTimeZoneId'
      const providedStartDateTime = 'providedStartDateTime'
      const providedMonthly = { dayOfWeeks: 'dayOfWeeks' }
      const providedInterval = 'providedInterval'

      /* act */
      await objectUnderTest(
        providedTimeZoneId,
        providedStartDateTime,
        providedMonthly,
        providedInterval
      )

      /* assert */
      expect(dayOfWeeks)
        .toBeCalledWith(
          providedTimeZoneId,
          providedStartDateTime,
          providedMonthly.dayOfWeeks,
          providedInterval
        )
    })
  })
})
