import { Injectable } from '@pequehq/di';
import { EventService, ICommandService, IMessageCommand } from '@pequehq/smb-commons';

@Injectable()
export class MessageCommand implements ICommandService {
  constructor(private events: EventService) {}

  init(): void {
    this.events.on('message', (command: IMessageCommand) => {
      this.events.next('outgoingCommand', command);
    });
  }
}
