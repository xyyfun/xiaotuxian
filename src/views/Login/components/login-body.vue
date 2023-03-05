<template>
	<div class="login-body">
		<div class="wrapper">
			<nav><a href="">账号登录</a><a href="">扫码登录</a></nav>
			<div class="account-box">
				<div class="toggle">
					<a href=""><i class="iconfont icon-comment"></i>使用短信登录</a>
				</div>
				<form class="form" action="">
					<div class="form-item">
						<div class="input">
							<i class="iconfont icon-icon-user"></i>
							<input type="text" :class="{ active: validate.account }" v-model="account" />
						</div>
						<div class="error" v-if="!validate.account">请输入用户名</div>
					</div>
					<div class="form-item">
						<div class="input">
							<i class="iconfont icon-jiesuo"></i>
							<input type="password" :class="{ active: validate.password }" v-model="password" />
						</div>
						<div class="error" v-if="!validate.password">请输入密码</div>
					</div>
					<div class="form-item">
						<div class="agree">
							<div class="xtx-checked">
								<i class="iconfont" :class="ico" @click="changChecked"></i>
								<span>我已同意</span>
								<a href="">《隐私条款》</a>
								<span>和</span>
								<a href="">《服务条款》</a>
							</div>
							<div class="error" v-if="!validate.isChecked">请阅读并同意条款</div>
						</div>
					</div>
					<a href="javascript:;" @click="userLogin" class="btn">立即登录</a>
				</form>
				<div class="action">
					<a
						href="https://graph.qq.com/oauth2.0/authorize?client_id=101941968&response_type=token&scope=all&redirect_uri=http%3A%2F%2Ferabbit.itheima.net%2F%23%2Flogin%2Fcallback"
					>
						<img
							src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
							alt=""
						/>
					</a>
					<div class="url">
						<a href="">忘记密码</a><router-link to="/register">免费注册</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { login } from '@/api/login';
import { setUserInfo, setToken } from '@/utils/userInfo';
export default {
	name: 'LoginBody',
	data() {
		return {
			account: 'xiaotuxian001',
			password: '123456',
			ico: 'icon-duoxuanweixuanzhong',
			validate: {
				account: false,
				password: false,
				isChecked: false,
			},
		};
	},
	watch: {
		account(newVal) {
			if (newVal) return (this.validate.account = true);
			this.validate.account = false;
		},
		password(newVal) {
			if (newVal) return (this.validate.password = true);
			this.validate.password = false;
		},
	},
	methods: {
		// 用户登录
		userLogin() {
			if (Object.values(this.validate).includes(false)) {
				this.$message({
					message: '警告信息！请确保信息填写完整',
					type: 'warning',
				});
			} else {
				let data = {
					account: this.account,
					password: this.password,
				};
				login(data).then(
					data => {
						if (data.data.code === '1') {
							// 持久化用户信息
							setUserInfo(JSON.stringify(data.data.result));
							// 持久化token
							setToken(data.data.result.token);
							// 将token存储至vuex
							this.$store.commit('user/setToken', data.data.result.token);
							// 将用户信息存储vux
							this.$store.commit('user/setUserInfo', data.data.result);
							this.$message({
								message: '登录成功！',
								type: 'success',
							});
							this.$router.push('/home');
						}
					},
					error => {
						this.$message({
							message: error.message,
							type: 'error',
						});
					}
				);
			}
		},
		changChecked() {
			if (this.validate.isChecked) {
				this.validate.isChecked = false;
				this.ico = 'icon-duoxuanweixuanzhong';
			} else {
				this.validate.isChecked = true;
				this.ico = 'icon-duoxuanxuanzhong';
			}
		},
	},
};
</script>

<style lang="less" scoped>
.active {
	border-color: #27ba9b !important;
}
.login-body {
	background: url(../../../assets/images/login-bg.png) no-repeat 50% / cover;
	height: 488px;
	position: relative;
	.wrapper {
		width: 380px;
		background: #fff;
		min-height: 400px;
		position: absolute;
		left: 50%;
		top: 54px;
		transform: translate3d(100px, 0, 0);
		box-shadow: 0 0 10px rgb(0 0 0 / 15%);
		nav {
			height: 55px;
			border-bottom: 1px solid #f5f5f5;
			display: flex;
			padding: 0 40px;
			text-align: right;
			align-items: center;
			a {
				flex: 1;
				line-height: 1;
				display: inline-block;
				font-size: 18px;
				position: relative;
				text-align: center;
				.active {
					color: #27ba9b;
					font-weight: 700;
				}
			}
		}
		.account-box {
			.toggle {
				padding: 15px 40px;
				text-align: right;
				a {
					color: #27ba9b;
					i {
						font-size: 14px;
					}
				}
			}
			.form {
				padding: 0 40px;
				.form-item {
					margin-bottom: 28px;
					.input {
						position: relative;
						height: 36px;
						i {
							width: 34px;
							height: 34px;
							position: absolute;
							text-align: center;
							line-height: 34px;
							font-size: 24px;
						}
						input {
							padding-left: 44px;
							border: 1px solid #cfcdcd;
							height: 36px;
							line-height: 36px;
							width: 100%;
						}
					}
					.xtx-checked {
						i {
							cursor: pointer;
						}
					}
				}
				.btn {
					display: block;
					width: 100%;
					height: 40px;
					color: #fff;
					text-align: center;
					line-height: 40px;
					background: #27ba9b;
				}
				.error {
					position: absolute;
					font-size: 14px;
					line-height: 28px;
					color: #cf4444;
				}
			}
			.action {
				padding: 20px 40px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.url {
					a {
						margin-left: 10px;
					}
				}
				a {
					color: #999;
				}
			}
		}
	}
}
</style>
