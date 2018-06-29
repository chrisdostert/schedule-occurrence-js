const daily = require('./daily')
const hourly = require('./hourly')
const monthly = require('./monthly')
const weekly = require('./weekly')
const {DateTime} = require('luxon')

/**
 * Gets the next schedule occurrence
 * @param {string} timeZoneId IANA timezone id
 * @param {Date} startDateTime Date designating the start of the schedule
 * @param {{daily, hourly, interval, monthly, weekly}} recurrence
 * @param {{occursDateTime, count}|null} previous
 * @returns {Date|null} Date of next occurrence or null
 */
function next (
  timeZoneId,
  startDateTime,
  recurrence,
  previous
) {
  const luxonStartDateTime = DateTime
    .fromISO(
      startDateTime,
      {zone: timeZoneId}
    )

  if (!(recurrence && previous)) {
    // single/first occurrence
    return luxonStartDateTime.toJSDate()
  }

  const recurrenceInterval = recurrence.interval

  if (recurrence.daily) {
    return daily(
      luxonStartDateTime,
      recurrenceInterval
    )
  }
  if (recurrence.hourly) {
    return hourly(
      luxonStartDateTime,
      recurrenceInterval
    )
  }

  const weeklyRecurrence = recurrence.weekly
  if (weeklyRecurrence) {
    return weekly(
      luxonStartDateTime,
      weeklyRecurrence,
      recurrenceInterval
    )
  }

  const monthlyRecurrence = recurrence.monthly
  if (monthlyRecurrence) {
    return monthly(
      luxonStartDateTime,
      monthlyRecurrence,
      recurrenceInterval
    )
  }

  throw new Error(`unexpected recurrence ${JSON.stringify(recurrence)}`)
}

module.exports = next
