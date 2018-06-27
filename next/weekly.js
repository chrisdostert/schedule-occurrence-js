const {DateTime} = require('luxon')

function weekly (
  timeZoneId,
  startDateTime,
  recurrence,
  interval
) {
  // find next observed day of week
  for (let i = 1; i < 8; i++) {
    const testDateTime = DateTime
      .fromISO(
        startDateTime,
        {zone: timeZoneId}
      )
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
        .toJSDate()
    }
  }
}

module.exports = weekly
