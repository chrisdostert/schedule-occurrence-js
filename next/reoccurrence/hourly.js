function hourly (
  previousDateTime,
  interval
) {
  return previousDateTime
    .plus(
      {hours: interval}
    )
    .toJSDate()
}

module.exports = hourly
