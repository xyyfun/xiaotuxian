<template>
	<nav class="app-topnav">
		<div class="container">
			<ul>
				<li v-if="$store.state.user.userInfo.account">
					<router-link to="/member">
						<i class="iconfont icon-icon-user"></i>
						{{ $store.state.user.userInfo.account }}
					</router-link>
				</li>
				<li v-if="$store.state.user.userInfo.id">
					<a href="javascript:;" @click="loginOut">退出登录</a>
				</li>
				<li v-else>
					<router-link to="/login">请先登录</router-link>
				</li>
				<li v-if="!$store.state.user.userInfo.id">
					<router-link to="/register">免费注册</router-link>
				</li>
				<li><router-link to="/member/order">我的订单</router-link></li>
				<li><a href="javascript:;">会员中心</a></li>
				<li><a href="javascript:;">帮助中心</a></li>
				<li><a href="javascript:;">关于我们</a></li>
				<li>
					<a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
import { removeUserInfo } from '@/utils/userInfo';
export default {
	name: 'AppNav',
	methods: {
		loginOut() {
			this.$confirm('确定退出吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					// 清空本地存储
					removeUserInfo();
					this.$store.commit('user/loginOut');
					this.$message({
						type: 'success',
						message: '退出成功!',
					});
					this.$router.push('/login');
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消退出',
					});
				});
		},
	},
};
</script>

<style lang="less" scoped>
@import '@/assets/styles/variables.less';
.app-topnav {
	background: #333;
	ul {
		display: flex;
		height: 53px;
		justify-content: flex-end;
		align-items: center;
		li {
			a {
				padding: 0 15px;
				color: #cdcdcd;
				line-height: 1;
				display: inline-block;
				i {
					font-size: 14px;
					margin-right: 2px;
				}
				&:hover {
					color: @xtxColor;
				}
			}
			~ li {
				a {
					border-left: 2px solid #666;
				}
			}
		}
	}
}
</style>
