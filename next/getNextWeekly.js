const {DateTime} = require('luxon')

async function getNextWeekly (
  timeZoneId,
  startDateTime,
  weekly,
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
      weekly.daysOfWeek.includes(
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

module.exports = getNextWeekly
