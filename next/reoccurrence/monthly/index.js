const dayOfWeek = require('./dayOfWeek')
const day = require('./day')

async function monthly (
  previousDateTime,
  recurrence,
  interval
) {
  const recurrenceDay = recurrence.day
  const recurrenceDayOfWeek = recurrence.dayOfWeek

  if (recurrenceDay) {
    return day(
      previousDateTime,
      recurrenceDay,
      interval
    )
  } else if (recurrenceDayOfWeek) {
    return dayOfWeek(
      previousDateTime,
      recurrenceDayOfWeek,
      interval
    )
  }
}

module.exports = monthly
