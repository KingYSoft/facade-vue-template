import * as signalR from '@aspnet/signalr'
import app from './app'

export default class AppSocket {
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
        app.event.trigger('abp.notifications.received', notification)
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
          app.event.trigger('abp.signalr.connected', connection)
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
   * @param {any[]} args 发送的请求参数
   */
  public sendMessage(methodName: string, ...args: any[]): Promise<any> {
    if (this.connection) {
      return this.connection.invoke(methodName, args)
    } else {
      return Promise.reject('websocket 还未连接')
    }

    // return new Promise((resolve, reject) => {
    //   if (that._connection) {
    //     that._connection
    //       .invoke(methodName, args)
    //       .then((resp) => {
    //         resolve(resp)
    //       })
    //       .catch((err) => {
    //         reject(err)
    //       })
    //   } else {
    //     reject('websocket 还未连接')
    //   }
    // })
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
      that.connection.on(methodName, (response) => {
        callback(response)
      })
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
