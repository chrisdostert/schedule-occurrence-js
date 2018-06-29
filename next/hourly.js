function hourly (
  luxonStartDateTime,
  interval
) {
  return luxonStartDateTime
    .plus(
      {hours: interval}
    )
    .toJSDate()
}

module.exports = hourly
