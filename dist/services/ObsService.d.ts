declare class ObsService {
    private OBS_APP_PATH;
    private ADDRESS;
    private PASSWORD;
    private isOBSRunning;
    private isSocketConnected;
    private obsSocket;
    constructor();
    private initialize;
    private connect;
    getCurrentScene(): Promise<string>;
    setCurrentScene(name: string): Promise<void>;
    private setupEventListeners;
    private handleSceneChange;
}
export declare const obsService: ObsService;
export {};
