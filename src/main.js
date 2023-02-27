import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import '@/assets/styles/common.less';
import '@/assets/iconfont/iconfont.css';
import plugin from './plugin';
Vue.use(plugin);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
	beforeCreate() {
		Vue.prototype.$bus = this;
	},
}).$mount('#app');
