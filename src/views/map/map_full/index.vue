<template>
    <div class="nation-map-wrap">
        <div ref="nationMapRef"></div>
    </div>
</template>
<script lang="ts">
import {
    onBeforeUnmount,
    onMounted,
    ref,
    watch,
    nextTick,
    defineComponent,
    PropType
} from '@vue/composition-api';
import ChinaMap from './map/index';
import cityGeo from './assets/geo/city_geo.json';
import { initRack, removeRack } from './rack_list/candy.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import * as THREE from 'three';
import { bus, BUS_EVENT } from './map/bus';
import { province } from './mock';

interface Rack {
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    stats: Stats;
    camera: THREE.OrthographicCamera;
    scene: THREE.Scene;
}

export default defineComponent({
    name: 'ChinaFullMap',
    props:{
        idcHealthProvince: {
            type: Array as PropType<typeof province>,
            default: () => province
        }
    },
    // eslint-disable-next-line max-lines-per-function
    setup(props){
        const nationMapRef = ref();

        let chinaMap: ChinaMap | null;

        // watch(() => props?.idcHealthProvince, () => {
        //     updateMap();
        // });

        function updateMap() {
            const idList: any[] = [];
            if (props?.idcHealthProvince) {
                props?.idcHealthProvince?.forEach?.(province => {
                    const { name, children } = province;
                    const provinceGeo = cityGeo.find(city => city.name.indexOf(name.slice(0, 2)) > -1);

                    for (let i = 0; i < children.length; i++) {
                        const child = children[i];
                        if (child.city) {
                            const geo = provinceGeo?.districts?.
                                find(district => district.name.indexOf(child.city.slice(0, 2)) > -1);

                            // 市找不到，就回退到省级，数据容错处理（数据是人为录入的会出现错误）
                            child.center = geo?.districts[i]?.center ?? provinceGeo?.center;
                        }
                        child.province = provinceGeo?.name;

                        idList.push(child);
                    }
                });
                init(idList);
            }
        }

        let rack: Rack | null = null;

        function init(idList: any[]) {
            removeMap();
            nextTick(() => {

                chinaMap = new ChinaMap(nationMapRef.value, async (dataCenterId: string) => {
                    // 进入机柜 scene
                    bus.trigger(BUS_EVENT.CLICK_IDC, dataCenterId);
                    // 清空自动巡检
                    chinaMap?.clearAutoCheck();

                    const data = [];
                    // 测试代码 用于自动生成数据
                    while (data?.length < 4) {
                        data?.push(...Array.from({ length: 30 }).fill(null).map((s, i) => ({
                            name: 'test' + i,
                            used: 7,
                            total: 13,
                            status: i % 2,
                        })));
                    }
                    createRack(data);
                });
                chinaMap.init(idList);
            });
        }

        function removeMap() {
            if (chinaMap) {
                chinaMap.unMount();
                chinaMap = null;
            }
        }

        function createRack(data: any) {
            removeMap();
            if (rack) {
                removeRack();
                rack = null;
            }
            nextTick(() => {
                rack = initRack({
                    el: nationMapRef.value,
                    serverList: data,
                });
            });
        }

        onMounted(() => {
            updateMap();
        });

        onBeforeUnmount(() => {
            if (chinaMap) {
                chinaMap.unMount();
            }
        });

        return {
            chinaMapInit: init,
            updateMap: updateMap,
            createRack,
            nationMapRef
        };
    }
});
</script>
