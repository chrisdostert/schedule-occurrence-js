function daily (
  luxonStartDateTime,
  interval
) {
  return luxonStartDateTime
    .plus(
      {days: interval}
    )
    .toJSDate()
}

module.exports = daily
