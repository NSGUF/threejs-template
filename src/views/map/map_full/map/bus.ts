/**
 * @file 发布订阅器
 */

export const BUS_EVENT = {
    AUTO_CHECK_IDC: 'auto-check-idc',
    CLICK_IDC: 'click-idc',
    BACK_CHINA_MAP: 'back-china-map',
    CHANGE_RACK: 'change-rack'
};
class Bus {
    private events = new Map();

    public trigger(type: string, payload: unknown) {
        let cb = this.events.get(type);
        cb?.(payload);
    }
    public listen(type: string, cb: Function) {
        if (this.events.get(type)) return;
        this.events.set(type, cb);
    }
}

export const bus = new Bus();