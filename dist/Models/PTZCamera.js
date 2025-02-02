"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PTZCamera {
    constructor(panSpeed = 0x0c, tiltSpeed = 0x09) {
        this.cmdBase = [0x81, 0x01];
        this.cmdEnd = 0xff;
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
        this.panSpeed = panSpeed;
        this.tiltSpeed = tiltSpeed;
    }
    //#region Power
    powerOn() {
        const command = [...this.cmdBase];
        command.push(...this.cmd.power.on, this.cmdEnd);
        return command;
    }
    powerOff() {
        const command = [...this.cmdBase];
        command.push(...this.cmd.power.off, this.cmdEnd);
        return command;
    }
    //#endregion
    //#region Zoom commands
    zoomStop() {
        const command = [...this.cmdBase];
        command.push(...this.cmd.zoom.stop, this.cmdEnd);
        return command;
    }
    zoom(rate) {
        const command = [...this.cmdBase]; //0x81 0x01
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
        command.push(action, this.cmdEnd);
        return command;
    }
    zoomTele() {
        const command = [...this.cmdBase];
        command.push(...this.cmd.zoom.tele);
        command.push(this.cmdEnd);
        return command;
    }
    zoomWide() {
        const command = [...this.cmdBase];
        command.push(...this.cmd.zoom.wide);
        command.push(this.cmdEnd);
        return command;
    }
    //#endregion
    //#region Focus
    focusStop() {
        return [
            ...this.cmdBase,
            ...this.cmd.focus.stop,
            this.cmdEnd,
        ];
    }
    focusFar() {
        return [
            ...this.cmdBase,
            ...this.cmd.focus.far,
            this.cmdEnd,
        ];
    }
    focusNear() {
        return [
            ...this.cmdBase,
            ...this.cmd.focus.near,
            this.cmdEnd,
        ];
    }
    focusAuto() {
        return [
            ...this.cmdBase,
            ...this.cmd.focus.auto,
            this.cmdEnd,
        ];
    }
    focusManual() {
        return [
            ...this.cmdBase,
            ...this.cmd.focus.manual,
            this.cmdEnd,
        ];
    }
    focusPush2Set() {
        return [
            ...this.cmdBase,
            ...this.cmd.focus.push2Set,
            this.cmdEnd,
        ];
    }
    //#endregion
    //#region Presets
    presetGet(n) {
        const command = [...this.cmdBase, 0x04, 0x3f, 0x02];
        command.push(n);
        command.push(this.cmdEnd);
        return command;
    }
    presetSet(n) {
        const command = [...this.cmdBase, 0x04, 0x3f, 0x01];
        command.push(n);
        command.push(this.cmdEnd);
        return command;
    }
    // rate-0x00~0x07
    presetSpeed(n) {
        const command = [...this.cmdBase, 0x06, 0x20];
        command.push(n);
        command.push(this.cmdEnd);
        return command;
    }
    presetMotionLessOn() {
        return [
            ...this.cmdBase,
            ...this.cmd.presetMotionless.on,
            this.cmdEnd,
        ];
    }
    presetMotionLessOff() {
        return [
            ...this.cmdBase,
            ...this.cmd.presetMotionless.off,
            this.cmdEnd,
        ];
    }
    //#endregion
    //#region Pan-N-Tilt
    // Normal xRate-0x00~0x18 yRate-0x00~0x18
    moveVarSpeed(xRate, yRate) {
        const command = [...this.cmdBase, 0x06, 0x01];
        command.push(Math.abs(xRate));
        command.push(Math.abs(yRate));
        const pan = xRate === 0 ? 0x03 : xRate > 0 ? 0x02 : 0x01;
        command.push(pan);
        const tilt = yRate === 0 ? 0x03 : yRate > 0 ? 0x02 : 0x01;
        command.push(tilt);
        command.push(this.cmdEnd);
        return command;
    }
}
exports.default = PTZCamera;
//# sourceMappingURL=PTZCameraModel.js.map