import { ICallback } from '../../models';

interface EventCallback {
  [key: string]: ICallback[];
}

export default class EventService {
  private callbacks: EventCallback;
  constructor() {
    this.callbacks = {};
  }
  /**
   * 注册监听事件
   * @param {string} eventName 事件名称
   * @param {ICallback} callback 回调函数
   */
  public on(eventName: string, callback: ICallback): void {
    const events = this.callbacks[eventName];
    if (events) {
      this.callbacks[eventName].push(callback);
    } else {
      this.callbacks[eventName] = [];
    }
  }
  /**
   * 关闭监听事件
   * @param {string} eventName 事件名称
   * @param {ICallback} callback 回调函数
   */
  public off(eventName: string, callback: ICallback): void {
    const events = this.callbacks[eventName];
    if (events && events.length > 0) {
      let index = -1;
      for (let i = 0; i < events.length; i++) {
        if (events[i] === callback) {
          index = i;
          break;
        }
      }

      if (index < 0) {
        return;
      }

      this.callbacks[eventName].splice(index, 1);
    }
  }
  /**
   * 触发事件
   * @param {string} eventName 事件名称
   * @param {T} ts 事件入参
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public trigger<T = any>(eventName: string, ts: T): T {
    const events = this.callbacks[eventName];
    if (events && events.length > 0) {
      // eslint-disable-next-line prefer-rest-params
      const args = Array.prototype.slice.call(arguments, 1);
      for (const callback of events) {
        callback.apply(this, args);
      }
      // for (let i = 0; i < callbacks.length; i++) {
      //   callbacks[i].apply(this, args)
      // }
    }
    return ts;
  }
}
