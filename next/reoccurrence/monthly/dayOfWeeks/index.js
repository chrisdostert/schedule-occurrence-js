const getFirstOccurrenceNextMonth = require('./getFirstOccurrenceNextMonth')
const getOccurrenceNumber = require('./getOccurrenceNumber')

function dayOfWeeks (
  previousDateTime,
  dayOfWeeks,
  interval
) {
  const occurrenceNumber = getOccurrenceNumber(
    previousDateTime
  )

  // day of week occurrences in months varies so,
  // for each interval,
  // we must find the next month containing the day of week occurrence.
  let testDateTime
  let remainingIntervals = interval
  for (let i = 0; remainingIntervals > 0; i++) {
    testDateTime = getFirstOccurrenceNextMonth(
      previousDateTime
        .plus(
          {months: i}
        ),
      occurrenceNumber
    )
      .plus(
        { days: 7 * occurrenceNumber }
      )

    if (testDateTime.isValid) {
      remainingIntervals--
    }
  }
  return testDateTime
    .toJSDate()
}

module.exports = dayOfWeeks
