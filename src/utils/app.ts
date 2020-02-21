import * as signalR from '@aspnet/signalr'

class Event {
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
class Socket {
  private pingTimer: NodeJS.Timeout | undefined
  private connection: signalR.HubConnection | undefined
  constructor() {
    this.pingTimer = undefined
    this.connection = undefined
  }

  /**
   * 连接websocket，返回websocket的Promise连接
   * @param {string} baseUrl 连接 websocket 地址
   * @param {string} queryString 地址的拼接参数，可空，如：id=xxx&name=xxxx；
   */
  public connect(
    baseUrl: string,
    queryString: string
  ): Promise<signalR.HubConnection> {
    const that = this

    // if (!signalR) {
    //   return
    // }
    if (queryString) {
      baseUrl += (baseUrl.indexOf('?') === -1 ? '?' : '&') + queryString
    }
    return (function start(transport): Promise<signalR.HubConnection> {
      console.log(
        'Starting connection using ' +
          signalR.HttpTransportType[transport] +
          ' transport'
      )

      const connection = new signalR.HubConnectionBuilder()
        .withUrl(baseUrl, transport)
        .build()

      // 配置
      // Reconnect if hub disconnects
      connection.onclose((e) => {
        if (e) {
          console.log('Connection closed with error: ' + e)
        } else {
          console.log('Disconnected')
        }
        // 尝试重新连接
        that.reconnect()
      })

      // Register to get notifications
      connection.on('getNotification', (notification) => {
        APP.event.trigger('app.notifications.received', notification)
      })
      return connection
        .start()
        .then(() => {
          that.connection = connection
          console.log('Connected to SignalR server!')
          // Call the Register method on the hub.
          connection.invoke('register').then(() => {
            console.log('Registered to the SignalR server!')
          })
          APP.event.trigger('app.socket.connected', connection)
          return connection
        })
        .catch((error) => {
          console.log(
            'Cannot start the connection using ' +
              signalR.HttpTransportType[transport] +
              ' transport. ' +
              error.message
          )
          if (transport !== signalR.HttpTransportType.LongPolling) {
            return start(transport + 1)
          }

          return Promise.reject(error)
        })
    })(signalR.HttpTransportType.WebSockets)
  }
  /**
   * 发送消息
   * @param {string} methodName 发送的方法名
   * @param {any} request 发送的请求参数
   */
  public sendMessage(methodName: string, request: any) {
    if (this.connection) {
      return this.connection.invoke(methodName, request)
    } else {
      return Promise.reject('websocket 还未连接')
    }
  }
  /**
   * 接受消息
   * @param {string} methodName 接受消息的方法名
   * @param {(...args: any[]) => void} callback 回调函数
   */
  public receiveMessage(
    methodName: string,
    callback: (...args: any[]) => void
  ) {
    const that = this
    if (that.connection) {
      that.connection.on(methodName, callback)
    } else {
      console.log('websocket 还未连接')
    }
  }

  /**
   * 重新连接
   */
  private reconnect() {
    const that = this
    that.pingTimer = setTimeout(() => {
      if (that.connection) {
        that.connection
          .start()
          .then(() => {
            if (that.pingTimer) {
              clearTimeout(that.pingTimer)
            }
          })
          .catch((error: any) => {
            console.log(error)
            that.reconnect()
          })
      } else {
        console.log('websocket 还未连接')
      }
    }, 5000)
  }
}
class Speech {
  public speak(text: string): void {
    const d = new SpeechSynthesisUtterance(text)
    d.lang = 'zh-CN'
    d.rate = 0.6 // 语速
    d.pitch = 1 // 音调
    d.volume = 1 // 音量
    speechSynthesis.speak(d)
  }
}

class App {
  /**
   * 全局事件
   * on 注册
   * tigger 触发
   * off 注销
   */
  public event!: Event
  /**
   * 基于signalr的websocket
   */
  public socket!: Socket
  /**
   * 语音
   */
  public speech!: Speech
  constructor() {
    this.event = new Event()
    this.socket = new Socket()
    this.speech = new Speech()
  }
}

export const APP = new App()
