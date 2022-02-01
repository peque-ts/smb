import { Injectable } from '@pequehq/di';
import { EventService, ICommandService, ISubscribeCommand } from '@pequehq/smb-commons';

import { SubscribeService } from '../services';

@Injectable()
export class SubscribeCommand implements ICommandService {
  constructor(private subscriptions: SubscribeService, private events: EventService) {}

  init(): void {
    this.events.on('subscribe', (command: ISubscribeCommand) =>
      this.subscriptions.set(command.action.topic, command.socketId),
    );
  }
}
