"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PTZCameraController_1 = __importDefault(require("../controllers/PTZCameraController"));
const ptzCameraRouter = (0, express_1.Router)();
const ptzCameraController = new PTZCameraController_1.default();
ptzCameraRouter.use((req, res, next) => {
    next();
});
ptzCameraRouter.get('/preset/:presetId', ptzCameraController.recallPresetId);
ptzCameraRouter.post('/preset', ptzCameraController.setPresetId);
ptzCameraRouter.get('/zoom/:speed', ptzCameraController.zoom);
ptzCameraRouter.get('/move', ptzCameraController.moveVarSpeed);
exports.default = ptzCameraRouter;
//# sourceMappingURL=ptzCamera.js.map