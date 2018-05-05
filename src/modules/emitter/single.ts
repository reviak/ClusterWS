import {Socket} from '../socket/socket';
import {logError} from '../../utils/functions';
import {Listener, CustomObject, Message} from '../../utils/types';

export class EventEmitterSingle {
  private events: CustomObject = {};

  public on(event: 'connection', listener: (socket: Socket) => void): void
  public on(event: string, listener: Listener): void
  public on(event: string, listener: Listener): void {
    if ({}.toString.call(listener) !== '[object Function]')
      return logError('Listener must be a function');
    this.events[event] = listener;
  }

  public emit(event: string, message: Message): void
  public emit(event: string, ...args: any[]): void
  public emit(event: string, ...args: any[]): void {
    const listener: Listener = this.events[event];
    listener && listener(...args);
  }

  public removeEvents(): void {
    this.events = {};
  }
}
