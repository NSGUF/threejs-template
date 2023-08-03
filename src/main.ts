import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import { Menu, Submenu, MenuItem, MenuItemGroup } from 'element-ui';
import 'element-ui/lib/theme-chalk/menu.css';
import 'element-ui/lib/theme-chalk/submenu.css';
import 'element-ui/lib/theme-chalk/menu-item-group.css';
import 'element-ui/lib/theme-chalk/menu-item.css';
import 'element-ui/lib/theme-chalk/icon.css';
import './style.css';
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi);

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
