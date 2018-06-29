function daily (
  previousDateTime,
  interval
) {
  return previousDateTime
    .plus(
      {days: interval}
    )
    .toJSDate()
}

module.exports = daily
