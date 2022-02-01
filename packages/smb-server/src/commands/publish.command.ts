import { Injectable } from '@pequehq/di';
import { EventService, ICommandService, IPublishCommand } from '@pequehq/smb-commons';

@Injectable()
export class PublishCommand implements ICommandService {
  constructor(private events: EventService) {}

  init(): void {
    this.events.on('publish', (command: IPublishCommand) => this.events.next('outgoingCommand', command));
  }
}
