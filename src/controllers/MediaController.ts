import { Request, Response } from 'express';
import { obsService } from '../services/ObsService';

class MediaController {
  public async setCurrentScene(req: Request, res: Response): Promise<void> {
    const { name } = req.params;
    try {
      await obsService.setCurrentScene(name);
      res.status(200).json({ message: `Scene changed to ${name}` });
    } catch (error) {
      res.status(500).json({ error: 'Failed to change scene' });
    }
  }

  public async getCurrentScene(req: Request, res: Response): Promise<void> {
    try {
      const sceneName = await obsService.getCurrentScene();
      res.status(200).json({ currentScene: sceneName });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get current scene' });
    }
  }
}

export default MediaController;