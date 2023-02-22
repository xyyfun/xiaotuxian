<template>
	<div id="app">
		<AppNav />
		<AppHeader />
		<router-view></router-view>
		<AppFooter />
	</div>
</template>

<script>
import AppNav from '@/components/app-nav';
import AppFooter from '@/components/app-footer';
import AppHeader from '@/components/app-header';
export default {
	name: 'App',
	components: { AppNav, AppFooter, AppHeader },
};
</script>
