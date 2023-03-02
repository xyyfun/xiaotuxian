<template>
	<div class="xtx-safe">
		<div class="member-safe-page">
			<div class="xtx-center-head">
				<h4 class="title">安全设置</h4>
			</div>
			<SafeHome />
		</div>
	</div>
</template>

<script>
import SafeHome from './components/safe-home';
export default {
	name: 'MemberSafe',
	components: { SafeHome },
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
