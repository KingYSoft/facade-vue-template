import AppEvent from './app.event'
import AppSocket from './app.socket'

class App {
  public event!: AppEvent
  public socket!: AppSocket
  constructor() {
    this.event = new AppEvent()
    this.socket = new AppSocket()
  }
}

export default new App()
