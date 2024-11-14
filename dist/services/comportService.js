"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComportService = void 0;
const serialport_1 = __importDefault(require("serialport"));
const dotenv_1 = __importDefault(require("dotenv"));
const os_1 = __importDefault(require("os"));
dotenv_1.default.config({ path: os_1.default.platform() === "win32" ? '.env.windows' : '.env.macos' });
const CAM_SERIAL_PORT = process.env.CAM_SERIAL_PORT || 'COM6';
const CAM_PORT_SETTINGS = {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
};
class ComportService {
    constructor() {
        this.port = new serialport_1.default(CAM_SERIAL_PORT, CAM_PORT_SETTINGS);
        this.port.on('error', function (err) {
            console.log('Camera port connection error: ', err.message);
        });
    }
    connect() {
        this.port.open((err) => {
            if (err) {
                return console.log('Error opening port: ', err.message);
            }
            console.log('Port opened successfully');
        });
    }
    disconnect() {
        this.port.close((err) => {
            if (err) {
                return console.log('Error closing port: ', err.message);
            }
            console.log('Port closed successfully');
        });
    }
    on(event, callback) {
        this.port.on(event, callback);
    }
    write(data, callback) {
        this.port.write(data, callback);
    }
}
exports.ComportService = ComportService;
//# sourceMappingURL=comportService.js.map