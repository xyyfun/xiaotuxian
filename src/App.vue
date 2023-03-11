<template>
	<div id="app">
		<AppNav v-if="this.$route.meta.isShowNav" />
		<AppHeader v-if="this.$route.meta.isShowHeader" />
		<AppHeaderSticky v-if="this.$route.meta.isShowHeaderSticky" />
		<router-view></router-view>
		<AppFooter v-if="this.$route.meta.isShowFooter" />
	</div>
</template>

<script>
import AppNav from '@/components/app-nav';
import AppFooter from '@/components/app-footer';
import AppHeader from '@/components/app-header';
import AppHeaderSticky from '@/components/app-header-sticky';
export default {
	name: 'App',
	components: { AppNav, AppFooter, AppHeader, AppHeaderSticky },
	created() {
		this.$store.dispatch('category/getCategoryDataList');
		if (this.$store.state.user.token) {
			this.$store.dispatch('cart/getCartDataList');
		}
	},
};
</script>
