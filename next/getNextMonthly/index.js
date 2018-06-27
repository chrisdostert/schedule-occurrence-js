const dayOfWeeks = require('./dayOfWeeks')
const days = require('./days')

async function getNextMonthly (
  timeZoneId,
  startDateTime,
  monthly,
  interval
) {
  if (monthly.days) {
    return days(
      timeZoneId,
      startDateTime,
      monthly.days,
      interval
    )
  } else if (monthly.dayOfWeeks) {
    return dayOfWeeks(
      timeZoneId,
      startDateTime,
      monthly.dayOfWeeks,
      interval
    )
  }
}

module.exports = getNextMonthly
