<template>
	<div class="member-foot">
		<XtxCenterHead title="我的足迹">
			<a slot="a" href="javascript:;" @click="$bus.$emit('removeAll')" class="add"
				>清除当前页所有足迹</a
			>
		</XtxCenterHead>
		<FootBody />
	</div>
</template>

<script>
import XtxCenterHead from '@/components/library/xtx-center-head';
import FootBody from './components/foot-body';
export default {
	name: 'Foot',
	components: { XtxCenterHead, FootBody },
};
</script>

<style>
.member-foot {
	flex: 1;
	background: #fff;
	padding-bottom: 25px;
	min-height: 100%;
}
</style>
