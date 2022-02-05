import { Container } from '@pequehq/di';
import {
  Command,
  CommandEmitter,
  CommandError,
  CommandParser,
  CommandReceiver,
  EventService,
  SocketService,
} from '@pequehq/smb-commons';

import { MessageCommand, PublishCommand, SubscribeCommand, UnsubscribeCommand, WelcomeCommand } from '../commands';
import { SubscribeService } from '../services';
import { Broker } from './broker.class';

export class BrokerFactory {
  #DI: Container = new Container({
    providers: [
      EventService,
      SocketService,
      SubscribeService,
      CommandError,
      CommandParser,
      CommandReceiver,
      CommandEmitter,
      Command,
      WelcomeCommand,
      SubscribeCommand,
      UnsubscribeCommand,
      MessageCommand,
      PublishCommand,
      Broker,
    ],
  });

  createBroker(): Broker {
    return this.#DI.get<Broker>('Broker');
  }
}
