<template>
	<div class="xtx-wrapper">
		<div class="container">
			<div class="xtx-card">
				<h3>新用户注册</h3>
				<form action="" class="xtx-form">
					<div class="xtx-form-item">
						<span class="iconfont icon-icon-user"></span>
						<input
							v-model="userName"
							type="text"
							placeholder="设置用户名称"
							:class="{ yes: verify.userName }"
						/>
						<span class="msg" v-if="!verify.userName">该用户名已被注册！</span>
					</div>
					<div class="xtx-form-item">
						<span class="iconfont icon-shoujihao"></span>
						<input
							v-model="phone"
							type="text"
							placeholder="输入手机号码"
							:class="{ yes: verify.phone }"
						/>
						<span class="msg" v-show="!verify.phone">请输入中国大陆+86手机号</span>
					</div>
					<div class="xtx-form-item">
						<span class="iconfont icon-yanzhengma"></span>
						<input
							v-model="code"
							type="text"
							placeholder="短信验证码"
							:class="{ yes: verify.code }"
						/>
						<span class="msg" v-if="!verify.code">请输入短信验证码</span>
						<a class="code" href="javascript:;" @click="sendCode">发送验证码</a>
					</div>
					<div class="xtx-form-item">
						<span class="iconfont icon-jiesuo"></span>
						<input
							v-model="password"
							type="password"
							placeholder="设置6至20位字母、数字和符号组合"
							:class="{ yes: verify.password }"
						/>
						<span class="msg" v-if="!verify.password">设置6至20位字母、数字和符号组合</span>
					</div>
					<div class="xtx-form-item">
						<span class="iconfont icon-jiesuo"></span>
						<input
							v-model="confirm"
							type="password"
							placeholder="请再次输入上面密码"
							:class="{ yes: verify.confirm }"
						/>
						<span class="msg" v-if="!verify.confirm">确保密码一致</span>
					</div>
					<div class="xtx-form-item pl50">
						<i class="iconfont" :class="icon" @click="changChecked"></i>
						已阅读并同意<i>《用户服务协议》</i>
						<span v-if="icon === 'icon-duoxuanweixuanzhong'">请同意协议</span>
					</div>
					<div class="xtx-form-item">
						<button class="submit" @click="registerUser">下一步</button>
						<!-- <a class="submit" href="javascript:;">下一步</a> -->
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { getCode, isUnique, register } from '@/api/register';
import {
	phoneValidate,
	passwordValidate,
	confirmValidate,
	codeValidate,
} from '@/utils/formValidate';
export default {
	name: 'Register',
	data() {
		return {
			userName: '',
			phone: '',
			code: '',
			password: 'Li123@',
			confirm: 'Li123@',
			verify: {
				userName: true,
				phone: true,
				code: true,
				password: true,
				confirm: true,
				agreement: true,
			},
			icon: 'icon-duoxuanxuanzhong',
		};
	},
	watch: {
		userName(newVal) {
			isUnique(newVal).then(data => {
				if (data.data.code === '1') {
					if (data.data.result.valid) return (this.verify.userName = true);
					this.verify.userName = false;
				} else {
					return Promise.reject(new Error('file'));
				}
			});
		},
		phone(newVal) {
			if (phoneValidate(newVal)) return (this.verify.phone = true);
			this.verify.phone = false;
		},
		code(newVal) {
			if (codeValidate(newVal)) return (this.verify.code = true);
			this.verify.code = false;
		},
		password(newVal) {
			if (passwordValidate(newVal)) return (this.verify.password = true);
			this.verify.password = false;
		},
		confirm(newVal) {
			if (confirmValidate(newVal, this.password)) return (this.verify.confirm = true);
			this.verify.confirm = false;
		},
	},
	methods: {
		sendCode() {
			getCode(this.phone).then(data => {
				if (data.data.code === '1') {
					this.code = 123456;
					this.verify.code = true;
				}
			});
		},
		changChecked() {
			if (this.verify.agreement) {
				this.icon = 'icon-duoxuanweixuanzhong';
				this.verify.agreement = false;
			} else {
				this.icon = 'icon-duoxuanxuanzhong';
				this.verify.agreement = true;
			}
		},
		registerUser() {
			if (Object.values(this.verify).includes(false)) {
				alert('请输入完整信息');
			} else {
				let data = {
					account: this.userName,
					mobile: this.phone,
					code: this.code,
					password: this.password,
				};
				register(data).then(data => {
					console.log(data);
				});
			}
		},
	},
};
</script>

<style lang="less" scoped>
.xtx-wrapper {
	background: #f5f5f5;
	.container {
		padding: 50px 0;
		.xtx-card {
			width: 100%;
			height: 800px;
			background: #fff;
			h3 {
				font-size: 26px;
				font-weight: normal;
				color: #999999;
				padding-left: 50px;
				height: 180px;
				line-height: 180px;
			}
			.xtx-form {
				padding-left: 460px;
				.xtx-form-item {
					position: relative;
					padding-bottom: 24px;
					span:first-child {
						position: absolute;
						left: 15px;
						top: 13px;
						color: #666;
						font-size: 18px;
					}
					input {
						width: 300px;
						height: 50px;
						border: 1px solid #e4e4e4;
						padding-left: 40px;
					}
					.yes {
						border-color: #27ba9b;
					}
					.msg {
						color: #ff4d4f;
						position: absolute;
						left: 2px;
						bottom: 2px;
					}
					a {
						position: absolute;
						left: 200px;
						top: 0;
						width: 100px;
						height: 50px;
						line-height: 50px;
						color: #fff;
						text-align: center;
						font-size: 14px;
						background-color: #27ba9b;
					}
					.submit {
						width: 300px;
						height: 50px;
						background: #27ba9b;
						border: none;
						border-radius: 4px;
						display: block;
						font-size: 16px;
						color: #fff;
						text-align: center;
						line-height: 50px;
						cursor: pointer;
					}
				}
				.pl50 {
					cursor: pointer;
					i {
						color: #27ba9b;
						font-size: 14px;
					}
					span {
						position: absolute;
						top: 20px;
						left: 0;
						color: #ff4d4f;
					}
				}
			}
		}
	}
}
</style>
