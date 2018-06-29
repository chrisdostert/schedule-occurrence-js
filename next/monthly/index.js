const dayOfWeeks = require('./dayOfWeeks')
const days = require('./days')

async function monthly (
  luxonStartDateTime,
  recurrence,
  interval
) {
  const recurrenceDays = recurrence.days
  const recurrenceDayOfWeeks = recurrence.dayOfWeeks

  if (recurrenceDays) {
    return days(
      luxonStartDateTime,
      recurrenceDays,
      interval
    )
  } else if (recurrenceDayOfWeeks) {
    return dayOfWeeks(
      luxonStartDateTime,
      recurrenceDayOfWeeks,
      interval
    )
  }
}

module.exports = monthly
