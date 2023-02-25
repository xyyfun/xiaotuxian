<template>
	<div class="login-header">
		<div class="container">
			<h1 class="logo"><a href=""></a></h1>
			<h3 class="sub">欢迎登录</h3>
			<router-link to="/home" class="entry">
				进入网站首页
				<i class="iconfont icon-right"></i>
				<i class="iconfont icon-right"></i>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: 'LoginHeader',
};
</script>

<style lang="less" scoped>
.login-header {
	background: #fff;
	border-bottom: 1px solid #e4e4e4;
	.container {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		.logo {
			width: 200px;
			a {
				display: block;
				height: 132px;
				width: 100%;
				text-indent: -9999px;
				background: url(../../../assets/images/logo.png) no-repeat center 18px / contain;
			}
		}
		h3 {
			flex: 1;
			font-size: 24px;
			font-weight: 400;
			margin-bottom: 38px;
			margin-left: 20px;
			color: #666;
		}
		.entry {
			width: 120px;
			margin-bottom: 38px;
			font-size: 16px;
			i {
				font-size: 14px;
				color: #27ba9b;
				letter-spacing: -5px;
			}
		}
	}
}
</style>
