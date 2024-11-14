import { Request, Response } from 'express';
declare class MediaController {
    setCurrentScene(req: Request, res: Response): Promise<void>;
    getCurrentScene(req: Request, res: Response): Promise<void>;
}
export default MediaController;
