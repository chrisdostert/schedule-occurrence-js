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
  describe('recurrence falsy', () => {
    it('should return expected result', () => {
      /* arrange */
      const providedTimeZoneId = 'America/Los_Angeles'
      const providedStartDateTime = '2018-01-01T01:01:01'

      const expectedResult = DateTime
        .fromISO(
          providedStartDateTime,
          {zone: providedTimeZoneId}
        )
        .toJSDate()

      /* act */
      const actualResult = objectUnderTest(
        providedTimeZoneId,
        providedStartDateTime
      )

      /* assert */
      expect(actualResult)
        .toEqual(expectedResult)
    })
  })
  describe('previous falsy', () => {
    it('should return expected result', () => {
      /* arrange */
      const providedTimeZoneId = 'America/Los_Angeles'
      const providedStartDateTime = '2018-01-01T01:01:01'

      const expectedResult = DateTime
        .fromISO(
          providedStartDateTime,
          {zone: providedTimeZoneId}
        )
        .toJSDate()

      /* act */
      const actualResult = objectUnderTest(
        providedTimeZoneId,
        providedStartDateTime,
        'recurrence'
      )

      /* assert */
      expect(actualResult)
        .toEqual(expectedResult)
    })
  })
  describe('recurrence.daily truthy', () => {
    it('should call daily w/ expected args', () => {
      /* arrange */
      const providedTimeZoneId = 'America/Los_Angeles'
      const providedStartDateTime = '2018-01-01T01:01:01'
      const providedRecurrence = {
        daily: {},
        interval: 'interval'
      }

      /* act */
      objectUnderTest(
        providedTimeZoneId,
        providedStartDateTime,
        providedRecurrence,
        'providedPrevious'
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
    it('should call hourly w/ expected args', () => {
      /* arrange */
      const providedTimeZoneId = 'America/Los_Angeles'
      const providedStartDateTime = '2018-01-01T01:01:01'
      const providedRecurrence = {
        hourly: {},
        interval: 'interval'
      }

      /* act */
      objectUnderTest(
        providedTimeZoneId,
        providedStartDateTime,
        providedRecurrence,
        'providedPrevious'
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
    it('should call monthly w/ expected args', () => {
      /* arrange */
      const providedTimeZoneId = 'America/Los_Angeles'
      const providedStartDateTime = '2018-01-01T01:01:01'
      const providedRecurrence = {
        monthly: 'monthly',
        interval: 'interval'
      }

      /* act */
      objectUnderTest(
        providedTimeZoneId,
        providedStartDateTime,
        providedRecurrence,
        'providedPrevious'
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
    it('should call weekly w/ expected args', () => {
      /* arrange */
      const providedTimeZoneId = 'America/Los_Angeles'
      const providedStartDateTime = '2018-01-01T01:01:01'
      const providedRecurrence = {
        weekly: 'weekly',
        interval: 'interval'
      }

      /* act */
      objectUnderTest(
        providedTimeZoneId,
        providedStartDateTime,
        providedRecurrence,
        'providedPrevious'
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
    it('should throw expected error', () => {
      /* arrange */
      const providedRecurrence = {}

      /* act */
      let actualError
      try {
        objectUnderTest(
          'providedTimeZoneId',
          'providedStartDateTime',
          providedRecurrence,
          'providedPrevious'
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
