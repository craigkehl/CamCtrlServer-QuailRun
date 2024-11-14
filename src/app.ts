import express, { Application } from 'express';
import Cors from 'cors';

import dotenv from 'dotenv';

import ptzCameraRouter from './routes/ptzCameraRouter'
import mediaRouter from './routes/mediaRouter';

dotenv.config();

const app: Application = express();

app.use(Cors());
app.use(express.json());

app.use('/api/ptz', ptzCameraRouter)
app.use('/api/media', mediaRouter)

app.listen(4000, () => {
  console.log('listening on port 4000');
});