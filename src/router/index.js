import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Home from '@/views/Home';
import Login from '@/views/Login';
import Register from '@/views/Register';
import Goods from '@/views/goods';
import Order from '@/views/order';
const router = new VueRouter({
	routes: [
		{
			path: '*',
			redirect: '/home',
		},
		{
			path: '/home',
			component: Home,
			meta: {
				isShowNav: true,
				isShowHeader: true,
				isShowHeaderSticky: true,
				isShowFooter: true,
			},
		},
		{
			path: '/login',
			component: Login,
		},
		{
			path: '/register',
			component: Register,
			meta: {
				isShowNav: true,
				isShowHeader: true,
				isShowFooter: true,
			},
		},
		{
			path: '/goods/:id',
			component: Goods,
			meta: {
				isShowNav: true,
				isShowHeader: true,
				isShowHeaderSticky: true,
				isShowFooter: true,
			},
		},
		{
			path: '/order',
			component: Order,
			meta: {
				isShowNav: true,
				isShowHeader: true,
				isShowHeaderSticky: true,
				isShowFooter: true,
			},
		},
	],
	scrollBehavior(to, from, savedPosition) {
		// 始终滚动到顶部
		return { y: 0 };
	},
});
export default router;
