import * as sinon from 'sinon';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { DI, loadProviders } from '../../../test/test.utils';
import { EventService } from '../events/event.service';
import { BufferHelperService } from './buffer-helper.service';

const test = suite('BufferHelperService');

test.before.each((context) => {
  context.sandbox = sinon.createSandbox();
  context.spies = {
    eventNext: context.sandbox.spy(EventService.prototype, 'next'),
  };

  loadProviders();
  context.events = DI.get<EventService>('EventService');
  context.bufferHelper = new BufferHelperService(context.events);
});

test.after.each((context) => {
  context.sandbox.restore();
  DI.unsetAll();
});

test('should trigger incomingCommand properly', (context) => {
  const payload = [
    `{"command": "welcome", "actions": {}, "socketId": "id_1", issueTimestamp: 1644098150000}\r\n`,
    `{"command": "welcome", "actions": {}, "socketId": "id_2", issueTimestamp: 1644098160000}\r\n`,
  ];

  context.bufferHelper.onData(payload.join(''));

  assert.is(context.spies.eventNext.callCount, 2);
  assert.is(context.spies.eventNext.args[0][0], 'incomingCommand');
  assert.equal(context.spies.eventNext.args[0][1], payload[0].replace('\r\n', ''));
  assert.is(context.spies.eventNext.args[1][0], 'incomingCommand');
  assert.equal(context.spies.eventNext.args[1][1], payload[1].replace('\r\n', ''));
});

test.run();
