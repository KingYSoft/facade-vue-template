export default class AppEvent {
  private callbacks: any
  constructor() {
    this.callbacks = {}
  }
  /**
   * 注册监听事件
   * @param {string} eventName 事件名称
   * @param {(...args: any[]) => void} callback 回调函数
   */
  public on(eventName: string, callback: (...args: any[]) => void) {
    if (!this.callbacks[eventName]) {
      this.callbacks[eventName] = []
    }

    this.callbacks[eventName].push(callback)
  }
  /**
   * 关闭监听事件
   * @param {string} eventName 事件名称
   * @param {(...args: any[]) => void} callback 回调函数
   */
  public off(eventName: string, callback: (...args: any[]) => void) {
    const events = this.callbacks[eventName]
    if (!events || !events.length) {
      return
    }

    let index = -1
    for (let i = 0; i < events.length; i++) {
      if (events[i] === callback) {
        index = i
        break
      }
    }

    if (index < 0) {
      return
    }

    this.callbacks[eventName].splice(index, 1)
  }
  /**
   * 触发事件
   * @param {string} eventName 事件名称
   * @param {T=any} ts
   */
  public trigger<T = any>(eventName: string, ts: T): T {
    const events = this.callbacks[eventName]
    if (!events || !events.length) {
      return ts
    }

    const args = Array.prototype.slice.call(arguments, 1)
    for (const callback of events) {
      callback.apply(this, args)
    }
    // for (let i = 0; i < callbacks.length; i++) {
    //   callbacks[i].apply(this, args)
    // }

    return ts
  }
}
