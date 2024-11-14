import { Router } from 'express';
import MediaController from '../controllers/MediaController';

const mediaRouter = Router();
const obsControls = new MediaController();

mediaRouter.use((req, res, next) => {
  next();
});

mediaRouter.get('/scene/:name', obsControls.setCurrentScene);

export default mediaRouter;
