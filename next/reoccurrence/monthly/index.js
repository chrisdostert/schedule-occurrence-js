const dayOfWeeks = require('./dayOfWeeks')
const days = require('./days')

async function monthly (
  previousDateTime,
  recurrence,
  interval
) {
  const recurrenceDays = recurrence.days
  const recurrenceDayOfWeeks = recurrence.dayOfWeeks

  if (recurrenceDays) {
    return days(
      previousDateTime,
      recurrenceDays,
      interval
    )
  } else if (recurrenceDayOfWeeks) {
    return dayOfWeeks(
      previousDateTime,
      recurrenceDayOfWeeks,
      interval
    )
  }
}

module.exports = monthly
