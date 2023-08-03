/**
 * 机柜的配置
 */

// 当前canvas的长宽
const w = 1060;
const h = 670;

// 小屏的宽度
const SMALL_WIDTH = 1719;

/**
 * 是否是小屏
 * @return {boolean}
 */
function isSmallScreen () {
    return (window.innderWidth || document.documentElement.clientWidth) < SMALL_WIDTH;
}

/**
 * 获取整个canvas的大小
 * @return {{width: number, height: number}}
 */
function getWH () {

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

export {
    w,
    h,
    getWH,
    isSmallScreen,
};
