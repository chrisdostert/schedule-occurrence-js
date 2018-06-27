const {DateTime} = require('luxon')

function getNextHourly (
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

module.exports = getNextHourly
