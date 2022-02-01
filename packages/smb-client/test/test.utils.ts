import { Container } from '@pequehq/di';
import { EventService } from '@pequehq/smb-commons';
import { loadDI } from '@pequehq/test';

import { MessageCommand, PublishCommand, SubscribeCommand, UnsubscribeCommand } from '../src';
import { SubscribeListenerService } from '../src';

export const DI = new Container();

export const loadProviders = (): void =>
  loadDI(DI, [
    SubscribeListenerService,
    EventService,
    MessageCommand,
    PublishCommand,
    SubscribeCommand,
    UnsubscribeCommand,
  ]);
