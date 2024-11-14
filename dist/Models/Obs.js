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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCurrentScene = exports.getCurrentScene = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const os_1 = __importDefault(require("os"));
const obs_websocket_js_1 = __importDefault(require("obs-websocket-js"));
const obs_1 = require("../Controllers/obs");
//TODO: Update to only connect to OBS if it is needed
//TODO: Refine connection logic: Check if not connected, if not check if OBS is running, ect...
dotenv_1.default.config({ path: os_1.default.platform() === "win32" ? '.env.windows' : '.env.macos' });
const OBS_APP_PATH = process.env.OBS_APP_PATH || 'C:\\path\\to\\OBS\\obs64.exe';
const ADDRESS = process.env.OBS_ADDRESS || 'ws://192.168.108.2:4455';
const PASSWORD = process.env.OBS_PASSWORD;
let isOBSRunning = false;
let isSocketConnected = false;
const obsSocket = new obs_websocket_js_1.default();
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { obsWebSocketVersion, negotiatedRpcVersion } = yield obsSocket.connect(ADDRESS, PASSWORD);
            console.log(`Connected to server ${obsWebSocketVersion} (using RPC ${negotiatedRpcVersion})`);
            isSocketConnected = true;
        }
        catch (error) {
            console.error('Failed to connect to OBS', error.code, error.message);
        }
    });
}
function getCurrentScene() {
    return __awaiter(this, void 0, void 0, function* () {
        const { currentProgramSceneName } = yield obsSocket.call('GetCurrentProgramScene');
        return currentProgramSceneName;
    });
}
exports.getCurrentScene = getCurrentScene;
function setCurrentScene(name) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('scene: ' + name);
        return yield obsSocket.call('SetCurrentProgramScene', { sceneName: name });
    });
}
exports.setCurrentScene = setCurrentScene;
obsSocket.on('CurrentProgramSceneChanged', event => {
    (0, obs_1.onSceneChange)(event.sceneName);
});
obsSocket.once('ExitStarted', () => {
    console.log('OBS started shutdown');
    // Just for example, not necessary should you want to reuse this instance by re-connect()
    // obs.off('CurrentProgramSceneChanged', onCurrentProgramSceneChanged);
});
// obsSocket.on('close', () => {
//   console.log('Socket connection to OBS closed.');
//   isSocketConnected = false;
// });
// obsSocket.on('error', (error: Error) => {
//   console.error('Socket encountered an error:', error.message);
// });
connect();
//# sourceMappingURL=Obs.js.map