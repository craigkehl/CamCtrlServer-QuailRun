"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ObsService_1 = require("../services/ObsService");
class MediaController {
    setCurrentScene(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            try {
                yield ObsService_1.obsService.setCurrentScene(name);
                res.status(200).json({ message: `Scene changed to ${name}` });
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to change scene' });
            }
        });
    }
    getCurrentScene(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sceneName = yield ObsService_1.obsService.getCurrentScene();
                res.status(200).json({ currentScene: sceneName });
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to get current scene' });
            }
        });
    }
}
exports.default = MediaController;
//# sourceMappingURL=MediaController.js.map