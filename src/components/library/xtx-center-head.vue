<template>
	<div class="xtx-center-head">
		<h4 class="title fl">{{ title }}</h4>
		<slot name="p"></slot>
		<slot name="a"></slot>
	</div>
</template>

<script>
export default {
	name: 'XtxCenterHead',
	props: ['title'],
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
	.text {
		float: left;
		color: #666;
		> span {
			padding: 0 2px;
			color: #27ba9b;
		}
	}
	.add {
		color: #27ba9b;
		float: right;
	}
}
</style>
