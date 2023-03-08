import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const router = new VueRouter({
	routes: [
		{
			path: '*',
			redirect: '/home',
		},

		{
			path: '/home',
			component: () => import('@/views/Home'),
			meta: {
				isShowNav: true,
				isShowHeader: true,
				isShowHeaderSticky: true,
				isShowFooter: true,
			},
		},
		{
			path: '/login',
			component: () => import('@/views/Login'),
		},
		{
			path: '/register',
			component: () => import('@/views/Register'),
			meta: {
				isShowNav: true,
				isShowHeader: true,
				isShowFooter: true,
			},
		},
		{
			path: '/goods/:id',
			component: () => import('@/views/goods'),
			meta: {
				isShowNav: true,
				isShowHeader: true,
				isShowHeaderSticky: true,
				isShowFooter: true,
			},
		},
		{
			path: '/member',
			component: () => import('@/views/member'),
			meta: {
				isShowNav: true,
				isShowHeader: true,
				isShowHeaderSticky: true,
				isShowFooter: true,
			},
			// 二级路由
			children: [
				{
					path: '/member',
					component: () => import('@/views/member/home'),
					meta: {
						isShowNav: true,
						isShowHeader: true,
						isShowHeaderSticky: true,
						isShowFooter: true,
					},
				},
				{
					path: 'order',
					component: () => import('@/views/member/order'),
					meta: {
						isShowNav: true,
						isShowHeader: true,
						isShowHeaderSticky: true,
						isShowFooter: true,
					},
					children: [
						{
							path: ':id',
							component: () => import('@/views/member/order/detail'),
							meta: {
								isShowNav: true,
								isShowHeader: true,
								isShowHeaderSticky: true,
								isShowFooter: true,
							},
						},
					],
				},
				{
					path: 'address',
					component: () => import('@/views/member/address'),
					meta: {
						isShowNav: true,
						isShowHeader: true,
						isShowHeaderSticky: true,
						isShowFooter: true,
					},
				},
				{
					path: 'safe',
					component: () => import('@/views/member/safe'),
					meta: {
						isShowNav: true,
						isShowHeader: true,
						isShowHeaderSticky: true,
						isShowFooter: true,
					},
				},
				{
					path: 'info',
					component: () => import('@/views/member/info'),
					meta: {
						isShowNav: true,
						isShowHeader: true,
						isShowHeaderSticky: true,
						isShowFooter: true,
					},
				},
				{
					path: 'foot',
					component: () => import('@/views/member/foot'),
					meta: {
						isShowNav: true,
						isShowHeader: true,
						isShowHeaderSticky: true,
						isShowFooter: true,
					},
				},
				{
					path: 'collect',
					component: () => import('@/views/member/collect'),
					meta: {
						isShowNav: true,
						isShowHeader: true,
						isShowHeaderSticky: true,
						isShowFooter: true,
					},
					children: [
						{
							path: 'goods',
							component: () => import('@/views/member/collect/goods'),
							meta: {
								isShowNav: true,
								isShowHeader: true,
								isShowHeaderSticky: true,
								isShowFooter: true,
							},
						},
					],
				},
			],
		},
		{
			path: '/cart',
			component: () => import('@/views/cart'),
			meta: {
				isShowNav: true,
				isShowHeader: true,
				isShowHeaderSticky: true,
				isShowFooter: true,
			},
		},
		{
			path: '/checkout',
			component: () => import('@/views/checkout'),
			meta: {
				isShowNav: true,
				isShowHeader: true,
				isShowHeaderSticky: true,
				isShowFooter: true,
			},
		},
		{
			path: '/pay',
			component: () => import('@/views/pay'),
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
