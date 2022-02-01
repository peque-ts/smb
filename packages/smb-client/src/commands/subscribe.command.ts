import { Injectable } from '@pequehq/di';
import { EventService, ICommandService, ISubscribeCommand } from '@pequehq/smb-commons';

@Injectable()
export class SubscribeCommand implements ICommandService {
  constructor(private events: EventService) {}

  init(): void {
    this.events.on('subscribe', async (command: ISubscribeCommand) => {
      this.events.next('outgoingCommand', command);
    });
  }
}
