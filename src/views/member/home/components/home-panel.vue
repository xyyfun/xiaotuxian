<template>
	<div class="xtx_orders xtx_panel">
		<slot name="head"></slot>
		<slot name="body"></slot>
	</div>
</template>

<script>
export default {
	name: 'HomePanel',
};
</script>

<style lang="less" scoped>
.xtx_panel {
	padding: 0 18px 28px;
	margin-top: 18px;
	background-color: #fff;
	border-radius: 2px;
}
</style>
