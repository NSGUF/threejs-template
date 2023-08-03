<template>
    <div class="center-cabinet">
        <div class="center-cabinet__content">
            <!--threejs机架-->
            <div id="container">
                <!-- 浮窗 v-if="currentServer.sf_host_id && isCabinetAnimeComplete" -->
                <div id="serverInfo"
                     class="center-cabinet__content-dialog-wrap">
                    <div class="center-cabinet__content-dialog-wrap-service-layer ellipsis">
                        <span>test</span>
                        <span class="center-cabinet__content-dialog-wrap-service-name">{{
                            currentServer.sf_host_name
                        }}</span>
                    </div>
                    <div class="center-cabinet__content-dialog-wrap-service-wrap">
                        <!-- 根据状态，显示不同的背景： normal（正常）、offline（离线）-->
                        <div
                            :class="`center-cabinet__content-dialog-wrap-service-status--${currentServer.sf_host_status}`">
                            {{ serviceTypeText[currentServer.sf_host_status] }}
                        </div>
                        <div class="center-cabinet__content-dialog-wrap-service-jump-to-detail"
                             utid="center-cabinet-dialog-wrap-service-jump-to-detail"
                             @click="jumpToExclusiveService(currentServer)">
                            test
                        </div>
                    </div>
                </div>
            </div>

            <!-- 当服务器数量大于13台，显示左右切换按钮,没有上一页或下一页时置灰 -->
            <template v-if="isMultiple">
                <div class="center-cabinet__left-btn"
                     :class="isFirstRack ? 'center-cabinet__left-btn--disabled' : ''"
                     utid="center-cabinet__left-buttom"
                     @click="onChangeStartNumber(RACK_OPERATE_TYPE.TO_LEFT)"></div>
                <div class="center-cabinet__right-btn"
                     :class="isLastRack ? 'center-cabinet__right-btn--disabled' : ''"
                     utid="center-cabinet__right-buttom"
                     @click="onChangeStartNumber(RACK_OPERATE_TYPE.TO_RIGHT)"></div>
            </template>
        </div>

    </div>
</template>

<script lang="ts">
/**
 * @file 专属资源池首页--中间--机架部分
 */

import {
    defineComponent,
    onMounted,
    PropType,
    ref,
    watch,
    computed,
    onUnmounted,
    nextTick
} from 'vue';
import { RACK_OPERATE_TYPE, SERVICE_TYPE, SERVICE_TYPE_TEXT } from '../../src/views/rack/const';
import { initRack, removeRack, updateRack } from '../../src/views/rack/candy.js';

