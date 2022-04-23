import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import getPrice from './utils/getPrice';
import { scheduleJob } from 'node-schedule';

dotenv.config();

const PORT = process.env.PORT || 3001

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.sendStatus(200));
app.get('/get_price', async (_req, res) => {
  const data = await getPrice();

  return res.send(data);
})

app.listen(PORT, () => {
  console.info(`🚀 Server is running at PORT: ${PORT} 🚀🚀 `);
  scheduleJob('0 */3 * * *', () => getPrice().catch((err) => console.error(err.message)));
});