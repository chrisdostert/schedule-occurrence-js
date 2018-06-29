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
  describe('previous.count >= recurrence.end.count', () => {
    it('should return undefined', () => {
      /* arrange */
      const providedRecurrence = {
        end: {
          count: 2
        }
      }
      const providedPrevious = {
        count: providedRecurrence.end.count
      }

      /* act */
      const actualResult = objectUnderTest(
        'providedTimeZoneId',
        providedRecurrence,
        providedPrevious
      )

      /* assert */
      expect(actualResult)
        .toEqual(undefined)
    })
  })
  describe('recurrence.daily truthy', () => {
    it('should call daily w/ expected args', () => {
      /* arrange */
      const providedTimeZoneId = 'America/Los_Angeles'
      const providedRecurrence = {
        daily: {},
        interval: 'interval'
      }
      const providedPrevious = {
        dateTime: new Date('2018-01-01T01:01:01')
      }

      /* act */
      objectUnderTest(
        providedTimeZoneId,
        providedRecurrence,
        providedPrevious
      )

      /* assert */
      expect(daily)
        .toBeCalledWith(
          DateTime.fromJSDate(providedPrevious.dateTime, {zone: providedTimeZoneId}),
          providedRecurrence.interval
        )
    })
  })
  describe('recurrence.hourly truthy', () => {
    it('should call hourly w/ expected args', () => {
      /* arrange */
      const providedTimeZoneId = 'America/Los_Angeles'
      const providedRecurrence = {
        hourly: {},
        interval: 'interval'
      }
      const providedPrevious = {
        dateTime: new Date('2018-01-01T01:01:01')
      }

      /* act */
      objectUnderTest(
        providedTimeZoneId,
        providedRecurrence,
        providedPrevious
      )

      /* assert */
      expect(hourly)
        .toBeCalledWith(
          DateTime.fromJSDate(providedPrevious.dateTime, {zone: providedTimeZoneId}),
          providedRecurrence.interval
        )
    })
  })
  describe('recurrence.monthly truthy', () => {
    it('should call monthly w/ expected args', () => {
      /* arrange */
      const providedTimeZoneId = 'America/Los_Angeles'
      const providedRecurrence = {
        monthly: 'monthly',
        interval: 'interval'
      }
      const providedPrevious = {
        dateTime: new Date('2018-01-01T01:01:01')
      }

      /* act */
      objectUnderTest(
        providedTimeZoneId,
        providedRecurrence,
        providedPrevious
      )

      /* assert */
      expect(monthly)
        .toBeCalledWith(
          DateTime.fromJSDate(providedPrevious.dateTime, {zone: providedTimeZoneId}),
          providedRecurrence.monthly,
          providedRecurrence.interval
        )
    })
  })
  describe('recurrence.weekly truthy', () => {
    it('should call weekly w/ expected args', () => {
      /* arrange */
      const providedTimeZoneId = 'America/Los_Angeles'
      const providedRecurrence = {
        weekly: 'weekly',
        interval: 'interval'
      }
      const providedPrevious = {
        dateTime: new Date('2018-01-01T01:01:01')
      }

      /* act */
      objectUnderTest(
        providedTimeZoneId,
        providedRecurrence,
        providedPrevious
      )

      /* assert */
      expect(weekly)
        .toBeCalledWith(
          DateTime.fromJSDate(providedPrevious.dateTime, {zone: providedTimeZoneId}),
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
