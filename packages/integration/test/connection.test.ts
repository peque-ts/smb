import { BrokerClientFactory } from '@pequehq/smb-client';
import { BrokerFactory } from '@pequehq/smb-server';

const broker = new BrokerFactory().createBroker();
const clientOne = new BrokerClientFactory().createClient();
const clientTwo = new BrokerClientFactory().createClient();

async function startBroker(): Promise<void> {
  await broker.create();
}

startBroker().then(async () => {
  const idOne = await clientOne.connect();
  const idTwo = await clientTwo.connect();

  console.log(1, idOne, 2, idTwo);
  clientOne.subscribe('^topic', (command) => console.log(command));
  clientTwo.message('topic', { test: 'message topic' });
  setTimeout(() => clientTwo.message('topic_other', { test: 'messate topic_other' }), 100);
});
