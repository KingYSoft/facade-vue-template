import AppEvent from './app.event'
import AppSocket from './app.socket'
import AppSpeech from './app.speech'

class App {
  public event!: AppEvent
  public socket!: AppSocket
  public speech!: AppSpeech
  constructor() {
    this.event = new AppEvent()
    this.socket = new AppSocket()
    this.speech = new AppSpeech()
  }
}

export default new App()
