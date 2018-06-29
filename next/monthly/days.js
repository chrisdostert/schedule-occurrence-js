function days (
  luxonStartDateTime,
  days,
  interval
) {
  // number of days in months varies so,
  // for each interval,
  // we must find the next month containing the day.
  let testDateTime
  let remainingIntervals = interval
  for (let i = 1; remainingIntervals > 0; i++) {
    testDateTime = luxonStartDateTime
      .plus(
        {months: i}
      )

    if (testDateTime.isValid) {
      remainingIntervals--
    }
  }

  return testDateTime
    .toJSDate()
}

module.exports = days
