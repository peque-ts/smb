import { Injectable } from '@pequehq/di';

import { EventService } from '../events/event.service';
import { SocketService } from '../socket/socket.service';
import { CommandParser } from './command-parser.class';
import { BrokerSocket } from '../../models';

@Injectable()
export class CommandEmitter {
  constructor(private events: EventService, private commandParser: CommandParser, private sockets: SocketService) {}

  #writeSocket(socket: BrokerSocket | undefined, data: string): void {
    if (socket) {
      socket.write(`${data}\r\n`);
    }
  }

  init(): void {
    this.events.on('outgoingCommand', async (data) => {
      try {
        const command = this.commandParser.cast(data);
        this.#writeSocket(this.sockets.get(command.socketId), this.commandParser.stringify(data));
      } catch (error) {
        this.events.next('error', error);
      }
    });
  }
}
