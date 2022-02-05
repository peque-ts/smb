import { wait } from '@pequehq/test';
import { EventEmitter } from 'events';

class MyEventEmitter extends EventEmitter {
  counter = 0;
}

const eventEmitter = new MyEventEmitter();

eventEmitter.on('event', async function (data) {
  eventEmitter.emit('out', data);
});

eventEmitter.on('out', async function (data) {
  console.log(data);
  await wait();
});

eventEmitter.emit('event', Date.now()); // 0
eventEmitter.emit('event', Date.now()); // 1
eventEmitter.emit('event', Date.now()); // 2
