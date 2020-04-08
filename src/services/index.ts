import ConfigService from './config/config.service';
import UtilsService from './utils/utils.service';
import ApiService from './api/api.service';
import CookieService from './cookie/cookie.service';
import EventService from './event/event.service';
import SignalrService from './signalr/signalr.service';
import SpeechService from './speech/speech.service';

export const facade = {
  /**
   * 全局配置
   */
  config: new ConfigService(),
  /**
   * 全局事件
   */
  event: new EventService(),
  /**
   * utils
   */
  utils: new UtilsService(),
  /**
   * 接口
   */
  api: new ApiService(),
  /**
   * cookie
   */
  cookie: new CookieService(),
  /**
   * web socket
   */
  socket: new SignalrService(),
  /**
   * 全局语音服务
   */
  speech: new SpeechService()
};
