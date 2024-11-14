"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.camPort = void 0;
const serialport_1 = __importDefault(require("serialport"));
const dotenv_1 = __importDefault(require("dotenv"));
const os_1 = __importDefault(require("os"));
console.log(`Platform: ${os_1.default.platform()}`);
dotenv_1.default.config({ path: os_1.default.platform() === "win32" ? '.env.windows' : '.env.macos' });
const CAM_SERIAL_PORT = process.env.CAM_SERIAL_PORT || '/dev/tty.usbserial-1330';
const CAM_PORT_SETTINGS = {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
};
// const port = new SerialPort('/dev/tty.usb0', {
exports.camPort = new serialport_1.default(CAM_SERIAL_PORT, CAM_PORT_SETTINGS);
exports.camPort.on('error', function (err) {
    console.log('Camera port connection error: ', err.message);
});
// camPort.on('readable', function () {
//   console.log('Data: ', camPort.read())
// })
// camPort.on('data', function (data) {
//   console.log('Data:', data);
// });
// camPort.on('write', function(data) {
//   console.log('Data written: ', data);
// });
//# sourceMappingURL=comport.js.map