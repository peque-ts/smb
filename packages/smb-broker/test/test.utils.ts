import { Container } from '@pequehq/di';
import { EventService } from '@pequehq/smb-commons';
import { loadDI } from '@pequehq/test';

import { MessageCommand, PublishCommand, SubscribeCommand, UnsubscribeCommand, WelcomeCommand } from '../src/commands';
import { SubscribeService } from '../src/services';

export const DI = new Container();

export const loadProviders = (): void =>
  loadDI(DI, [
    SubscribeService,
    EventService,
    MessageCommand,
    PublishCommand,
    SubscribeCommand,
    UnsubscribeCommand,
    WelcomeCommand,
  ]);
