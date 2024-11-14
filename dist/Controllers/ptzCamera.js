"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveVarSpeed = exports.zoom = exports.setPresetId = exports.recallPresetId = void 0;
const PTZCamera_1 = __importDefault(require("../Models/PTZCamera"));
const comport_1 = require("../util/comport");
const ptzCamera = new PTZCamera_1.default();
const recallPresetId = (req, res) => {
    const params = req.params;
    const presetId = params.presetId;
    const command = ptzCamera.presetGet(parseInt(presetId));
    comport_1.camPort.write(command, function (err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        // console.log(`command ${command} was written to camPort`);
        // camPort.once('drain', function () {
        //   console.log('Drain event fired, all commands have been written');
        // });
        console.log(`Preset ${presetId} has been called and set`);
        res.status(200).json({
            Message: `Preset ${presetId} has been called and set`,
        });
    });
};
exports.recallPresetId = recallPresetId;
const setPresetId = (req, res) => {
    const presetId = req.body.presetId;
    const command = ptzCamera.presetSet(parseInt(presetId));
    comport_1.camPort.write(command, function (err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log(`Preset ${presetId} has been stored`);
        res.status(201).json({
            Message: `Preset ${presetId} has been stored`,
        });
    });
};
exports.setPresetId = setPresetId;
const zoom = (req, res) => {
    const params = req.params;
    const speed = params.speed;
    const command = ptzCamera.zoom(parseInt(speed));
    comport_1.camPort.write(command, function (err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log(`Zoom ${speed} has been called and set`);
        res.status(200).json({
            Message: `Zoom ${speed} has been called and set`,
        });
    });
};
exports.zoom = zoom;
const moveVarSpeed = (req, res) => {
    const pan = req.query.pan;
    const tilt = req.query.tilt;
    const command = ptzCamera.moveVarSpeed(parseInt(pan), parseInt(tilt));
    comport_1.camPort.write(command, function (err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log(`The pan and tilt speeds of: ${pan} and ${tilt} have been called and set`);
        res.status(200).json({
            Message: `The pan and tilt speeds of: ${pan} and ${tilt} have been called and set`,
        });
    });
};
exports.moveVarSpeed = moveVarSpeed;
//# sourceMappingURL=ptzCamera.js.map