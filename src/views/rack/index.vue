<template>
    <div class="rack">
        <rack/>
    </div>
</template>

<script lang="ts">
/**
 * @file cloud.2.07 - 首页入口
 */

import Rack from './rack.vue';
import { Component, Vue } from 'vue-property-decorator';


@Component({
    components: {
        Rack
    }
})
export default class Index extends Vue {
    mounted () {
    }
}
</script>
<style scoped lang="less">
.rack {
    height: calc(100vh);
}
</style>
