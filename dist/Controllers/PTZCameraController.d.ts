import { Request, Response } from 'express';
declare class PTZCameraController {
    private ptzCamera;
    private cameraPort;
    private cameraAddress;
    private sequenceNumber;
    constructor(cameraPort: number, cameraAddress: string);
    recallPresetId: (req: Request, res: Response) => void;
    setPresetId: (req: Request, res: Response) => void;
    zoom: (req: Request, res: Response) => void;
    moveVarSpeed: (req: Request, res: Response) => void;
}
export default PTZCameraController;
