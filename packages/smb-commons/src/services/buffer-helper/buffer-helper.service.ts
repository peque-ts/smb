import { EventService } from '../events/event.service';

export class BufferHelperService {
  #delimiter = '\r\n';
  #data = '';

  constructor(private eventService: EventService) {}

  #handleData(data: string) {
    this.#data = '';
    this.eventService.next('incomingCommand', data);
  }

  onData(data: Buffer | string) {
    this.#data += data;
    const index = data.indexOf(this.#delimiter);
    if (index !== -1) {
      const rest = this.#data.substring(index + this.#delimiter.length);
      this.#handleData(this.#data.substring(0, index));
      if (rest.length > 0) {
        this.onData(rest);
      }
    }
  }
}
