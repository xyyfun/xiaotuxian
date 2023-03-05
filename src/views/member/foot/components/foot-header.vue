<template>
	<div class="xtx-center-head">
		<h4 class="title fl">我的足迹</h4>
		<a href="javascript:;" class="add">清除全部</a>
	</div>
</template>

<script>
export default {
	name: 'FootHeader',
};
</script>

<style lang="less" scoped>
.xtx-center-head {
	line-height: 70px;
	margin: 0 25px;
	height: 70px;
	border-bottom: 1px solid #f5f5f5;
	.title {
		font-size: 16px;
		font-weight: 400;
		float: left;
	}
	.add {
		color: #27ba9b;
		float: right;
	}
}
</style>
