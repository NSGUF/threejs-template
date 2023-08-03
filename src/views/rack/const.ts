
// 轮播图时间： 7s
export const DEFAULT_TIME = 7000;

/**
 * 服务器状态: 对应接口字段
 * running：正常
 * offline：离线
 */
export const SERVICE_TYPE = {
    normal: 'running',
    offline: 'offline',
};

// 服务器状态--文案
export const SERVICE_TYPE_TEXT = {
    [SERVICE_TYPE.normal]: 'normal',
    [SERVICE_TYPE.offline]: 'offline'
};

export const RACK_OPERATE_TYPE = {
    SCALE_BIG: 'SCALE_BIG',
    TO_LEFT: 'TO_LEFT',
    TO_RIGHT: 'TO_RIGHT',
    NO_ACTION: 'NO_ACTION',
};

export const RACK_OPERATE_ROTATION = [RACK_OPERATE_TYPE.TO_RIGHT, RACK_OPERATE_TYPE.TO_LEFT];

// 当前canvas的长宽
export const w = 880;
export const h = 650;

// 小屏的宽度
export const SMALL_WIDTH = 1719;

/**
 * 是否是小屏
 * @return {boolean}
 */
export function isSmallScreen () {
    return (window.innerWidth || document.documentElement.clientWidth) < SMALL_WIDTH;
}

/**
 * 获取整个canvas的大小
 * @return {{width: number, height: number}}
 */
export function getWH () {

    // 小屏的缩小比例
    const SMALL_PROPORTION = 0.8;
    return isSmallScreen()
        ? {
            width: w * SMALL_PROPORTION,
            height: h * SMALL_PROPORTION
        }
        : {
            width: w,
            height: h
        };
}

export const THREE_JS_COLOR = {

    // 底部圆圈的颜色
    ROUND: 0x112154,

    // 机柜的颜色
    RACK: 0x2e3a48,

    // 阴影线条的颜色
    LINE: 0x273252,

    // 玻璃的颜色
    GLASS: 0x626e84,

    // 门的颜色
    DOOR: 0x1e2439,

    // 服务器的颜色
    SERVER: 0x0c0c0c,

    // 服务器离线的灯的颜色
    OFFLINE_LIGHT: 0x686e87,

    // 服务器在线的灯的颜色
    ONLINE_LIGHT: 0x007832,

    // 服务器呼吸灯默认灯光的颜色
    DEFAULT_LIGHT: 0x182036,

    // 打光
    DIRECTIONAL_LIGHT: 0xffffff,
};

export const DEFAULT_EVENT = () => {};
