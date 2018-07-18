const dayOfWeek = require('./dayOfWeek')
jest.mock('./dayOfWeek', () => jest.fn())

const day = require('./day')
jest.mock('./day', () => jest.fn())

const objectUnderTest = require('./index')

describe('monthly', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  describe('monthly.day truthy', () => {
    it('should call day w/ expected args', async () => {
      /* arrange */
      const providedDateTime = 'providedDateTime'
      const providedMonthly = { day: 'day' }
      const providedInterval = 'providedInterval'

      /* act */
      await objectUnderTest(
        providedDateTime,
        providedMonthly,
        providedInterval
      )

      /* assert */
      expect(day)
        .toBeCalledWith(
          providedDateTime,
          providedMonthly.day,
          providedInterval
        )
    })
  })
  describe('monthly.dayOfWeek truthy', () => {
    it('should call day w/ expected args', async () => {
      /* arrange */
      const providedDateTime = 'providedDateTime'
      const providedMonthly = { dayOfWeek: 'dayOfWeek' }
      const providedInterval = 'providedInterval'

      /* act */
      await objectUnderTest(
        providedDateTime,
        providedMonthly,
        providedInterval
      )

      /* assert */
      expect(dayOfWeek)
        .toBeCalledWith(
          providedDateTime,
          providedMonthly.dayOfWeek,
          providedInterval
        )
    })
  })
})
