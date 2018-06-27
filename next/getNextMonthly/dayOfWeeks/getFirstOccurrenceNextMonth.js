/**
 * gets the first occurrence of the current day of week in the proceeding month
 * @param {DateTime} dateTime
 */
function getFirstOccurrenceNextMonth (dateTime) {
  let testDateTime = dateTime
    .set(
      {
        month: dateTime.month + 1,
        day: 1
      }
    )

  for (let i = 0; i < 7; i++) {
    testDateTime = testDateTime
      .plus(
        { days: i }
      )

    if (testDateTime.weekday === dateTime.weekday) {
      return testDateTime
    }
  }
}

module.exports = getFirstOccurrenceNextMonth
