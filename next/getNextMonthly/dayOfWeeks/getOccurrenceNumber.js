/**
 * gets the occurrence number of the day of week in the current month
 * @param {DateTime} dateTime
 */
function getOccurrenceNumber (dateTime) {
  let i = 0
  while (dateTime.minus({ days: 7 * i }).month === dateTime.month) {
    i++
  }
  return i
}

module.exports = getOccurrenceNumber
