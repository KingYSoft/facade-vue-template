const formatNumber = (n: number): string | number => {
  const nStr = n.toString() // 1
  return nStr[1] ? n : '0' + n
}
/**
 * 格式化日期 2017-01-12
 * @method formatDate 将日期格式化成 yyyy-MM-dd
 * @param {Date} date 日期
 */
export const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  // 2017-01-12
  return [year, month, day].map(formatNumber).join('-')
}
/**
 * 给日期添加年份
 * @param {string} date 日期
 * @param {number} years 年份
 */
export const addYears = (date: Date, years: number) => {
  const newDate = new Date(date)
  newDate.setFullYear(newDate.getFullYear() + years)
  return newDate
}
