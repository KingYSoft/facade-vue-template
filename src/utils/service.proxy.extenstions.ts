import { AxiosInstance } from 'axios';
import { ServiceProxy } from './service.proxy';

export class ServiceProxyExtention extends ServiceProxy {
  constructor(baseUrl?: string, instance?: AxiosInstance) {
    super(baseUrl, instance);
  }
}
