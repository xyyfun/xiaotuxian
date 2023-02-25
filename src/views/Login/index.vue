<template>
	<div>
		<LoginHeader />
		<LoginBody />
		<LoginFooter />
	</div>
</template>

<script>
import LoginHeader from './components/login-header';
import LoginFooter from './components/login-footer';
import LoginBody from './components/login-body';
export default {
	name: 'Login',
	components: {
		LoginHeader,
		LoginFooter,
		LoginBody,
	},
};
</script>

<style></style>
