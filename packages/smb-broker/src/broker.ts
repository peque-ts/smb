import { BrokerFactory } from './server/broker.factory';

const server = new BrokerFactory().createBroker();

const start = async (): Promise<void> => {
  await server.create();
};

start();
