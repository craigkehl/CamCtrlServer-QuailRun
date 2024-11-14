"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// IPPort.ts
const node_dgram_1 = __importDefault(require("node:dgram"));
const dotenv_1 = __importDefault(require("dotenv"));
const os_1 = __importDefault(require("os"));
dotenv_1.default.config({ path: os_1.default.platform() === "win32" ? '.env.windows' : '.env.macos' });
const CAM_IP_ADDRESS = process.env.CAM_IP_ADDRESS;
const CAM_PORT = process.env.CAM_PORT;
class IPPort {
    constructor() {
        this.ip = CAM_IP_ADDRESS;
        this.port = parseInt(CAM_PORT);
        this.client = node_dgram_1.default.createSocket('udp4');
        this.sequenceNumber = 1;
    }
    connect() {
        this.client.connect(this.port, this.ip, () => {
            console.log('Connected to camera');
        });
        this.client.on('error', (error) => {
            console.log('Camera connection error: ', error.message);
        });
    }
    disconnect() {
        this.client.end();
        console.log('Disconnected from camera');
    }
    write(data, callback) {
        let bufferData;
        if (typeof data === 'string') {
            bufferData = Buffer.from(data);
        }
        else if (Array.isArray(data)) {
            bufferData = Buffer.from(data);
        }
        else {
            bufferData = data;
        }
        // Convert data to Uint8Array
        const uint8ArrayData = new Uint8Array(bufferData);
        this.client.write(uint8ArrayData, (error) => {
            if (error) {
                const bytesWritten = 0;
                callback(error, bytesWritten);
            }
            else {
                const bytesWritten = Buffer.byteLength(data.toString());
                callback(null, bytesWritten);
            }
        });
        this.client.on('data', (data) => {
            console.log('Received: ' + data.toString('hex'));
        });
        this.client.on('close', () => {
            console.log('Connection closed');
        });
        this.client.on('error', (err) => {
            console.error('Connection error: ', err);
        });
    }
}
exports.default = IPPort;
//# sourceMappingURL=IPPort.js.map