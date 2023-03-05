<template>
	<div class="box-body">
		<div class="total" v-if="summary">
			<dl>
				<dt>商品件数：</dt>
				<dd>{{ summary.goodsCount }}件</dd>
			</dl>
			<dl>
				<dt>商品总价：</dt>
				<dd>¥{{ summary.totalPrice }}</dd>
			</dl>
			<dl>
				<dt>运费：</dt>
				<dd>¥{{ summary.postFee }}</dd>
			</dl>
			<dl>
				<dt>应付总额：</dt>
				<dd class="price">¥{{ summary.totalPayPrice }}</dd>
			</dl>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CheckoutTotal',
	props: ['summary'],
};
</script>

<style lang="less" scoped>
.box-body {
	padding: 20px 0;
	dl {
		display: flex;
		justify-content: flex-end;
		line-height: 50px;
		dd {
			width: 240px;
			text-align: right;
			padding-right: 70px;
		}
		.price {
			font-size: 20px;
			color: #cf4444;
		}
	}
}
</style>
