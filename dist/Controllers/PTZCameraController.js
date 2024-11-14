"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dgram_1 = __importDefault(require("dgram"));
const PTZCameraModel_1 = __importDefault(require("../models/PTZCameraModel"));
const dotenv_1 = __importDefault(require("dotenv"));
const os_1 = __importDefault(require("os"));
dotenv_1.default.config({ path: os_1.default.platform() === "win32" ? '.env.windows' : '.env.macos' });
class PTZCameraController {
    constructor(cameraPort, cameraAddress) {
        this.recallPresetId = (req, res) => {
            const { presetId } = req.params;
            const data = this.ptzCamera.presetGet(parseInt(presetId));
            const udpClient = dgram_1.default.createSocket('udp4');
            this.sequenceNumber++;
            const payload = Buffer.from(data);
            const payloadLength = payload.length;
            const header = Buffer.alloc(8);
            header.writeUInt8(0x01, 0); // Payload type Byte 1
            header.writeUInt8(0x01, 1); // Payload type Byte 2
            header.writeUInt16BE(payloadLength, 2); // Payload length (Bytes 2-3)
            header.writeUInt32BE(this.sequenceNumber, 4); // Sequence number (Bytes 4-7)
            const message = Buffer.concat([header, payload]);
            console.log('Message Buffer:', message);
            console.log('Message Hex:', message.toString('hex'));
            udpClient.send(message, this.cameraPort, this.cameraAddress, (error) => {
                if (error) {
                    console.error('Error sending command:', error);
                    res.status(500).send('Error sending command');
                }
                else {
                    console.log(`Preset ${presetId} has been called and set`);
                    res.status(200).json({
                        Message: `Preset ${presetId} has been called and set`,
                    });
                }
                udpClient.close();
            });
        };
        this.setPresetId = (req, res) => {
            const presetId = req.body.presetId;
            const data = this.ptzCamera.presetSet(parseInt(presetId));
            const udpClient = dgram_1.default.createSocket('udp4');
            this.sequenceNumber++;
            const payload = Buffer.from(data);
            const payloadLength = payload.length;
            const header = Buffer.alloc(8);
            header.writeUInt8(0x01, 0); // Payload type Byte 1
            header.writeUInt8(0x01, 1); // Payload type Byte 2
            header.writeUInt16BE(payloadLength, 2); // Payload length (Bytes 2-3)
            header.writeUInt32BE(this.sequenceNumber, 4); // Sequence number (Bytes 4-7)
            const message = Buffer.concat([header, payload]);
            console.log('Message Buffer:', message);
            console.log('Message Hex:', message.toString('hex'));
            udpClient.send(message, this.cameraPort, this.cameraAddress, (error) => {
                if (error) {
                    console.error('Error sending command:', error);
                    res.status(500).send('Error sending command');
                }
                else {
                    console.log(`Preset ${presetId} has been stored`);
                    res.status(201).json({
                        Message: `Preset ${presetId} has been stored`,
                    });
                }
                udpClient.close();
            });
        };
        this.zoom = (req, res) => {
            const { speed } = req.params;
            const data = this.ptzCamera.zoom(parseInt(speed));
            const udpClient = dgram_1.default.createSocket('udp4');
            this.sequenceNumber++;
            const payload = Buffer.from(data);
            const payloadLength = payload.length;
            const header = Buffer.alloc(8);
            header.writeUInt8(0x01, 0); // Payload type Byte 1
            header.writeUInt8(0x01, 1); // Payload type Byte 2
            header.writeUInt16BE(payloadLength, 2); // Payload length (Bytes 2-3)
            header.writeUInt32BE(this.sequenceNumber, 4); // Sequence number (Bytes 4-7)
            const message = Buffer.concat([header, payload]);
            console.log('Message Buffer:', message);
            console.log('Message Hex:', message.toString('hex'));
            udpClient.send(message, this.cameraPort, this.cameraAddress, (error) => {
                if (error) {
                    console.error('Error sending command:', error);
                    res.status(500).send('Error sending command');
                }
                else {
                    console.log(`Zoom ${speed} has been called and set`);
                    res.status(200).json({
                        Message: `Zoom ${speed} has been called and set`,
                    });
                }
                udpClient.close();
            });
        };
        this.moveVarSpeed = (req, res) => {
            const { pan, tilt } = req.query;
            const data = this.ptzCamera.moveVarSpeed(parseInt(pan), parseInt(tilt));
            const udpClient = dgram_1.default.createSocket('udp4');
            this.sequenceNumber++;
            const payload = Buffer.from(data);
            const payloadLength = payload.length;
            const header = Buffer.alloc(8);
            header.writeUInt8(0x01, 0); // Payload type Byte 1
            header.writeUInt8(0x01, 1); // Payload type Byte 2
            header.writeUInt16BE(payloadLength, 2); // Payload length (Bytes 2-3)
            header.writeUInt32BE(this.sequenceNumber, 4); // Sequence number (Bytes 4-7)
            const message = Buffer.concat([header, payload]);
            console.log('Message Buffer:', message);
            console.log('Message Hex:', message.toString('hex'));
            udpClient.send(message, this.cameraPort, this.cameraAddress, (error) => {
                if (error) {
                    console.error('Error sending command:', error);
                    res.status(500).send('Error sending command');
                }
                else {
                    console.log(`The pan and tilt speeds of: ${pan} and ${tilt} have been called and set`);
                    res.status(200).json({
                        Message: `The pan and tilt speeds of: ${pan} and ${tilt} have been called and set`,
                    });
                }
                udpClient.close();
            });
        };
        this.ptzCamera = new PTZCameraModel_1.default();
        this.cameraPort = cameraPort;
        this.cameraAddress = cameraAddress;
        this.sequenceNumber = 0;
    }
}
exports.default = PTZCameraController;
//# sourceMappingURL=PTZCameraController.js.map