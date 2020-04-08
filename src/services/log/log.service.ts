enum LogLevel {
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
  FATAL = 5
}

export default class LogService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private log = (logObject: any, logLevel: LogLevel) => {
    if (!window.console || !window.console.log) {
      return;
    }

    if (logLevel != undefined && logLevel < LogLevel.DEBUG) {
      return;
    }

    console.log(logObject);
  };
  /**
   * 调试
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug = (logObject: any): void => {
    this.log('DEBUG: ', LogLevel.DEBUG);
    this.log(logObject, LogLevel.DEBUG);
  };
  /**
   * 信息
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info = (logObject: any): void => {
    this.log('INFO: ', LogLevel.INFO);
    this.log(logObject, LogLevel.INFO);
  };
  /**
   * 警告
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warn = (logObject: any): void => {
    this.log('WARN: ', LogLevel.WARN);
    this.log(logObject, LogLevel.WARN);
  };
  /**
   * 错误
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error = (logObject: any): void => {
    this.log('ERROR: ', LogLevel.ERROR);
    this.log(logObject, LogLevel.DEBUG);
  };
  /**
   * 严重
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fatal = (logObject: any): void => {
    this.log('FATAL: ', LogLevel.FATAL);
    this.log(logObject, LogLevel.FATAL);
  };
}