export default defineComponent({
    name: 'Rack',

    props: {
        server: {
            type: Array as PropType<any[]>,
            default: () => [{
                sf_host_id: 8193439782,
                sf_host_status: 'running',
                sf_host_name: '10.134.91.644'
            }, {
                sf_host_id: 8193439783,
                sf_host_status: 'running',
                sf_host_name: '10.134.91.364'
            }, {
                sf_host_id: 8193439784,
                sf_host_status: 'running',
                sf_host_name: '10.134.91.654'
            }, {
                sf_host_id: 81934397851,
                sf_host_status: 'running',
                sf_host_name: '10.134.91.664'
            }, {
                sf_host_id: 8193439786,
                sf_host_status: 'running',
                sf_host_name: '10.134.91.674'
            }, {
                sf_host_id: 8193439787,
                sf_host_status: 'running',
                sf_host_name: '10.134.91.684'
            }, {
                sf_host_id: 8193439788,
                sf_host_status: 'running',
                sf_host_name: '10.134.91.694'
            }, {
                sf_host_id: 8193439789,
                sf_host_status: 'running',
                sf_host_name: '10.134.91.604'
            }, {
                sf_host_id: 81934397810,
                sf_host_status: 'running',
                sf_host_name: '10.134.91.6-4'
            }, {
                sf_host_id: 81934397811,
                sf_host_status: 'running',
                sf_host_name: '10.134.91.6=4'
            }, {
                sf_host_id: 81934397812,
                sf_host_status: 'running',
                sf_host_name: '10.134.91.6d4'
            }, {
                sf_host_id: 81934397814,
                sf_host_status: 'running',
                sf_host_name: '10.134.91.c64'
            }, {
                sf_host_id: 81934397815,
                sf_host_status: 'running',
                sf_host_name: '10.134.91.6v4'
            }, { sf_host_id: 81934397816, sf_host_status: 'running', sf_host_name: '10.134.91.f64' }],
        },
        currentAz: {
            type: Object as PropType<any>,
            default: () => ({}),
        },
        location: {
            typr: String,
            default: '',
        },
        showAnimation: {
            type: Boolean,
            default: false
        },
        delay: {
            type: Number,
            default: 0
        }
    },

    // eslint-disable-next-line
    setup (props) {
        const serviceType = SERVICE_TYPE;
        const serviceTypeText = SERVICE_TYPE_TEXT;

        // 上次的服务器信息，用于轮询的时候判断两次数据是否一致，如果一致就不用更新当前3d画布
        let lastServer: any[];

        // 当前显示的是第几个机柜
        const start = ref(0);

        // 机柜能容纳的服务器的数量
        const pageSize = 13;

        // 机架动画是否完成
        const isCabinetAnimeComplete = ref(false);

        /**
         1、PO 确认过，首次进入选中第一个
         2、从专属服务器返回，选中之前的服务器（高亮）
         */
        const currentID = ref(props.server[0]?.['sf_host_id'] || '');

        // 当前需要显示的所有服务器
        let serverList = ref<any[]>([]);

        // 初始化后才能处理机柜
        let isCreateRack = false;

        // 当前选中服务器
        const currentServer = computed(() => {
            const currentService = serverList.value.find(service => service.sf_host_id === currentID.value);

            return {
                sf_host_id: currentService?.['sf_host_id'] || '',
                sf_host_name: currentService?.['sf_host_name'] || '-',
                sf_host_status: currentService?.['sf_host_status'] || '-',
            };
        });

        // 最大页数
        const maxPage = computed(() => {
            return Math.ceil(props.server?.length / pageSize);
        });

        // 当前显示的是否是第一个机架
        const isFirstRack = computed(() => {
            return start.value === 0;
        });

        // 当前显示的是否是最后一个机架
        const isLastRack = computed(() => {
            return start.value === maxPage.value - 1;
        });

        // 是否有多个机架
        const isMultiple = computed(() => {
            return props.server.length > pageSize;
        });

        /**
         * 更新当前 当前需要显示的所有服务器
         */
        const updateServerList = () => {
            let currentNum = props.server?.length - start.value * pageSize;
            currentNum = currentNum > pageSize ? pageSize : currentNum;

            serverList.value = [...props.server].splice(start.value * pageSize, currentNum);

        };

        /**
         * 1、更新 start 的值：用于显示不同的服务器
         * 2、更新 currentID: 用于高亮展示
         */
        const onChangeStartNumber = (type: string) => {
            let actionType = type || RACK_OPERATE_TYPE.NO_ACTION;
            switch (type) {
                case RACK_OPERATE_TYPE.TO_RIGHT:
                    start.value = (start.value + 1 === maxPage.value) ? start.value : start.value + 1;
                    break;
                case RACK_OPERATE_TYPE.TO_LEFT:
                    start.value = start.value === 0 ? start.value : start.value - 1;
                    break;
                default:
                    break;
            }
            updateServerList();
            updateRack(serverList.value, actionType);
        };

        // 跳转专属服务器大屏
        const jumpToExclusiveService = (/* item: any */) => {
            // routerEmitter.emit('goToExclusiveSerivceScreen', {
            //     id: props.currentAz.id,
            //     serviceId: String(item.sf_host_id),
            //     backPath: `/exclusive-cloud-screen`,
            // });
        };


        function updateParams () {
            let index = props.server.findIndex(item => String(item.sf_host_id) === currentID.value);
            start.value = index === -1 ? 0 : Math.floor(index / pageSize);
            updateServerList();
            let currentIndex = serverList.value.findIndex(service => String(service.sf_host_id) === currentID.value);

            // 轮询默认从上一个开始
            currentIndex = currentIndex === -1 ? -1 : --currentIndex;
            return currentIndex;
        }

        function createRack () {
            let el = document.getElementById('container');
            if (el) {
                let currentIndex = updateParams();
                initRack({
                    el: document.getElementById('container') as HTMLElement,
                    serverList: serverList.value,
                    currentIndex,
                    listeners: {
                        onChangeIndex: function (index: number) {
                            currentID.value = serverList.value?.[index]?.sf_host_id;
                        },
                        onClickServer: function (index: number) {
                            jumpToExclusiveService(serverList.value?.[index]);
                        },
                        onScaleFinish: function () {

                            // 机柜画完才生成动画
                            if (!isCabinetAnimeComplete.value) {
                                nextTick(() => {

                                    isCabinetAnimeComplete.value = true;
                                });
                            }
                        }
                    }
                });
                isCreateRack = true;
            }
        }

        // 这里可以用项目里面的loadsh
        function isEqual (obj1, obj2) {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
        }

        watch(
            () => props.server,
            () => {
                nextTick(() => {

                    // 两次数据不同才需要更新机柜
                    if (!isEqual(lastServer, props.server) && isCreateRack) {
                        lastServer = props.server;
                        let currentIndex = updateParams();
                        updateRack(serverList.value, RACK_OPERATE_TYPE.NO_ACTION, currentIndex);
                    }
                });
            },
            {
                immediate: true,
                deep: true,
            },
        );

        onMounted(() => {
            createRack();
        });

        onUnmounted(() => {
            removeRack();
        });

        return {
            serviceType,
            serviceTypeText,
            isFirstRack,
            isLastRack,
            isMultiple,
            currentID,
            onChangeStartNumber,
            jumpToExclusiveService,
            currentServer,
            isCabinetAnimeComplete,
            RACK_OPERATE_TYPE,
        };
    },
});
</script>

