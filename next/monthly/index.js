const dayOfWeeks = require('./dayOfWeeks')
const days = require('./days')

async function monthly (
  timeZoneId,
  startDateTime,
  recurrence,
  interval
) {
  const recurrenceDays = recurrence.days
  const recurrenceDayOfWeeks = recurrence.dayOfWeeks

  if (recurrenceDays) {
    return days(
      timeZoneId,
      startDateTime,
      recurrenceDays,
      interval
    )
  } else if (recurrenceDayOfWeeks) {
    return dayOfWeeks(
      timeZoneId,
      startDateTime,
      recurrenceDayOfWeeks,
      interval
    )
  }
}

module.exports = monthly
