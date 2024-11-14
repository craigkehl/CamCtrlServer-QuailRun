"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MediaController_1 = __importDefault(require("../controllers/MediaController"));
const obsRouter = (0, express_1.Router)();
const obsControls = new MediaController_1.default();
obsRouter.use((req, res, next) => {
    next();
});
obsRouter.get('/scene/:name', obsControls.setCurrentScene);
exports.default = obsRouter;
//# sourceMappingURL=obs.js.map