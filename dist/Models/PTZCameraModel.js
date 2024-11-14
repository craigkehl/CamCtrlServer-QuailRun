"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PTZCameraModel {
    constructor(panSpeed = 0x0c, tiltSpeed = 0x09) {
        this.CMD_BASE = [0x81, 0x01];
        this.CMD_END = 0xff;
        this.cmd = {
            power: {
                on: [0x04, 0x00, 0x02],
                off: [0x04, 0x00, 0x03],
            },
            zoom: {
                var: [0x04, 0x07],
                stop: [0x04, 0x07, 0x00],
                tele: [0x04, 0x07, 0x02],
                wide: [0x04, 0x07, 0x03],
            },
            focus: {
                stop: [0x04, 0x08, 0x00],
                far: [0x04, 0x08, 0x02],
                near: [0x04, 0x08, 0x03],
                auto: [0x04, 0x38, 0x02],
                manual: [0x04, 0x38, 0x03],
                push2Set: [0x04, 0x18, 0x01],
            },
            resolution: {
                p1080_60: [0x06, 0x35, 0x00, 0x00],
                p1080_50: [0x06, 0x35, 0x00, 0x01],
                p1080_30: [0x06, 0x35, 0x00, 0x02],
                p1080_25: [0x06, 0x35, 0x00, 0x03],
                i1080_60: [0x06, 0x35, 0x00, 0x04],
                i1080_50: [0x06, 0x35, 0x00, 0x05],
                p720_60: [0x06, 0x35, 0x00, 0x06],
                p720_50: [0x06, 0x35, 0x00, 0x07],
                p720_30: [0x06, 0x35, 0x00, 0x08],
                p720_25: [0x06, 0x35, 0x00, 0x09],
                p1080_5994: [0x06, 0x35, 0x00, 0x0A],
                i1080_5994: [0x06, 0x35, 0x00, 0x0B],
                p1080_2997: [0x06, 0x35, 0x00, 0x0C],
                p720_5994: [0x06, 0x35, 0x00, 0x0D],
                p720_2997: [0x06, 0x35, 0x00, 0x0E],
            },
            presetMotionless: {
                on: [0x07, 0x01, 0x02],
                off: [0x07, 0x01, 0x03],
            },
        };
        //#endregion
        //#region Get Status
        this.QUERY_BASE = [0x81, 0x09];
        this.isMenuOpen = false;
        this.panSpeed = panSpeed;
        this.tiltSpeed = tiltSpeed;
    }
    //#region Power
    powerOn() {
        const command = [...this.CMD_BASE];
        command.push(...this.cmd.power.on, this.CMD_END);
        return command;
    }
    powerOff() {
        const command = [...this.CMD_BASE];
        command.push(...this.cmd.power.off, this.CMD_END);
        return command;
    }
    //#endregion
    //#region Zoom commands
    zoomStop() {
        const command = [...this.CMD_BASE];
        command.push(...this.cmd.zoom.stop, this.CMD_END);
        return command;
    }
    zoom(rate) {
        const command = [...this.CMD_BASE]; //0x81 0x01
        command.push(...this.cmd.zoom.var); //0x04 0x07
        let action;
        if (rate === 0) {
            action = 0x00;
        }
        else if (rate > 0) {
            action = 0x20 + rate;
        }
        else {
            action = 0x30 + rate * -1;
        }
        command.push(action, this.CMD_END);
        return command;
    }
    zoomTele() {
        const command = [...this.CMD_BASE];
        command.push(...this.cmd.zoom.tele);
        command.push(this.CMD_END);
        return command;
    }
    zoomWide() {
        const command = [...this.CMD_BASE];
        command.push(...this.cmd.zoom.wide);
        command.push(this.CMD_END);
        return command;
    }
    //#endregion
    //#region Focus
    focusStop() {
        return [
            ...this.CMD_BASE,
            ...this.cmd.focus.stop,
            this.CMD_END,
        ];
    }
    focusFar() {
        return [
            ...this.CMD_BASE,
            ...this.cmd.focus.far,
            this.CMD_END,
        ];
    }
    focusNear() {
        return [
            ...this.CMD_BASE,
            ...this.cmd.focus.near,
            this.CMD_END,
        ];
    }
    focusAuto() {
        return [
            ...this.CMD_BASE,
            ...this.cmd.focus.auto,
            this.CMD_END,
        ];
    }
    focusManual() {
        return [
            ...this.CMD_BASE,
            ...this.cmd.focus.manual,
            this.CMD_END,
        ];
    }
    focusPush2Set() {
        return [
            ...this.CMD_BASE,
            ...this.cmd.focus.push2Set,
            this.CMD_END,
        ];
    }
    //#endregion
    //#region Presets
    presetGet(n) {
        const command = [...this.CMD_BASE, 0x04, 0x3f, 0x02];
        command.push(n);
        command.push(this.CMD_END);
        return command;
    }
    presetSet(n) {
        const command = [...this.CMD_BASE, 0x04, 0x3f, 0x01];
        command.push(n);
        command.push(this.CMD_END);
        return command;
    }
    // rate-0x00~0x07
    presetSpeed(n) {
        const command = [...this.CMD_BASE, 0x06, 0x20];
        command.push(n);
        command.push(this.CMD_END);
        return command;
    }
    presetMotionLessOn() {
        return [
            ...this.CMD_BASE,
            ...this.cmd.presetMotionless.on,
            this.CMD_END,
        ];
    }
    presetMotionLessOff() {
        return [
            ...this.CMD_BASE,
            ...this.cmd.presetMotionless.off,
            this.CMD_END,
        ];
    }
    //#endregion
    //#region Pan-N-Tilt
    // Normal xRate-0x00~0x18 yRate-0x00~0x18
    moveVarSpeed(xRate, yRate) {
        const command = [...this.CMD_BASE, 0x06, 0x01];
        command.push(Math.abs(xRate));
        command.push(Math.abs(yRate));
        const pan = xRate === 0 ? 0x03 : xRate > 0 ? 0x02 : 0x01;
        command.push(pan);
        const tilt = yRate === 0 ? 0x03 : yRate > 0 ? 0x02 : 0x01;
        command.push(tilt);
        command.push(this.CMD_END);
        return command;
    }
    //#endregion
    //#region Menu Control
    // async openMenu(): Promise<boolean> {
    //   let trys = 3;
    //   while (trys > 0) {
    //     try {
    //       if (await this.isMenuOpen()) {
    //         return true;
    //       }
    //       const result = await this.cameraPort.write(this.menuOn(), function (err,bytesWritten) {
    //         if (err) {
    //           throw new Error(`Error on write: ${err.message}`);
    //         }
    //         console.log('"Open Menu" requested.')
    //       })
    //     }
    //   }
    // }
    // private isMenuOpen(): void {
    //   this.cameraPort.write(this.getMenuStatus(), function(err) {
    //     if (err) {
    //       return console.log('Error on write: ', err.message)
    //     }
    //     console.log('message written');
    //   });
    // }
    menuOn() {
        return [...this.CMD_BASE, 0x04, 0x3f, 0x0f, 0x02, this.CMD_END];
    }
    navigateUp() {
        return [...this.CMD_BASE, 0x06, 0x01, 0x0E, 0x0E, 0x03, 0x01, this.CMD_END];
    }
    navigateDown() {
        return [...this.CMD_BASE, 0x06, 0x01, 0x0E, 0x0E, 0x03, 0x02, this.CMD_END];
    }
    navigateLeft() {
        return [...this.CMD_BASE, 0x06, 0x01, 0x0E, 0x0E, 0x01, 0x03, this.CMD_END];
    }
    navigateRight() {
        return [...this.CMD_BASE, 0x06, 0x01, 0x0E, 0x0E, 0x02, 0x03, this.CMD_END];
    }
    menuEnter() {
        return [...this.CMD_BASE, 0x06, 0x06, 0x05, this.CMD_END];
    }
    menuReturn() {
        return [...this.CMD_BASE, 0x06, 0x06, 0x04, this.CMD_END];
    }
    // response packet: 0x90 0x50 (0x02 = on, 0x03 = off) 0xff
    getPowerStatus() {
        return [...this.QUERY_BASE, 0x04, 0x00, this.CMD_END];
    }
    // response packet: 0x 0x50 ( 0x02 = on, 0x03 = off) 0xff
    getMenuStatus() {
        return [...this.QUERY_BASE, 0x06, 0x06, this.CMD_END];
    }
    // response packet: 0x90 0x50 0x__ 0x__ 0x__ 0x__ 0xff
    getZoomPosition() {
        return [...this.QUERY_BASE, 0x04, 0x47, this.CMD_END];
    }
    // response packet: 0x90 0x50 (
    //   0x__ 0x__ 0x__ 0x__ = pan,
    //   0x__ 0x__ 0x__ 0x__ = tilt
    //) 0xff
    getPanTiltPosition() {
        return [...this.QUERY_BASE, 0x06, 0x12, this.CMD_END];
    }
    // response packet: 0x90 0x50 0x__ 0x__ 0x__ 0x__ 0xff
    getFocusPosition() {
        return [...this.QUERY_BASE, 0x04, 0x48, this.CMD_END];
    }
    // response packet: 0x90 0x50 (0x02 = auto, 0x03 = manual) 0xff
    getFocusMode() {
        return [...this.QUERY_BASE, 0x04, 0x38, this.CMD_END];
    }
}
exports.default = PTZCameraModel;
//# sourceMappingURL=PTZCameraModel.js.map