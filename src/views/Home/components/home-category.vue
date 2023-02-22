<template>
	<div class="home-category">
		<ul class="menu">
			<li>
				<a href="javascript:;">居家</a>
				<a href="javascript:;">居家</a>
				<a href="javascript:;">居家</a>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'HomeCategory',
};
</script>

<style lang="less" scoped>
@import '@/assets/styles/variables.less';
.home-category {
	position: absolute;
	top: 0;
	left: 0;
	width: 250px;
	height: 500px;
	background: rgba(0, 0, 0, 0.8);
	z-index: 500;
	.menu {
		width: 100%;
		height: 100%;
		li {
			padding-left: 40px;
			height: 50px;
			line-height: 50px;
			a:first-child {
				font-size: 16px;
			}
			a {
				margin-right: 4px;
				color: #fff;
			}
		}
		li:hover {
			background-color: @xtxColor;
		}
	}
}
</style>
