import Vue from 'vue';
import Vuex from 'vuex';
import category from './modules/category';
import user from './modules/user';
Vue.use(Vuex);
export default new Vuex.Store({
	modules: {
		category,
		user,
	},
});
