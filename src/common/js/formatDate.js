export function formatDay(date) {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDay()
  return year + '-' + month + '-' + day
}
