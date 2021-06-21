const DATE_UNITS = {
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1
}

const getSecondsDiff = timestamp => (Date.now() - timestamp) / 1000

const getUnitAndValueDate = (secondsElapsed) => {
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsElapsed >= secondsInUnit || unit === 'second') {
      const value = Math.floor(secondsElapsed / secondsInUnit) * -1
      return { value, unit }
    }
  }
}

const getTimeAgo = timestamp => {
  let timeAgo = {
    unit: '',
    value: 0,
    getTimeAgo: ''
  }

  const rtf = new Intl.RelativeTimeFormat()

  const secondsElapsed = getSecondsDiff(timestamp)

  const { value, unit } = getUnitAndValueDate(secondsElapsed)

  timeAgo = {
    unit,
    value, // Siempre lo retorno en minutos
    description: rtf.format(value, unit)
  }

  timeAgoToMinutes(timeAgo)

  timeAgo.value = Math.abs(timeAgo.value)

  // return rtf.format(value, unit)
  return timeAgo
}

const timeAgoToMinutes = (timeAgo) => {
  const TIME_AGO_TO_MINUTES = {
    day: (timeAgo) => { return (timeAgo.value * 24) * 60 },
    hour: (timeAgo) => { return (timeAgo.value * 60) },
    second: (timeAgo) => { return (timeAgo.value = 10) }
  }

  const timeAgoToMinutes = TIME_AGO_TO_MINUTES[timeAgo.unit]

  if (timeAgoToMinutes) {
    timeAgo.value = timeAgoToMinutes(timeAgo)
  }
}

export default { getTimeAgo }
