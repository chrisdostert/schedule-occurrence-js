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
    it('should call daily w/ expected args & return result', () => {
      /* arrange */
      const providedTimeZoneId = 'America/Los_Angeles'
      const providedRecurrence = {
        daily: {},
        interval: 'interval'
      }
      const providedPrevious = {
        dateTime: new Date('2018-01-01T01:01:01')
      }

      const expectedResult = 'expectedResult'
      daily.mockImplementation(() => expectedResult)

      /* act */
      const actualResult = objectUnderTest(
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

      expect(actualResult)
        .toEqual(expectedResult)
    })
  })
  describe('recurrence.hourly truthy', () => {
    it('should call hourly w/ expected args & return result', () => {
      /* arrange */
      const providedTimeZoneId = 'America/Los_Angeles'
      const providedRecurrence = {
        hourly: {},
        interval: 'interval'
      }
      const providedPrevious = {
        dateTime: new Date('2018-01-01T01:01:01')
      }

      const expectedResult = 'expectedResult'
      hourly.mockImplementation(() => expectedResult)

      /* act */
      const actualResult = objectUnderTest(
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

      expect(actualResult)
        .toEqual(expectedResult)
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

      const expectedResult = 'expectedResult'
      monthly.mockImplementation(() => expectedResult)

      /* act */
      const actualResult = objectUnderTest(
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

      expect(actualResult)
        .toEqual(expectedResult)
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

      const expectedResult = 'expectedResult'
      weekly.mockImplementation(() => expectedResult)

      /* act */
      const actualResult = objectUnderTest(
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

      expect(actualResult)
        .toEqual(expectedResult)
    })
  })
})
