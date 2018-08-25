const reoccurrence = require('./reoccurrence')
const {DateTime, Settings} = require('luxon')
Settings.throwOnInvalid = true

/**
 * Gets the next schedule occurrence
 * @param {string} timeZoneId IANA timezone id
 * @param {string} startDateTime Zoneless ISO 8601 datetime designating the start of the schedule
 * @param {{daily, end, hourly, interval, monthly, weekly}} recurrence
 * @param {{dateTime, count}|null} previous
 * @returns {Date|null} Date of next occurrence or null
 */
function next (
  timeZoneId,
  startDateTime,
  recurrence,
  previous
) {
  if (!previous) {
    // first/single occurrence
    return DateTime
      .fromISO(
        startDateTime,
        {zone: timeZoneId}
      )
      .toJSDate()
  }

  if (!recurrence) {
    // end
    return
  }

  if (recurrence.end && recurrence.end.count && previous.count >= recurrence.end.count) {
    // end
    return
  }

  const nextDateTime = reoccurrence(
    timeZoneId,
    recurrence,
    previous
  )

  let endDate
  if (recurrence.end && recurrence.end.date) {
    endDate = DateTime
      .fromISO(
        recurrence.end.date
      )
  }

  if (
    !(endDate && (endDate < nextDateTime))
  ) {
    return nextDateTime
  }
}

module.exports = next
