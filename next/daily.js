const {DateTime} = require('luxon')

function daily (
  timeZoneId,
  startDateTime,
  interval
) {
  return DateTime
    .fromISO(
      startDateTime,
      {zone: timeZoneId}
    )
    .plus(
      {days: interval}
    )
    .toJSDate()
}

module.exports = daily
