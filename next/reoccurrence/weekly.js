function weekly (
  previousDateTime,
  recurrence,
  interval
) {
  // find next observed day of week
  for (let i = 1; i < 8; i++) {
    const testDateTime = previousDateTime
      .plus(
        {days: i}
      )

    if (
      recurrence.daysOfWeek.includes(
        testDateTime.weekdayLong.toLowerCase()
      )
    ) {
      return testDateTime
        .plus(
          {weeks: interval}
        )
    }
  }
}

module.exports = weekly
