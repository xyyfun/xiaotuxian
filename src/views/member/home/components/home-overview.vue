<template>
	<div class="xtx_overview">
		<div class="user_meta">
			<div class="avatar">
				<img :src="userInfo.avatar" alt="" />
			</div>
			<h4>{{ userInfo.account }}</h4>
		</div>
		<div class="item">
			<a href="javascript:;"
				><i class="iconfont icon-huiyuan"></i>
				<p>会员中心</p></a
			><a href="javascript:;"
				><i class="iconfont icon-shezhi"></i>
				<p>安全设置</p></a
			><router-link to="/member/address"
				><i class="iconfont icon-daohangdizhi"></i>
				<p>地址管理</p></router-link
			>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'HomeOverview',
	computed: {
		...mapState('user', ['userInfo']),
	},
};
</script>

<style lang="less" scoped>
.xtx_overview {
	width: 996px;
	height: 132px;
	background: url(../../../../assets/images/center-bg.png) no-repeat 50% / cover;
	display: flex;
	.user_meta {
		flex: 1;
		display: flex;
		align-items: center;
		.avatar {
			width: 85px;
			height: 85px;
			border-radius: 50%;
			overflow: hidden;
			margin-left: 60px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		h4 {
			padding-left: 26px;
			font-size: 18px;
			font-weight: 400;
			color: #fff;
		}
	}
	.item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-around;
		a {
			color: #fff;
			font-size: 16px;
			text-align: center;
			i {
				font-size: 32px;
			}
			p {
				line-height: 40px;
			}
		}
	}
}
</style>
