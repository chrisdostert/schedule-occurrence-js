function daily (
  previousDateTime,
  interval
) {
  return previousDateTime
    .plus(
      {days: interval}
    )
}

module.exports = daily
