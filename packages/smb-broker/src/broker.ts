import { BrokerFactory } from './server';

const server = new BrokerFactory().createBroker();

const start = async (): Promise<void> => {
  await server.create();
};

start();
