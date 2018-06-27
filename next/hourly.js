const {DateTime} = require('luxon')

function hourly (
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
      {hours: interval}
    )
    .toJSDate()
}

module.exports = hourly
