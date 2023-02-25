<template>
	<div class="app-body">
		<div class="container">
			<OrderMember />
			<OrderArticle />
		</div>
	</div>
</template>

<script>
import OrderMember from './components/order-member';
import OrderArticle from './components/order-article';
export default {
	name: 'Order',
	components: { OrderMember, OrderArticle },
};
</script>

<style lang="less" scoped>
.app-body {
	min-height: 600px;
	background-color: #f5f5f5;
	.container {
		display: flex;
		padding-top: 20px;
	}
}
</style>
