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
exports.obsService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const os_1 = __importDefault(require("os"));
const obs_websocket_js_1 = __importDefault(require("obs-websocket-js"));
dotenv_1.default.config({ path: os_1.default.platform() === "win32" ? '.env.windows' : '.env.macos' });
class ObsService {
    constructor() {
        this.OBS_APP_PATH = process.env.OBS_APP_PATH || 'C:\\path\\to\\OBS\\obs64.exe';
        this.ADDRESS = process.env.OBS_ADDRESS || 'ws://192.168.108.2:4455';
        this.PASSWORD = process.env.OBS_PASSWORD;
        this.isOBSRunning = false;
        this.isSocketConnected = false;
        this.obsSocket = new obs_websocket_js_1.default();
        this.initialize();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            this.setupEventListeners();
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { obsWebSocketVersion, negotiatedRpcVersion } = yield this.obsSocket.connect(this.ADDRESS, this.PASSWORD);
                console.log(`Connected to server ${obsWebSocketVersion} (using RPC ${negotiatedRpcVersion})`);
                this.isSocketConnected = true;
            }
            catch (error) {
                console.error('Failed to connect to OBS', error.code, error.message);
            }
        });
    }
    getCurrentScene() {
        return __awaiter(this, void 0, void 0, function* () {
            const { currentProgramSceneName } = yield this.obsSocket.call('GetCurrentProgramScene');
            return currentProgramSceneName;
        });
    }
    setCurrentScene(name) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('scene: ' + name);
            return yield this.obsSocket.call('SetCurrentProgramScene', { sceneName: name });
        });
    }
    setupEventListeners() {
        this.obsSocket.on('CurrentProgramSceneChanged', event => {
            this.handleSceneChange(event.sceneName);
        });
        this.obsSocket.once('ExitStarted', () => {
            console.log('OBS started shutdown');
        });
    }
    handleSceneChange(sceneName) {
        console.log(`Scene changed to: ${sceneName}`);
        // Notify other parts of the application if needed
    }
}
exports.obsService = new ObsService();
//# sourceMappingURL=ObsService.js.map