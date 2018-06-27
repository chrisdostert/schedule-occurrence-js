const {DateTime} = require('luxon')

async function getNextDaily (
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

module.exports = getNextDaily