<style lang="less" scoped>
/* 字体大小 */
@font-size-8xl: 64px;
@font-size-7xl: 56px;
@font-size-6xl: 48px;
@font-size-5xl: 40px; /* 大数字 */
@font-size-4xl: 32px;
@font-size-3xl: 28px; /* 数字 */
@font-size-2xl: 24px; /* 数字 */
@font-size-xl: 20px; /* 大标题 */
@font-size-l: 16px; /* 一级标题 */
@font-size-m: 14px; /* 二级标题、正文 */
@font-size-s: 12px; /* 正文、说明、最小字号 */
@font-size-base: @font-size-s;

/* 字体粗细 */
@font-weight-normal: 400; /* 正常大小 */
@font-weight-bold: 500;
@font-weight-bolder: 600; /* 中文加粗时的有效值 */

@icon-tip-color: #adbac8;
@icon-tip-color-hover: #b4b9bf;
@icon-tip-size: 16px;
@icon-tip-font-size: 14px;

/* 边框 */
@border-width-base: 1px;
@border-style-base: solid;
@border-base: @border-width-base @border-style-base #ccd1d9;
@border-radius-base: 2px;
@border-radius-small: 2px;
@border-radius-circle: 100%;

/* 通用表单样式 */
@color-white: #fff;
@form-padding-h: 20px; /* 左右间距 */
@form-padding-v: 16px; /* 上下间距 */
@form-padding: @form-padding-v @form-padding-h;
@form-row-height: 32px; /* 每行高 */
@form-row-margin: 8px; /* 行间距 */
@form-label-width: 104px; /* 表单label单行Max8个字符宽度104px */
@menu-bg: #191C24;
@item-bg: #1c2029;
@color-grey-d2: #5c5c5c;
@color-lime-l4: #ebeff5;
@color-blue: #567df5;
@color-blue-d2: #2443b3;
@scc-yellow-4d: #fffd4d;
@scc-golden-yellow-d20: #a66203;
@scc-classical-red: #e64545;
@scc-rgba-dark--012: rgba(0, 0, 0, 0.12);
@scc-rgba-dark--02: rgba(0, 0, 0, 0.2);
@scc-rgba-dark--006: rgba(0, 0, 0, 0.06);
@scc-rgba-dark--005: rgba(0, 0, 0, 0.05);
@scc-rgba-dark--016: rgba(0, 0, 0, 0.16);
@scc-rgba-dark--020: rgba(0, 0, 0, 0.20);
@scc-rgba-dark--008: rgba(0, 0, 0, 0.08);
@scc-rgba-white--006: rgba(255, 255, 255, 0.06);
@scc-rgba-white--010: rgba(255, 255, 255, 0.1);
@scc-rgba-white--060: rgba(255, 255, 255, 0.60);
@scc-rgba-white--008: rgba(255, 255, 255, 0.08);
@scc-rgba-white--08: rgba(255, 255, 255, 0.8);
@scc-rgba-white--070: rgba(255, 255, 255, 0.7);
@scc-rgba-white--030: rgba(255, 255, 255, 0.3);
@scc-rgba-white--040: rgba(255, 255, 255, 0.4);
@scc-rgba-white--060: rgba(255, 255, 255, 0.6);
@scc-rgba-white--020: rgba(255, 255, 255, 0.2);
@scc-rgba-white--090: rgba(255, 255, 255, 0.9);
@scc-rgba-gray: rgba(238, 238, 238, 0.2);
@scc-rgba-yellow-0729: rgba(255, 237, 160, 0.729);
@scc-graphite-black: #242a33;
@scc-graphite-black-2: #242A33;
@scc-graphite-black-l30: #3E4A59;
@scc-graphite-black-d10: #1B2026;
@scc-graphite-black-l20: #36404D;
@scc-graphite-black-l10: #2D3540;
@scc-graphite-black-l50: #505973;
@scc-graphite-black-l40: #475566;
@scc-graphite-black-l70: #637A99;
@scc-graphite-black-l80: #363C4D;
@scc-blue-gray-d60: #84878C;
@scc-classical-red-l10: #F07878;
@scc-blue-gray: #CCD1D9;
@scc-green-l70: #EDFCF2;
@scc-blue: #1770E6;
@scc-gray-l20: #eee;
@scc-blue-gray-l60: #F7F8FA;
@scc-green-d20: #2D8048;
@scc-green-l50: #B8E6C7;
@scc-green-l60: #DAF2E2;
@scc-golden-yellow-l15: #FCC372;
@scc-golden-yellow-l10: #FCAE3F;
@scc-green: #50B371;
@scc-grren-l10: #3D995C;
@scc-gray-l10: #ddd;
@scc-gray-dadbdd: #dadbdd;
@scc-black-13161a: #13161A;
@scc-gray-ccd9ff: #CCD9FF;
@scc-blue-186fe6: #186FE6;
@scc-black-141927: #141927;
@scc-orange-ffc42d: #FFC42D;
@scc-red-f55152: #F55152;
@scc-green-33cc99: #33CC99;
@scc-gray-585a66: #585A66;
@scc-gray-979797: #979797;
@scc-gray-f5f5f5: #F5F5F5;
@scc-green-00a672: #00A672;
@scc-green-00bf83: #00BF83;
@scc-green-0a9067: #0A9067;
@scc-blue-91bbf2: #91BBF2;
@scc-blue-13161c: #13161C;
@scc-blue-177dff: #177DFF;
@scc-blue-91d5ff: #91D5FF;
@scc-green-36cfc9: #36CFC9;
@scc-blue-4766ff: #4766FF;
@scc-blue-d94b4b: #D94B4B;
@scc-blue-363a3f: #363A3F;
@scc-rgba-black--040: rgba(36, 42, 51, 0.4);
@scc-rgba-black--010: rgba(255, 255, 255, 0.010);
@scc-rgba-black--020: rgba(255, 255, 255, 0.02);
@scc-rgba-black--050: rgba(255, 255, 255, 0.05);
@scc-rgba-black--001: rgba(22, 25, 29, 0.001);
@scc-rgba-black-gray--010: rgba(120, 153, 255, 0.10);
@scc-rgba-black-gray--000: rgba(120, 146, 255, 0.00);
@scc-rgba-black-gray--030: rgba(255, 255, 255, 0.30);
@scc-rgba-brown-gray--010: rgba(245, 249, 255, 0.10);
@scc-rgba-brown-gray--005: rgba(245, 249, 255, 0.05);
@scc-rgba-green--080: rgba(51, 204, 153, 0.80);
@scc-rgba-green--060: rgba(51, 204, 153, 0.60);
@scc-rgba-red-brown--080: rgba(245, 81, 82, 0.80);
@scc-rgba-brown-black--020: rgba(255, 255, 255, 0.20);
@scc-rgba-brown-black--060: rgba(55, 55, 55, 0.60);
@scc-rgba-brown-black--004: rgba(255, 255, 255, 0.04);
@scc-rgba-brown-black--080: rgba(36, 42, 51, 0.80);
@scc-rgba-brown-lightgray--010: rgba(255, 255, 255, 0.10);
@scc-rgba-black-brown--010: rgba(45, 53, 64, 0.10);
@scc-rgba-light-green--060: rgba(0, 191, 131, 0.60);
@scc-rgba-grown-black--012: rgba(255, 255, 255, 0.12);
@scc-rgba-black-grown--010: rgba(120, 153, 229, 0.10);
@scc-rgba-black-grown--024: rgba(31, 37, 51, 0.24);
@scc-rgba-black-grown--036: rgba(31, 37, 51, 0.36);
@scc-rgba-black-grown--040: rgba(43, 48, 61, 0.40);
@scc-rgba-gray-grown--060: rgba(121, 123, 129, 0.60);
@scc-rgba-black-grown--005: rgba(46, 77, 230, 0.05);
@scc-rgba-black-grown--020: rgba(46, 77, 230, 0.20);
@scc-rgba-purple-grown--010: rgba(71, 102, 255, 0.10);
@scc-rgba-purple-blue--086: rgba(71, 102, 255, 0.86);
@scc-rgba-brown--090: rgba(19, 22, 28, 0.9);
@scc-rgba-black-gray--040: rgba(255, 255, 255, 0.30);
@scc-gray-e6e6e6: #e6e6e6;
@scc-red-E65050: #E65050;
@scc-gray-626D8C: #626D8C;
@scc-blue-8AB1E6: #8AB1E6;
@scc-blue-73A4E6: #73A4E6;
@scc-blue-458AE6: #458AE6;
@scc-rgba-light-green--090: rgba(10, 144, 103, 0.90);
@scc-rgba-light-black--040: rgba(255, 255, 255, 0.4);
@scc-graphite-black-l90: #3E4559;

