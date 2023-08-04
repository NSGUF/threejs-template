<template>
    <div>
        <el-menu mode="horizontal"
                 @select="handleSelect"
                 background-color="#242833"
                 text-color="#eaeaeb"
                 active-text-color="#00cc8c">
            <el-submenu index="1">
                <template slot="title">噪音</template>
                <el-menu-item index="/">综合实例</el-menu-item>
                <el-menu-item index="/img-cosahe">用图片实现粒子噪音效果</el-menu-item>
                <el-menu-item index="/code-cosahe">代码实现粒子噪音效果</el-menu-item>
                <el-menu-item index="/mesh">彩色噪音Mesh</el-menu-item>
                <el-menu-item index="/mesh-none">纯颜色噪音Mesh</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">机柜</template>
                <el-menu-item index="/rack/demo">单个机柜</el-menu-item>
                <el-menu-item index="/rack/list">机房</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">地图</template>
                <el-menu-item index="/map/full">全国地图</el-menu-item>
                <el-menu-item index="/map/3d">3D地图</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">智慧城市</template>
                <el-menu-item index="/city/technology">智慧城市</el-menu-item>
            </el-submenu>
        </el-menu>
        <router-view/>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {
    handleSelect (index) {
        if (!index) {
            return;
        }
        this.$router.push(index);
    }
}
</script>

<style lang="less">

</style>
