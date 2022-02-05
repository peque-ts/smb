import { Injectable } from '@pequehq/di';
import { EventService, ICommandService, IUnsubscribeCommand } from '@pequehq/smb-commons';

import { SubscribeService } from '../services';

@Injectable()
export class UnsubscribeCommand implements ICommandService {
  constructor(private subscriptions: SubscribeService, private events: EventService) {}

  init(): void {
    this.events.on('unsubscribe', (command: IUnsubscribeCommand) =>
      this.subscriptions.unset(command.action.topic, command.socketId),
    );
  }
}
