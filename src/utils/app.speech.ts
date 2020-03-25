export default class AppSpeech {
  public speak(text: string): void {
    const d = new SpeechSynthesisUtterance(text)
    d.lang = 'zh-CN'
    d.rate = 0.6 // 语速
    d.pitch = 1 // 音调
    d.volume = 1 // 音量
    speechSynthesis.speak(d)
  }
}
