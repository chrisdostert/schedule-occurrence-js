function hourly (
  previousDateTime,
  interval
) {
  return previousDateTime
    .plus(
      {hours: interval}
    )
}

module.exports = hourly
