import { Injectable } from '@pequehq/di';
import { EventService, ICommandService, IMessageCommand, IPublishCommand } from '@pequehq/smb-commons';

import { SubscribeService } from '../services';

@Injectable()
export class MessageCommand implements ICommandService {
  constructor(private subscriptions: SubscribeService, private events: EventService) {}

  init(): void {
    this.events.on('message', (command: IMessageCommand) => {
      const subscribers = this.subscriptions.find(command.action.topic);
      for (const sub of subscribers) {
        const publishCommand: IPublishCommand = {
          command: 'publish',
          action: command.action,
          socketId: sub,
          issueTimestamp: Date.now(),
        };
        this.events.next('publish', publishCommand);
      }
    });
  }
}
