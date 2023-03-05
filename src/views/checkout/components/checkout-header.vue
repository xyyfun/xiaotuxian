<template>
	<h3 class="box-title" data-v-2c45ae0c="">{{ title }}</h3>
</template>

<script>
export default {
	name: 'CheckoutHeader',
	props: ['title'],
};
</script>

<style lang="less" scoped>
.box-title {
	font-size: 16px;
	font-weight: 400;
	padding-left: 10px;
	line-height: 70px;
	border-bottom: 1px solid #f5f5f5;
}
</style>
