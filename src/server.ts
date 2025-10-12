import express from 'express';
import cors from 'cors';
import { getEnv } from 'utils/getEnv';
import { errorHandler } from 'middlewares/errorHandler';

const PORT = +getEnv('PORT', '3000');
const app = express();

export const setupServer = () => {
  app.use(cors());
  app.use(express.json());

  app.use(errorHandler);
  app.listen(PORT, () => console.log(`App is running on port: ${PORT}`));
};