/* neptune 相关颜色变量 新增的业务色值 包含在brand中但不在brand41中的颜色值 */
@bgc-default: #e9ecef;
@color-blue: #567df5;
@bg-color-fb: #f9fAfB;
@color-lime: #8591a6;
@color-lime-l4: #ebeff5;
@color-green: #2db350;
@color-lime-d1: #69768c;
@color-prasinous: #90cc29;
@color-gold-l1: #fc9e3f;
@color-orange: #f26430;
@limit-bg-color: #fff5f5;
@label-text-color-d5: #495060;
@color-cyan-d1: #1f9999;
@hover-off-text-color: #9aa8bd;
@color-lime-l3: #dde2eb;
@color-lime-l5: #f7f9fc;
@nav-block-bg-color: fadeout(@color-lime-l5, 40%);
@g6-tooltip-bg-color: rgba(255, 255, 255, 0.9);
@table-btn-icon-color: #3e4559;
@progress-index-color: #626d8c;
@progress-index-primary-color: #ff9500;
@progress-index-background: #e1e4eb;
@progress-index-primary-background: rgba(255, 149, 0, 0.2);
@tag-color-light-primary: #567df5;
@tag-color-light-success: #1F9940;
@tag-color-light-danger: #E65050;
@tag-color-light-warning: #d9ad00;
@tag-color-light-info: #2DB3B2;
@tag-color-light-critical: #900E0E;
@tag-color-light-alarm: #f28d00;
@tag-color-light-minor: #626d8c;
@desc-text-color-d4: #80848f;
@block-title-color: #333;
@introduction-page-title: #1C2438;
@color-lime-d4: #262f40;
@card-bg-color: rgba(235, 239, 245, 0.2);
@info-card-bg: #fbfcfd;
@info-card-bg-hover: rgba(23, 193, 197, 0.1);
@form-card-bg-color: #f7f8fa;
@progress-index-color: #626d8c;
@chart-bg-color: rgba(235, 239, 245, 0.2);
@scc-rgba-dark--008: rgba(0, 0, 0, .08);
@scc-rgba-dark--02: rgba(0, 0, 0, 0.2);
@scc-rgba-19401: rgba(194, 194, 194, 0.1);
@scc-rgba-dark--015: rgba(0, 0, 0, 0.15);
@scc-rgba-dark--006: rgba(0, 0, 0, 0.06);
@scc-rgba-dark: rgba(255, 255, 255, 0);
@scc-rgba-dark--060: rgba(255, 255, 255, 0.6);
@scc-rgba-dark--070: rgba(255, 255, 255, 0.7);
@scc-rgba-dark--080: rgba(255, 255, 255, 0.8);
@scc-rgba-dark--008: rgba(255, 255, 255, 0.08);
@scc-rgba-dark--040: rgba(255, 255, 255, 0.4);
@scc-rgba-dark--090: rgba(255, 255, 255, 0.9);
@scc-rgba-dark--010: rgba(255, 255, 255, 0.1);
@scc-rgba-dark--030: rgba(255, 255, 255, 0.3);
@scc-rgba-dark--020: rgba(255, 255, 255, 0.2);
@scc-rgba-dark--23802: rgba(238, 238, 238, 0.2);
@scc-rgba-dark--006: rgba(255, 255, 255, 0.06);
@scc-cherry-pink: #EB528F;
@scc-yellow-200: #FCD200;
@scc-rgba-dark--2450: rgba(235, 239, 245, 0);
@scc-rgba-blue--204: rgb(0, 122, 204);
@scc-golden-yellow: #FCAE3F;
@scc-rgba-dark--252: rgba(134, 173, 252, 0.1);
@scc-border-blue-gray-l10: #DCDFE6;
@scc-rgba-dark--016: rgba(0, 0, 0, 0.16);
@scc-blue: #1770E6;
@scc-blue-gray-l60: #F7F8FA;
@scc-gray-EBECF0: #EBECF0;
@scc-blue-2E3E58: #2E3E58;
@scc-blue-292D3A: #292D3A;
@scc-rgba-blue-057: rgba(177, 204, 242, 0.57);
@scc-rgba-white-043: rgba(222, 236, 255, 0.43);
@scc-rgba-white-024: rgba(255, 255, 255, 0.24);
@scc-rgba-white-028: rgba(255, 255, 255, 0.28);
@scc-rgba-white-091: rgba(255, 255, 255, 0.91);
@scc-rgba-white-016: rgba(255, 255, 255, 0.16);
@scc-rgba-global-062: rgba(234, 211, 176, 0.62);
@scc-rgba-gray-057: rgba(169, 188, 218, 0.57);
@scc-rgba-dark--040: rgba(45, 50, 64, 0.40);
@scc-rgba-global--080: rgba(221, 221, 221, 0.80);
@scc-global-FCEBCE: #FCEBCE;
@scc-global-FED196: #FED196;
@scc-global-654B31: #654B31;
@scc-global-F7D58A: #F7D58A;
@scc-global-F0B257: #F0B257;
@scc-blue-162339: #162339;
@scc-blue-354871: #354871;
@scc-global-FFE7D6: #FFE7D6;
@scc-gray-354871: #354871;
@scc-orange-FFEDE1: #FFEDE1;
@scc-orange-FEBE96: #FEBE96;
@scc-orange-FEDDC6: #FEDDC6;
@scc-gray-EBEDF0: #EBEDF0;
@scc-gray-dcdfe6: #dcdfe6;
@scc-gray-efeff4: #efeff4;
@scc-grey-fafafa: #FAFAFA;
@table-btn-icon-color: #3e4559;

