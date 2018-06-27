const getNextDaily = require('./getNextDaily')
jest.mock('./getNextDaily', () => jest.fn())

const getNextHourly = require('./getNextHourly')
jest.mock('./getNextHourly', () => jest.fn())

const getNextMonthly = require('./getNextMonthly')
jest.mock('./getNextMonthly', () => jest.fn())

const getNextWeekly = require('./getNextWeekly')
jest.mock('./getNextWeekly', () => jest.fn())

const objectUnderTest = require('./index')

describe('next', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  describe('recurrence.daily truthy', () => {
    it('should call getNextDaily w/ expected args', async () => {
      /* arrange */
      const providedTimeZoneId = 'providedTimeZoneId'
      const providedStartDateTime = 'providedStartDateTime'
      const providedRecurrence = {
        daily: {},
        interval: 'interval'
      }

      /* act */
      await objectUnderTest(
        providedTimeZoneId,
        providedStartDateTime,
        providedRecurrence
      )

      /* assert */
      expect(getNextDaily)
        .toBeCalledWith(
          providedTimeZoneId,
          providedStartDateTime,
          providedRecurrence.interval
        )
    })
  })
  describe('recurrence.hourly truthy', () => {
    it('should call getNextHourly w/ expected args', async () => {
      /* arrange */
      const providedTimeZoneId = 'providedTimeZoneId'
      const providedStartDateTime = 'providedStartDateTime'
      const providedRecurrence = {
        hourly: {},
        interval: 'interval'
      }

      /* act */
      await objectUnderTest(
        providedTimeZoneId,
        providedStartDateTime,
        providedRecurrence
      )

      /* assert */
      expect(getNextHourly)
        .toBeCalledWith(
          providedTimeZoneId,
          providedStartDateTime,
          providedRecurrence.interval
        )
    })
  })
  describe('recurrence.monthly truthy', () => {
    it('should call getNextMonthly w/ expected args', async () => {
      /* arrange */
      const providedTimeZoneId = 'providedTimeZoneId'
      const providedStartDateTime = 'providedStartDateTime'
      const providedRecurrence = {
        monthly: 'monthly',
        interval: 'interval'
      }

      /* act */
      await objectUnderTest(
        providedTimeZoneId,
        providedStartDateTime,
        providedRecurrence
      )

      /* assert */
      expect(getNextMonthly)
        .toBeCalledWith(
          providedTimeZoneId,
          providedStartDateTime,
          providedRecurrence.monthly,
          providedRecurrence.interval
        )
    })
  })
  describe('recurrence.weekly truthy', () => {
    it('should call getNextWeekly w/ expected args', async () => {
      /* arrange */
      const providedTimeZoneId = 'providedTimeZoneId'
      const providedStartDateTime = 'providedStartDateTime'
      const providedRecurrence = {
        weekly: 'weekly',
        interval: 'interval'
      }

      /* act */
      await objectUnderTest(
        providedTimeZoneId,
        providedStartDateTime,
        providedRecurrence
      )

      /* assert */
      expect(getNextWeekly)
        .toBeCalledWith(
          providedTimeZoneId,
          providedStartDateTime,
          providedRecurrence.weekly,
          providedRecurrence.interval
        )
    })
  })
  describe('unexpected recurrence', () => {
    it('should throw expected error', async () => {
      /* arrange */
      const providedRecurrence = {}

      /* act */
      let actualError
      try {
        await objectUnderTest(
          'providedTimeZoneId',
          'providedStartDateTime',
          providedRecurrence
        )
      } catch (error) {
        actualError = error
      }

      /* assert */
      expect(actualError)
        .toEqual(
          new Error(`unexpected recurrence ${JSON.stringify(providedRecurrence)}`)
        )
    })
  })
})
