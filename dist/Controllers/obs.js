"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onSceneChange = exports.setCurrentScene = void 0;
const Obs_1 = require("../Models/Obs");
const setCurrentScene = (req, res) => {
    const params = req.params;
    const name = params.name;
    const message = (0, Obs_1.setCurrentScene)(name);
    res.status(200).json({
        Message: message,
    });
    console.log(message);
};
exports.setCurrentScene = setCurrentScene;
const onSceneChange = (name) => {
    console.log(`scene changed to: ${name}`);
};
exports.onSceneChange = onSceneChange;
//# sourceMappingURL=obs.js.map