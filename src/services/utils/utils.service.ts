const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // 2017-01-12
  return [year, month, day]
    .map((n: number) => {
      return n < 10 ? '0' + n : '' + n;
    })
    .join('-');
};
const addYears = (date: Date, years: number) => {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
};

export default class UtilsService {
  /**
   * 格式化日期 2017-01-12
   * @method formatDate 将日期格式化成 yyyy-MM-dd
   * @param {Date} date 日期
   */
  public formatDate = (date: Date) => {
    return formatDate(date);
  };

  /**
   * 给日期添加年份
   * @param {string} date 日期
   * @param {number} years 年份
   */
  public addYears = (date: Date, years: number) => {
    return addYears(date, years);
  };
}
