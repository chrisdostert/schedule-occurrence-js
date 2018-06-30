const reoccurrence = require('./reoccurrence')
jest.mock('./reoccurrence', () => jest.fn())

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
        'providedStartDateTime',
        providedRecurrence,
        providedPrevious
      )

      /* assert */
      expect(actualResult)
        .toEqual(undefined)
    })
  })
  it('should call reoccurrence w/ expected args', () => {
    /* arrange */
    const providedTimeZoneId = 'providedTimeZoneId'
    const providedRecurrence = 'providedRecurrence'
    const providedPrevious = 'providedPrevious'

    /* act */
    objectUnderTest(
      providedTimeZoneId,
      'providedStartDateTime',
      providedRecurrence,
      providedPrevious
    )

    /* assert */
    expect(reoccurrence)
      .toBeCalledWith(
        providedTimeZoneId,
        providedRecurrence,
        providedPrevious
      )
  })
  describe('recurrence.end.dateTime < nextDateTime', () => {
    it('should return expected result', () => {
      /* arrange */
      const providedTimeZoneId = 'America/Los_Angeles'
      const providedRecurrence = {
        end: {
          dateTime: '2018-01-01T01:01:01'
        }
      }

      const nextDateTime = DateTime
        .fromISO(
          providedRecurrence.end.dateTime,
          {zone: providedTimeZoneId}
        )
        .plus({minutes: 1})

      reoccurrence.mockImplementation(() => nextDateTime)

      /* act */
      const actualResult = objectUnderTest(
        providedTimeZoneId,
        'providedStartDateTime',
        providedRecurrence,
        'providedPrevious'
      )

      /* assert */
      expect(actualResult)
        .toEqual(undefined)
    })
  })
})
