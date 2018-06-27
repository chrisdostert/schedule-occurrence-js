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
 * @returns {Date|null} Date of next occurrence or null
 */
async function next (
  timeZoneId,
  startDateTime,
  recurrence
) {
  const luxonStartDateTime = DateTime.fromISO(startDateTime, {zone: timeZoneId})
  const weeklyRecurrence = recurrence.weekly
  const monthlyRecurrence = recurrence.monthly
  const recurrenceInterval = recurrence.interval

  if (recurrence.daily) {
    return daily(
      luxonStartDateTime,
      recurrenceInterval
    )
  } else if (recurrence.hourly) {
    return hourly(
      luxonStartDateTime,
      recurrenceInterval
    )
  } else if (weeklyRecurrence) {
    return weekly(
      luxonStartDateTime,
      weeklyRecurrence,
      recurrenceInterval
    )
  } else if (monthlyRecurrence) {
    return monthly(
      luxonStartDateTime,
      monthlyRecurrence,
      recurrenceInterval
    )
  }
  throw new Error(`unexpected recurrence ${JSON.stringify(recurrence)}`)
}

module.exports = next
