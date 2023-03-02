<template>
	<div class="xtx_panel_header">
		<h4>{{ title }}</h4>
		<a href="javascript:;" class="more"> 查看全部 <i class="iconfont icon-right"></i></a>
	</div>
</template>

<script>
export default {
	name: 'HomeHeader',
	props: ['title'],
};
</script>

<style lang="less" scoped>
.xtx_panel_header {
	line-height: 1;
	padding: 22px 7px;
	border-bottom: 1px solid #f4f4f4;
	display: flex;
	justify-content: space-between;
	h4 {
		font-size: 22px;
		font-weight: 400;
	}
	.more {
		color: #999;
		font-size: 16px;
		margin-top: 5px;
		i {
			font-size: 12px;
			color: #999;
			position: relative;
			top: -1px;
		}
	}
}
</style>
