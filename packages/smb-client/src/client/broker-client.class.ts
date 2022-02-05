import { Injectable } from '@pequehq/di';
import {
  BrokerSocket,
  BufferHelperService,
  Command,
  CommandParser,
  EventService,
  IMessageCommand,
  IPublishAction,
  ISubscribeCommand,
  IUnsubscribeCommand,
  IWelcomeCommand,
  SocketService,
} from '@pequehq/smb-commons';

import { MessageCommand, PublishCommand, SubscribeCommand, UnsubscribeCommand } from '../commands';
import { IBrokerClientOptions, Listener } from '../models';
import { BrokerConnectionTimeoutError } from '../models';
import { SubscribeListenerService } from '../services';

@Injectable()
export class BrokerClient {
  #connectionTimeout: NodeJS.Timer;
  #socket: BrokerSocket;

  constructor(
    private sockets: SocketService,
    private events: EventService,
    private commandParser: CommandParser,
    private command: Command,
    private subscriptions: SubscribeListenerService,
    private messageCommand: MessageCommand,
    private publishMessage: PublishCommand,
    private subscribeCommand: SubscribeCommand,
    private unsubscribeCommand: UnsubscribeCommand,
  ) {
    this.command.init([messageCommand, publishMessage, subscribeCommand, unsubscribeCommand]);
  }

  async connect(options?: IBrokerClientOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      this.#socket = new BrokerSocket();

      const welcomeMsg = (welcome: IWelcomeCommand) => {
        this.events.remove('welcome', welcomeMsg);
        this.#socket.id = welcome.socketId;
        this.sockets.set(this.#socket);
        resolve(welcome.socketId);
      };

      this.events.on('welcome', welcomeMsg);

      this.#socket.connect({ port: options?.port || 8021, host: options?.host || '127.0.0.1' });

      const bufferHelperService = new BufferHelperService(this.events);
      this.#socket.on('data', (data) => bufferHelperService.onData(data.toString()));

      this.#connectionTimeout = setTimeout(() => {
        this.#socket.removeAllListeners('data');
        clearTimeout(this.#connectionTimeout);
        reject(new BrokerConnectionTimeoutError());
      }, options?.connectionTimeout || 3000);
    });
  }

  subscribe(topic: string, listener: Listener<IPublishAction>): void {
    this.subscriptions.set(topic, listener);
    const subscription: ISubscribeCommand = {
      command: 'subscribe',
      action: { topic },
      socketId: this.#socket.id,
      issueTimestamp: Date.now(),
    };
    this.events.next('subscribe', subscription);
  }

  unsubscribe(topic: string): void {
    this.subscriptions.unset(topic);
    const subscription: IUnsubscribeCommand = {
      command: 'unsubscribe',
      action: { topic },
      socketId: this.#socket.id,
      issueTimestamp: Date.now(),
    };
    this.events.next('unsubscribe', subscription);
  }

  message(topic: string, data: unknown): void {
    const message: IMessageCommand = {
      command: 'message',
      action: { topic, message: JSON.stringify(data) },
      socketId: this.#socket.id,
      issueTimestamp: Date.now(),
    };
    this.events.next('message', message);
  }
}
