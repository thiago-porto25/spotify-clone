export function millisToMinutes(millis: number): string {
  const minutes = Math.floor(millis / 60000)
  const seconds = ((millis % 60000) / 1000).toFixed(0)
  const numberSeconds = Number(seconds)
  return numberSeconds === 60
    ? minutes + 1 + ':00'
    : minutes + ':' + (numberSeconds < 10 ? '0' : '') + seconds
}
