<template>
	<div class="xtx_body_main">
		<div class="xtx-tab">
			<div class="xtx-tab-head">
				<a class="active">基本信息</a><a class="">兴趣分类</a><a class="">我的尺码</a>
			</div>
			<div class="xtx-tab-body">
				<InfoPage />
			</div>
		</div>
	</div>
</template>

<script>
import InfoPage from './components/info-page';
export default {
	name: 'MemberInfo',
	components: { InfoPage },
};
</script>

<style lang="less" scoped>
.xtx_body_main {
	flex: 1;
	background: #fff;
	padding-bottom: 25px;
	min-height: 100%;
	.xtx-tab .xtx-tab-head {
		height: 60px;
		width: 100%;
		border-bottom: 1px solid #f5f5f5;
		> a {
			width: 107px;
			height: 100%;
			border-right: 1px solid #f5f5f5;
			float: left;
			line-height: 59px;
			text-align: center;
			font-size: 16px;
			border-top: 2px solid transparent;
			cursor: pointer;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
		}
		.active {
			color: #27ba9b;
			border-top-color: #27ba9b;
			background: #fff;
			height: 60px;
		}
	}
}
</style>
