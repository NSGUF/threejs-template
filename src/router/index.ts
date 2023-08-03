import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'Home',
		component: () => import(/* webpackChunkName: 'views-index' */ '@/views/index.vue'),
	},
	{
		path: '/img-cosahe',
		component: () => import(/* webpackChunkName: 'mod_img_cosahe' */ '@/views/noise/img_cosahe.vue'),
	},
	{
		path: '/code-cosahe',
		component: () => import(/* webpackChunkName: 'mod_code_cosahe' */ '@/views/noise/code_cosahe.vue'),
	},
	{
		path: '/mesh',
		component: () => import(/* webpackChunkName: 'mod_mesh' */ '@/views/noise/mesh.vue'),
	},
	{
		path: '/mesh-none',
		component: () => import(/* webpackChunkName: 'mod_mesh_none' */ '@/views/noise/mesh_none.vue'),
	},
	
	
	{
		path: '/rack/demo',
		component: () => import(/* webpackChunkName: 'mod_rack_index' */ '@/views/rack/index.vue'),
	},
	{
		path: '/rack/list',
		component: () => import(/* webpackChunkName: 'mod_rack_list' */ '@/views/rack_list/index.vue'),
	},
	
	{
		path: '/map/full',
		component: () => import(/* webpackChunkName: 'map_full-index' */ '@/views/map/map_full/index.vue'),
	},
	{
		path: '/map/3d',
		component: () => import(/* webpackChunkName: 'map_3d-index' */ '@/views/map/map_3d/index.vue'),
	},
	{
		path: '/city/technology',
		component: () => import(/* webpackChunkName: 'map_full-index' */ '@/views/city/technology_city/index.vue'),
	},
];

const router = new VueRouter({
	routes,
});

export default router;
