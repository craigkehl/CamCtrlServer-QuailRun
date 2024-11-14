import { Router } from 'express';
import PTZCameraController from '../controllers/PTZCameraController';

const ptzCameraRouter = Router();
const ptzCameraController = new PTZCameraController(52381, '192.168.108.164');

ptzCameraRouter.use((req, res, next) => {
  next();
});

ptzCameraRouter.get('/preset/:presetId', ptzCameraController.recallPresetId);

ptzCameraRouter.post('/preset', ptzCameraController.setPresetId);

ptzCameraRouter.get('/zoom/:speed', ptzCameraController.zoom);

ptzCameraRouter.get('/move', ptzCameraController.moveVarSpeed);

export default ptzCameraRouter;
