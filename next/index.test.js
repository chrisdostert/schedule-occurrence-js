const daily = require('./daily')
jest.mock('./daily', () => jest.fn())

const hourly = require('./hourly')
jest.mock('./hourly', () => jest.fn())

const monthly = require('./monthly')
jest.mock('./monthly', () => jest.fn())

const weekly = require('./weekly')
jest.mock('./weekly', () => jest.fn())

const {DateTime} = require('luxon')

const objectUnderTest = require('./index')

describe('next', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  describe('recurrence.daily truthy', () => {
    it('should call daily w/ expected args', async () => {
      /* arrange */
      const providedTimeZoneId = 'America/Los_Angeles'
      const providedStartDateTime = '2018-01-01T01:01:01'
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
      expect(daily)
        .toBeCalledWith(
          DateTime.fromISO(providedStartDateTime, {zone: providedTimeZoneId}),
          providedRecurrence.interval
        )
    })
  })
  describe('recurrence.hourly truthy', () => {
    it('should call hourly w/ expected args', async () => {
      /* arrange */
      const providedTimeZoneId = 'America/Los_Angeles'
      const providedStartDateTime = '2018-01-01T01:01:01'
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
      expect(hourly)
        .toBeCalledWith(
          DateTime.fromISO(providedStartDateTime, {zone: providedTimeZoneId}),
          providedRecurrence.interval
        )
    })
  })
  describe('recurrence.monthly truthy', () => {
    it('should call monthly w/ expected args', async () => {
      /* arrange */
      const providedTimeZoneId = 'America/Los_Angeles'
      const providedStartDateTime = '2018-01-01T01:01:01'
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
      expect(monthly)
        .toBeCalledWith(
          DateTime.fromISO(providedStartDateTime, {zone: providedTimeZoneId}),
          providedRecurrence.monthly,
          providedRecurrence.interval
        )
    })
  })
  describe('recurrence.weekly truthy', () => {
    it('should call weekly w/ expected args', async () => {
      /* arrange */
      const providedTimeZoneId = 'America/Los_Angeles'
      const providedStartDateTime = '2018-01-01T01:01:01'
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
      expect(weekly)
        .toBeCalledWith(
          DateTime.fromISO(providedStartDateTime, {zone: providedTimeZoneId}),
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
