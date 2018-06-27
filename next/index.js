const getNextDaily = require('./getNextDaily')
const getNextHourly = require('./getNextHourly')
const getNextMonthly = require('./getNextMonthly')
const getNextWeekly = require('./getNextWeekly')

async function next (
  timeZoneId,
  startDateTime,
  recurrence
) {
  const {
    daily,
    hourly,
    weekly,
    monthly,
    interval
  } = recurrence

  if (daily) {
    return getNextDaily(
      timeZoneId,
      startDateTime,
      interval
    )
  } else if (hourly) {
    return getNextHourly(
      timeZoneId,
      startDateTime,
      interval
    )
  } else if (weekly) {
    return getNextWeekly(
      timeZoneId,
      startDateTime,
      weekly,
      interval
    )
  } else if (monthly) {
    return getNextMonthly(
      timeZoneId,
      startDateTime,
      monthly,
      interval
    )
  }
  throw new Error(`unexpected recurrence ${JSON.stringify(recurrence)}`)
}

module.exports = next