/* 专属云大屏相关颜色变量 */
@scc-blue-99bbff: #99BBFF;
@scc-blue-000626: #000626;
@scc-blue-1ee7e7: #1EE7E7;
@scc-green-33ffdd: #33FFDD;
@scc-gray-c2c4cc: #C2C4CC;
@scc-gray-84868c: #84868c;
@scc-blue-104a99: #104A99;
@scc-blue-1663d0: #1663D0;
@scc-blue-1464cc-040: rgba(20, 100, 204, 0.4);
@scc-blue-1a70e6-040: rgba(26, 112, 230, 0.4);
@scc-yellow-d5caae: #D5CAAE;
@scc-yellow-cda65b: #CDA65B;
@scc-blue-143066-010: rgba(20, 48, 102, 0.10);
@screen-high-risk-color: rgba(245, 81, 81, 0.8);
@screen-middle-risk-color: rgba(255, 149, 0, 0.8);
@screen-low-risk-color: rgba(255, 213, 0, 0.8);
@screen-pass-risk-color: #00a672;
@screen-configure-border-bg: linear-gradient(90deg, #081331 5%, rgba(100, 120, 200, 0.25) 49%, #081331 95%);
@screen-separator-bg: linear-gradient(180deg, rgba(141, 171, 255, 0) 0%, rgba(71, 102, 255, 0.6) 50%, rgba(141, 165, 255, 0) 100%);
@screen-separator-bg-row: linear-gradient(90deg, rgba(141, 171, 255, 0) 0%, rgba(71, 102, 255, 0.6) 50%, rgba(141, 165, 255, 0) 100%);
@scc-blue-000726-080: rgba(0, 7, 38, .8);
@scc-blue-197dff: #197dff;
@scc-blue-36F: #36F;
@scc-blue-9bf: #9bf;
@scc-blue-407fff: #407fff;
@scc-black-000d26: #000d26;
@scc-green-66cc88: #66cc88;
@scc-gray-c2c2c2: #c2c2c2;
@scc-gray-999: #999;
@scc-rgba-white-025: rgba(255, 255, 255, 0.25);
@scc-rgba-black-040: rgba(34, 99, 230, 0.4);
@scc-rgba-black-000: rgba(34, 99, 230, 0);
@scc-rgba-green-040: rgba(102, 204, 136, 0.4);
@scc-rgba-green-000: rgba(102, 204, 136, 0);
@scc-screen-radar-blue: rgba(46, 107, 230, 0.4);
@scc-rgba-white-040: rgba(255, 255, 255, 0.4);


@smallScreen: ~"only screen and (max-width: 1719px)";
@keyframes rightInEffect {
    0% {
        opacity: 0;
        transform: translateX(100%);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
.center-cabinet {
    min-height: 540px;
    position: relative;
    box-sizing: border-box;
    background: url("./img/bg.png") center;
    height: 100%;

    @media @smallScreen {
        min-height: 382px;
    }

    &__content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);

        @media @smallScreen {
            transform-origin: -720px -525px;
        }

        &-dialog-wrap {
            position: fixed;
            top: 40px;
            left: 380px;
            display: none;
            height: 106px;
            width: 280px;
            box-sizing: border-box;
            padding: 22px 32px;
            font-size: 16px;
            background-image: url('./img/hover_layer.svg');
            line-height: 18px;
            word-break: break-all;
            pointer-events: none;

            @media @smallScreen {
                transform: scale(.65);
                transform-origin: left bottom;
            }

            &-empty-box {
                opacity: 0.5;
            }

            &-service-layer {
                width: 225px;
                height: 38px;
                line-height: 30px;
                pointer-events: auto;
                color: @scc-blue-99bbff;
            }
            &-service-wrap {
                display: flex;
                justify-content: space-between;
                pointer-events: auto;
            }

            &-service-jump-to-detail {
                cursor: pointer;
                display: inline-block;
                width: 64px;
                height: 24px;
                line-height: 24px;
                text-align: center;
                margin-top: 8px;
                color: @color-white;
                box-shadow: 0 0 4px 0 @scc-gray-585a66;
                border-radius: 2px;
                font-size: 12px;
                box-sizing: border-box;
                position: relative;
                top: -10px;
                opacity: 0.6;

                &:hover {
                    opacity: 1;
                }
            }

            &-service-status {
                &--running,
                &--offline {
                    display: inline-block;
                    width: 64px;
                    height: 24px;
                    line-height: 24px;
                    text-align: center;
                    margin-top: 8px;
                    color: @color-white;
                    border-radius: 2px;
                    font-size: 14px;
                    box-sizing: border-box;
                    position: relative;
                    top: -10px;

                    @media @smallScreen {
                        font-size: 12px;
                    }
                }

                &--running {
                    background: @scc-green-00a672;
                    border: 0 solid @scc-green-00bf83;
                    box-shadow: 0 0 4px 0 @scc-rgba-light-green--060;
                }

                &--offline {
                    background: @scc-gray-585a66;
                    border: 0 solid @scc-gray-979797;
                    box-shadow: 0 0 4px 0 @scc-rgba-black-grown--010;
                }
            }
        }
    }

    &__fotter-box {
        position: absolute;
        bottom: 10px;
        height: 20px;
        width: 100%;
        color: @color-white;

        &--large {
            bottom: 140px;
        }

        &-status--running::after,
        &-status--offline::after {
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 1px;
            margin-left: 8px;
        }

        &-status--running {
            margin-right: 16px;

            &::after {
                background: @scc-green;
            }
        }

        &-status--offline {
            &::after {
                opacity: .4;
                background: @color-white;
            }
        }
    }

    &__left-btn,
    &__right-btn {
        width: 56px;
        height: 56px;
        position: absolute;
        bottom: 160px;
        cursor: pointer;
        background: url('./img/arrow.png') no-repeat;
        background-size: cover;

        &:hover {
            background: url('./img/arrow_hover.png') no-repeat;
            background-size: cover;
        }

        &--disabled {
            background: url('./img/arrow_disable.png') no-repeat;
            background-size: cover;
            pointer-events: none;
        }

        @media screen and (max-width: 1720px) and (min-width: 1440px) {
            width: 52px;
            height: 52px;
        }
    }

    &__left-btn {
        left: 12%;
        transform: rotateY(180deg);
    }

    &__right-btn {
        right: 12%;
    }

    .center-cabinet__location--right-in {
        animation: rightInEffect 1s;
        animation-fill-mode: both;
    }

    .abc {
        position: absolute;
        right: 0;
        bottom: 0;
        height: 20px;
    }
}
</style>
