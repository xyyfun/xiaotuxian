<template>
	<div class="xtx-cart-page">
		<div class="container">
			<AppBread />
			<CartItem />
			<CartAction />
			<XtxGuess />
		</div>
	</div>
</template>

<script>
import AppBread from '@/components/app-bread';
import CartItem from './components/cart-item';
import CartAction from './components/cart-action';
import XtxGuess from '@/components/library/xtx-guess';

export default {
	name: 'Cart',
	components: { AppBread, CartItem, CartAction, XtxGuess },
};
</script>

<style lang="less" scoped>
.xtx-cart-page {
	background-color: #f5f5f5;
}
</style>
