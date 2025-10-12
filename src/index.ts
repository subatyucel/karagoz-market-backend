import { initMongoDB } from 'db/initMongoDB';
import { setupServer } from 'server';

const startApp = async () => {
  await initMongoDB();
  setupServer();
};

startApp();
