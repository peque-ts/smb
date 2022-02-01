import { EventService, IUnsubscribeCommand } from '@pequehq/smb-commons';
import { wait } from '@pequehq/test';
import * as sinon from 'sinon';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { DI, loadProviders } from '../../test/test.utils';
import { UnsubscribeCommand } from './unsubscribe.command';

const test = suite('Subscribe Command');

test.before.each((context) => {
  context.sandbox = sinon.createSandbox();
  context.spies = {
    eventOn: context.sandbox.spy(EventService.prototype, 'on'),
    eventNext: context.sandbox.spy(EventService.prototype, 'next'),
  };
  context.commands = {
    unsubscribe: {
      command: 'unsubscribe',
      socketId: 'id_1',
      action: { topic: 'topic' },
      issueTimestamp: 1234567890,
    } as IUnsubscribeCommand,
  };

  loadProviders();
  context.unsubscribe = DI.get<UnsubscribeCommand>('UnsubscribeCommand');
  context.events = DI.get<EventService>('EventService');
});

test.after.each((context) => {
  context.sandbox.restore();
  DI.unsetAll();
});

test('should process an unsubscribe command', async (context) => {
  context.unsubscribe.init();

  assert.is(context.spies.eventOn.calledOnce, true);

  context.events.next('unsubscribe', context.commands.unsubscribe);

  await wait();

  assert.is(context.spies.eventNext.callCount, 2);
  assert.ok(context.spies.eventNext.calledWith('outgoingCommand', context.commands.unsubscribe));
});

test.run();
