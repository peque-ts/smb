# Peque SMB (Simple Message Broker)

[![CI](https://github.com/peque-ts/smb/actions/workflows/ci.yml/badge.svg)](https://github.com/peque-ts/smb/actions/workflows/ci.yml)

| Package     | Coverage                                                                                                 | 
|-------------|----------------------------------------------------------------------------------------------------------|
| SMB Commons | ![coverage](https://raw.githubusercontent.com/peque-ts/smb/main/packages/smb-commons/coverage-badge.svg) |
| SMB Broker  | ![coverage](https://raw.githubusercontent.com/peque-ts/smb/main/packages/smb-broker/coverage-badge.svg)  |
| SMB Client  | ![coverage](https://raw.githubusercontent.com/peque-ts/smb/main/packages/smb-client/coverage-badge.svg)  |

Peque SMB (Simple Message Broker), is a TCP based Redis-like Pub/Sub type of message broker.

## SMB Broker

### Install

```shell
npm install @pequehq/smb-broker @pequehq/smb-commons reflect-metadata
```

### Example

The broker can either be started via code, if you want to add any additional logic, or it can be started via
command line.

```shell
export $PORT=8021
export $HOSTNAME="127.0.0.1"
smb-broker 
```

```typescript
import { BrokerFactory } from '@pequehq/smb-broker';
const broker = new BrokerFactory().createBroker();

async function startBroker(): Promise<void> {
  await broker.create();
}

startBroker().then(() => {
  // things.
});
``` 

## SMB Client

Subscription supports RegEx topics in order to subscribe to topics or pattern-topics.

### Install

```shell
npm install @pequehq/smb-client @pequehq/smb-commons reflect-metadata
```

### Example

```typescript
import { BrokerClientFactory } from '@pequehq/smb-client';

const idOne = await clientOne.connect({ connectionTimeout: 10000 });
const idTwo = await clientTwo.connect({ connectionTimeout: 10000 });

console.log(`Client One ID: ${idOne}`, `Client Tow ID: ${idTwo}`);

clientOne.subscribe('^topic', (command) => console.log(command.action.message));

clientTwo.message('topic', { test: 'message topic' });
clientTwo.message('topic_other', { test: 'messate topic_other' });
``` 
