<template>
    <div ref="box"
         class="china-chart">
        <div id="provinceInfo"></div>
    </div>
</template>
<script>
import lineMap from './map';

export default {
    name: 'MapIndex',
    props: {
        tagData: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            mapObj: null
        };
    },
    watch: {
        tagData(v) {
            this.mapObj.setTag(v);
        }
    },
    mounted() {
        this.init();
    },
    beforeUnmount() {
        this.mapObj.destroyed();
    },
    methods: {
        init() {
            this.mapObj = new lineMap(
                this.$refs.box,
                document.querySelector('#provinceInfo'),
                {
                    tagClick: this.tagClick.bind(this)
                }
            );
            this.mapObj.init();
            this.mapObj.setTag(this.tagData);
        },
        tagClick(v) {
            this.$emit('tagClick', v);
        }
    },
};
</script>
<style  scoped>
.china-chart{
    position: relative;
    width: 100%;
    height: 100%;

}
.china-chart #provinceInfo{
    position: absolute;
    color: #fff;
    user-select: none;
}
</style>
