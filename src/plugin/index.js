import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload';

export default {
	install(Vue) {
		Vue.use(ElementUI);
		// 配置项
		Vue.use(VueLazyload, {
			preLoad: 1.3,
			error: require('../assets/images/200.png'),
			loading: require('../assets/images/loading.png'),
			attempt: 1,
		});
	},
};
