"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MediaController_1 = __importDefault(require("../controllers/MediaController"));
const mediaRouter = (0, express_1.Router)();
const obsControls = new MediaController_1.default();
mediaRouter.use((req, res, next) => {
    next();
});
mediaRouter.get('/scene/:name', obsControls.setCurrentScene);
exports.default = mediaRouter;
//# sourceMappingURL=mediaRouter.js.map