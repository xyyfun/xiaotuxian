<template>
	<div class="xtx-safe">
		<div class="member-safe-page">
			<XtxCenterHead title="安全设置" />
			<SafeHome />
		</div>
	</div>
</template>

<script>
import XtxCenterHead from '@/components/library/xtx-center-head';
import SafeHome from './components/safe-home';
export default {
	name: 'MemberSafe',
	components: { SafeHome, XtxCenterHead },
};
</script>

<style lang="less" scoped>
.xtx-safe {
	flex: 1;
	min-height: 100%;
	background: #fff;
	padding-bottom: 25px;
	.xtx-center-head {
		line-height: 70px;
		margin: 0 25px;
		height: 70px;
		border-bottom: 1px solid #f5f5f5;
		.title {
			font-size: 16px;
			font-weight: 400;
		}
	}
}
</style>
