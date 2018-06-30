const daily = require('./daily')
const hourly = require('./hourly')
const monthly = require('./monthly')
const weekly = require('./weekly')
const {DateTime, Settings} = require('luxon')
Settings.throwOnInvalid = true

/**
 * Gets the next reoccurrence
 * @param {string} timeZoneId IANA timezone id
 * @param {{daily, hourly, interval, monthly, weekly}} recurrence
 * @param {{dateTime, count}|null} previous
 * @returns {Date|null} Date of next occurrence or null
 */
function next (
  timeZoneId,
  recurrence,
  previous
) {
  const previousDateTime = DateTime
    .fromJSDate(
      previous.dateTime,
      {zone: timeZoneId}
    )

  const recurrenceInterval = recurrence.interval

  if (recurrence.daily) {
    return daily(
      previousDateTime,
      recurrenceInterval
    )
  }

  if (recurrence.hourly) {
    return hourly(
      previousDateTime,
      recurrenceInterval
    )
  }

  const weeklyRecurrence = recurrence.weekly
  if (weeklyRecurrence) {
    return weekly(
      previousDateTime,
      weeklyRecurrence,
      recurrenceInterval
    )
  }

  const monthlyRecurrence = recurrence.monthly
  if (monthlyRecurrence) {
    return monthly(
      previousDateTime,
      monthlyRecurrence,
      recurrenceInterval
    )
  }
}

module.exports = next
