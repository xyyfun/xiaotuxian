import Vue from 'vue';
import VueRouter from 'vue-router';
import { getToken } from '@/utils/userInfo';
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
			name: 'member',
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
					name: 'order',
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
							name: 'detail',
							component: () => import('@/views/member/order/detail'),
							name: 'orderDetail',
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
					name: 'address',
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
					name: 'safe',
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
					name: 'info',
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
					name: 'foot',
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
							path: '/',
							name: 'collect',
							component: () => import('@/views/member/collect/goods'),
							meta: {
								isShowNav: true,
								isShowHeader: true,
								isShowHeaderSticky: true,
								isShowFooter: true,
							},
						},
						{
							path: 'special',
							name: 'special',
							component: () => import('@/views/member/collect/special'),
							meta: {
								isShowNav: true,
								isShowHeader: true,
								isShowHeaderSticky: true,
								isShowFooter: true,
							},
						},
						{
							path: 'brand',
							name: 'brand',
							component: () => import('@/views/member/collect/brand'),
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
			name: 'checkout',
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
			name: 'pay',
			component: () => import('@/views/pay'),
			meta: {
				isShowNav: true,
				isShowHeader: true,
				isShowHeaderSticky: true,
				isShowFooter: true,
			},
		},
		{
			path: '/category/:id',
			component: () => import('@/views/category'),
			meta: {
				isShowNav: true,
				isShowHeader: true,
				isShowHeaderSticky: true,
				isShowFooter: true,
			},
		},
		{
			path: '/category/sub/:id',
			component: () => import('@/views/category/sub'),
			meta: {
				isShowNav: true,
				isShowHeader: true,
				isShowHeaderSticky: true,
				isShowFooter: true,
			},
		},
		{
			path: '/download',
			component: () => import('@/views/download'),
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

// 前置守卫
router.beforeEach((to, from, next) => {
	// 判断是否有 token
	if (!getToken()) {
		// 未登录时权限不足
		if (
			to.name === 'member' ||
			to.name === 'order' ||
			to.name === 'address' ||
			to.name === 'safe' ||
			to.name === 'info' ||
			to.name === 'foot' ||
			to.name === 'collect' ||
			to.name === 'special' ||
			to.name === 'brand' ||
			to.name === 'checkout' ||
			to.name === 'pay'
		) {
			next('/login');
		}
		next();
	} else {
		// 有token但访问的是登陆注册
		if (to.path === '/login' || to.path === 'register') {
			next('/');
		} else {
			next();
		}
	}
});

//全局后置守卫：初始化时执行、每次路由切换后执行
router.afterEach((to, from) => {});
export default router;
