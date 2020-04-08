const formatDate = (date: Date): string => {
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
const addYears = (date: Date, years: number): Date => {
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
  public formatDate = (date: Date): string => {
    return formatDate(date);
  };

  /**
   * 给日期添加年份
   * @param {string} date 日期
   * @param {number} years 年份
   */
  public addYears = (date: Date, years: number): Date => {
    return addYears(date, years);
  };

  /**
   * 将给定的字符文本（str），查找并替换一个字符串（search）为另一个字符串（replacement）。
   * Example:
   * replaceAll('This is a test string', 'is', 'X') = 'ThX X a test string'
   * @param str 文本
   * @param search 被替换的字符串
   * @param replacement 替换后的字符串
   */
  public replaceAll = (str: string, search: string, replacement: string): string => {
    const fix = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return str.replace(new RegExp(fix, 'g'), replacement);
  };
  /**
   * 格式化一个字符串文本
   * Example:
   * formatString('Hello {0}','Tuana') = 'Hello Tuana'
   * @param str 文本
   * @param args 格式化参数
   */
  public formatString = (str: string, ...args: string[]): string => {
    if (args.length < 1) {
      return str;
    }
    for (let i = 1; i < args.length; i++) {
      const placeHolder = '{' + (i - 1) + '}';
      str = this.replaceAll(str, placeHolder, args[i]);
    }
    return str;
  };
  /**
   * 将文本转成 PascalCase
   * Example:
   * toPascalCase('hello') = 'Hello'
   * @param str 文本
   */
  public toPascalCase = (str: string): string => {
    if (str) {
      if (str.length === 1) {
        return str.charAt(0).toUpperCase();
      }

      return str.charAt(0).toUpperCase() + str.substr(1);
    } else {
      return str;
    }
  };
  /**
   * 将文本转成 CamelCase
   * Example:
   * toPascalCase('Hello') = 'hello'
   * @param str 文本
   */
  public toCamelCase = (str: string): string => {
    if (str) {
      if (str.length === 1) {
        return str.charAt(0).toLowerCase();
      }

      return str.charAt(0).toLowerCase() + str.substr(1);
    } else {
      return str;
    }
  };
}
