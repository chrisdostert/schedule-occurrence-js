const reoccurrence = require('./reoccurrence')
const {DateTime, Settings} = require('luxon')
Settings.throwOnInvalid = true

/**
 * Gets the next schedule occurrence
 * @param {string} timeZoneId IANA timezone id
 * @param {string} startDateTime Zoneless ISO 8601 datetime designating the start of the schedule
 * @param {{daily, hourly, interval, monthly, weekly}} recurrence
 * @param {{dateTime, count}|null} previous
 * @returns {Date|null} Date of next occurrence or null
 */
function next (
  timeZoneId,
  startDateTime,
  recurrence,
  previous
) {
  if (!(recurrence && previous)) {
    // single/first occurrence
    return DateTime
      .fromISO(
        startDateTime,
        {zone: timeZoneId}
      )
      .toJSDate()
  }

  return reoccurrence(
    timeZoneId,
    recurrence,
    previous
  )
}

module.exports = next
