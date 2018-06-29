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
})
