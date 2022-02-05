import { BrokerClientFactory } from '@pequehq/smb-client';
import { BrokerFactory } from '@pequehq/smb-broker';

const broker = new BrokerFactory().createBroker();
const clientOne = new BrokerClientFactory().createClient();
const clientTwo = new BrokerClientFactory().createClient();

async function startBroker(): Promise<void> {
  await broker.create();
}

startBroker().then(async () => {
  const idOne = await clientOne.connect({ connectionTimeout: 10000 });
  const idTwo = await clientTwo.connect({ connectionTimeout: 10000 });

  console.log(1, idOne, 2, idTwo);
  clientOne.subscribe('^topic', (command) => console.log(command));
  clientTwo.message('topic', { test: 'message topic' });
  // await wait(500);
  clientTwo.message('topic_other', { test: 'messate topic_other' });
});
