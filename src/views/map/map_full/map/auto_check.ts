import { bus, BUS_EVENT } from './bus';
/**
 * @file 自动巡检
 */

import * as THREE from 'three';
import { idcPosVal } from '.';

interface AutoCheckIDCOptions {
    positionMap: Map<string, idcPosVal>;
    timeInterval: number;
}

type Callback = (key: string, value: THREE.Vector3, prevKey: string, isWarning: boolean) => void;
export class AutoCheckIDC {
    private positionMap;
    private timer: any | null;
    private timeInterval: number;
    public positionArr: THREE.Vector3[];
    public positionKeys: string[];

    public constructor(options: AutoCheckIDCOptions) {
        this.positionMap = options.positionMap;
        this.positionArr = [...this.positionMap.values()].map(idc => idc.position);
        this.positionKeys = [...this.positionMap.keys()];
        this.timeInterval = options.timeInterval;

        bus.listen(BUS_EVENT.CLICK_IDC, () => {
            this.clear();
        });
    }

    public start(callback: Callback) {
        this.timer = setInterval(this.check.bind(this, callback), this.timeInterval);
    }
    private check(callback: Callback) {
        const prevKey = this.positionKeys.slice(-1)[0];

        const value = this.positionArr.shift()!;
        const key = this.positionKeys.shift()!;

        const isWarning = this.positionMap.get(key)?.idc.isWarning;

        callback?.(key, value, prevKey, isWarning!);

        this.positionArr.push(value!);
        this.positionKeys.push(key!);
    }
    public pause() {

    }
    public clear() {
        clearInterval(this.timer);
        this.timer = null;
    }
}
