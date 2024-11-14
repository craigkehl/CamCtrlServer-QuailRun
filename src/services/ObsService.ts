import dotenv from 'dotenv';
import os from 'os';
import OBSWebSocket, {
  EventSubscription,
  OBSEventTypes,
  OBSRequestTypes,
  OBSResponseTypes,
} from 'obs-websocket-js';
import { exec } from 'child_process';

dotenv.config({ path: os.platform() === "win32" ? '.env.windows' : '.env.macos' });

class ObsService {
  private OBS_APP_PATH: string;
  private ADDRESS: string;
  private PASSWORD: string | undefined;
  private isOBSRunning: boolean;
  private isSocketConnected: boolean;
  private obsSocket: OBSWebSocket;

  constructor() {
    this.OBS_APP_PATH = process.env.OBS_APP_PATH || 'C:\\path\\to\\OBS\\obs64.exe';
    this.ADDRESS = process.env.OBS_ADDRESS || 'ws://192.168.108.2:4455';
    this.PASSWORD = process.env.OBS_PASSWORD;
    this.isOBSRunning = false;
    this.isSocketConnected = false;
    this.obsSocket = new OBSWebSocket();

    this.initialize();
  }

  private async initialize(): Promise<void> {
    await this.connect();
    this.setupEventListeners();
  }

  private async connect(): Promise<void> {
    try {
      const { obsWebSocketVersion, negotiatedRpcVersion } = await this.obsSocket.connect(
        this.ADDRESS,
        this.PASSWORD
      );
      console.log(
        `Connected to server ${obsWebSocketVersion} (using RPC ${negotiatedRpcVersion})`
      );
      this.isSocketConnected = true;
    } catch (error: any) {
      console.error('Failed to connect to OBS', error.code, error.message);
    }
  }

  public async getCurrentScene(): Promise<string> {
    const { currentProgramSceneName } = await this.obsSocket.call('GetCurrentProgramScene');
    return currentProgramSceneName;
  }

  public async setCurrentScene(name: string): Promise<void> {
    console.log('scene: ' + name);
    return await this.obsSocket.call('SetCurrentProgramScene', { sceneName: name });
  }

  private setupEventListeners(): void {
    this.obsSocket.on('CurrentProgramSceneChanged', event => {
      this.handleSceneChange(event.sceneName);
    });

    this.obsSocket.once('ExitStarted', () => {
      console.log('OBS started shutdown');
    });
  }

  private handleSceneChange(sceneName: string): void {
    console.log(`Scene changed to: ${sceneName}`);
    // Notify other parts of the application if needed
  }
}

export const obsService = new ObsService();