import express from 'express';
import cors from 'cors';
import { getEnv } from 'utils/getEnv';

const PORT = +getEnv('PORT', '3000');
const app = express();

export const setupServer = () => {
  app.use(cors());
  app.use(express.json());

  app.listen(PORT, () => console.log(`App is running on port: ${PORT}`));
};
