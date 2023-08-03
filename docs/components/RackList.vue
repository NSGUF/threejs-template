<template>
    <div class="bg">
        <div id="container">
        </div>
    </div>
</template>

<script lang="ts">
/**
 * @file 机房
 */

import {
    defineComponent,
    onMounted,
    PropType,
    watch,
    onUnmounted,
    nextTick
} from 'vue';
import { initRack, removeRack } from '../../src/views/rack_list/candy.js';

export default defineComponent({
    name: 'RackList',

    props: {
        server: {
            type: Array as PropType<any[]>,
            default: () => [{
                name: 'test',
                used: 12,
                total: 13,
                status: 1,
            }, {
                name: 'test',
                used: 7,
                total: 13,
                status: 1,
            }, {
                name: 'test',
                used: 12,
                total: 13,
                status: 0,
            }, ],
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

    setup (props) {
        let app = null;
        function createRack () {
            let el = document.getElementById('container');
            if (!app && el && props.server?.length) {
                app = initRack({
                    el: document.getElementById('container') as HTMLElement,
                    serverList: props.server,
                });
            }
        }

        watch(
            () => props.server,
            () => {
                nextTick(() => {
                    createRack();
                });
            },
            {
                immediate: true,
                deep: true,
            },
        );

        onMounted(() => {

            /**
             * 获取一行有多少个
             * 【机柜排列方式场景说明：】
             1、机柜数量≤8个时，所有机柜排成一排；
             2、8个＜机柜数量≤49个时，排列方式是每排8个；
             3、机柜数量≥50个时，排列方式是每排10个
             * @param len
             * @return {number}
             */
            // while (props.server?.length < 50) {
            //
            //     // eslint-disable-next-line
            //     props.server?.push({
            //         name: 'test',
            //         usage: 7,
            //         total: 13,
            //         status: 1,
            //     });
            // }
            createRack();
        });

        onUnmounted(() => {
            removeRack();
            app = null;
        });

        return {
        };
    },
});
</script>

<style lang="less">
.bg {
    background: url("./img/bg.png") center;
    height: 100%;
}
#container {
    position: relative;
}

.rack-label {
    background: rgba(32,78,217,0.80);
    border: 1px solid #3A86FF;
    color: #F1F6FF;
    font-size: 14px;
    text-align: center;
    padding: 2px 10px;

    &__error {
        background: rgba(217,32,32,0.80);
        border: 1px solid #FF773A;
    }
}
.rack-label__error {
    background: rgba(217,32,32,0.80);
    border: 1px solid #FF773A;
}
.rack-label-triangle {
    display: block;
    width: 0;
    height: 0;
    border-top: 8px solid rgba(32,78,217,0.80);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    position: absolute;
    transform: translateX(-50%);
    margin-top: 0;
    left: 50%;

}
.rack-label-triangle__error {
    border-top: 8px solid rgba(217,32,32,0.80);
}
</style>
