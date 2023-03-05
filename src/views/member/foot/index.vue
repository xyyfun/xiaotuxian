<template>
	<div class="member-foot">
		<FootHeader />
		<FootBody />
	</div>
</template>

<script>
import FootHeader from './components/foot-header';
import FootBody from './components/foot-body';
export default {
	name: 'Foot',
	components: { FootHeader, FootBody },
};
</script>

<style>
.member-foot {
	flex: 1;
	background: #fff;
	padding-bottom: 25px;
}
</style>
