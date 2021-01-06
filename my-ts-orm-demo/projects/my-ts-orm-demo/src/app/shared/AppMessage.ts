import {AppMessageType} from './app-message-type';

export interface AppMessage {
  type: AppMessageType;
  payload: any;
}
