import { Injectable } from '@pequehq/di';
import { EventService, ICommandService, IWelcomeCommand } from '@pequehq/smb-commons';

@Injectable()
export class WelcomeCommand implements ICommandService {
  constructor(private events: EventService) {}

  init(): void {
    this.events.on('welcome', (command: IWelcomeCommand) => this.events.next('outgoingCommand', command));
  }
}
