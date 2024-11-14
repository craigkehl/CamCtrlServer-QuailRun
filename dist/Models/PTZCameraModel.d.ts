declare class PTZCameraModel {
    private panSpeed;
    private tiltSpeed;
    private isMenuOpen;
    constructor(panSpeed?: number, tiltSpeed?: number);
    readonly CMD_BASE: number[];
    readonly CMD_END: number;
    readonly cmd: {
        power: {
            on: number[];
            off: number[];
        };
        zoom: {
            var: number[];
            stop: number[];
            tele: number[];
            wide: number[];
        };
        focus: {
            stop: number[];
            far: number[];
            near: number[];
            auto: number[];
            manual: number[];
            push2Set: number[];
        };
        resolution: {
            p1080_60: number[];
            p1080_50: number[];
            p1080_30: number[];
            p1080_25: number[];
            i1080_60: number[];
            i1080_50: number[];
            p720_60: number[];
            p720_50: number[];
            p720_30: number[];
            p720_25: number[];
            p1080_5994: number[];
            i1080_5994: number[];
            p1080_2997: number[];
            p720_5994: number[];
            p720_2997: number[];
        };
        presetMotionless: {
            on: number[];
            off: number[];
        };
    };
    powerOn(): number[];
    powerOff(): number[];
    zoomStop(): number[];
    zoom(rate: number): number[];
    zoomTele(): number[];
    zoomWide(): number[];
    focusStop(): number[];
    focusFar(): number[];
    focusNear(): number[];
    focusAuto(): number[];
    focusManual(): number[];
    focusPush2Set(): number[];
    presetGet(n: number): number[];
    presetSet(n: number): number[];
    presetSpeed(n: number): number[];
    presetMotionLessOn(): number[];
    presetMotionLessOff(): number[];
    moveVarSpeed(xRate: number, yRate: number): number[];
    menuOn(): number[];
    navigateUp(): number[];
    navigateDown(): number[];
    navigateLeft(): number[];
    navigateRight(): number[];
    menuEnter(): number[];
    menuReturn(): number[];
    readonly QUERY_BASE: number[];
    getPowerStatus(): number[];
    getMenuStatus(): number[];
    getZoomPosition(): number[];
    getPanTiltPosition(): number[];
    getFocusPosition(): number[];
    getFocusMode(): number[];
}
export default PTZCameraModel;
