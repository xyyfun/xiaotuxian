<template>
	<div class="xtx-safe-body">
		<div class="item">
			<div class="icon">
				<span class="iconfont icon-jiesuo"></span>
			</div>
			<div class="text">
				<p>登录密码</p>
				<p>建议您定期更换密码，设置安全性高的密码可以使帐号更安全</p>
			</div>
			<a href="javascript:;" class="btn" @click="isShowDialog = !isShowDialog">更换</a>
		</div>
		<div class="item">
			<div class="icon">
				<span class="iconfont icon-phone"></span>
			</div>
			<div class="text">
				<p>安全手机 180******49</p>
				<p>安全手机可以用于登录帐号，重置密码或其他安全验证</p>
			</div>
			<a href="#/member/safe/mobile" class="btn">更换</a>
		</div>
		<div class="xtx-safe-warn">
			<p>安全服务提示</p>
			<p>
				确认您登录的是小兔鲜儿网址，注意防范进入钓鱼网站，不要轻信各种即时通讯工具发送的商品或支付链接，谨防网购
				诈骗
			</p>
			<p>建议您安装杀毒软件，并定期更新操作系统等软件补丁，确保帐号及交易安全</p>
		</div>
		<transition>
			<XtxDialogVue title="修改密码" v-show="isShowDialog">
				<template slot="body">
					<div class="form-item">
						<span class="label">原密码：</span><input type="text" placeholder="请输入原密码" />
					</div>
					<div class="form-item">
						<span class="label">新的密码：</span
						><input type="text" placeholder="设置6至20位登录密码" />
					</div>
					<div class="form-item">
						<span class="label">确认密码：</span
						><input type="text" placeholder="请再次输入登录密码" />
					</div>
				</template>
				<template slot="footer">
					<a
						href="javascript:;"
						type="info"
						class="xtx-common-btn"
						@click="isShowDialog = !isShowDialog"
						>取消</a
					><a href="javascript:;" type="primary" class="xtx-common-btn">保存</a>
				</template>
			</XtxDialogVue>
		</transition>
	</div>
</template>

<script>
import XtxDialogVue from '@/components/library/xtx-dialog.vue';
export default {
	name: 'SafeHome',
	data() {
		return {
			isShowDialog: false,
		};
	},
	components: { XtxDialogVue },
};
</script>

<style lang="less" scoped>
.xtx-safe-body {
	width: 780px;
	margin: 0 auto;
	padding-top: 50px;
	.item {
		display: flex;
		height: 124px;
		align-items: center;
		border-bottom: 1px solid #f5f5f5;
		.icon {
			width: 90px;
			text-align: center;
			.iconfont {
				font-size: 32px;
				color: #27ba9b;
			}
		}
		.text {
			flex: 1;
			line-height: 30px;
			p:first-child {
				font-size: 16px;
			}
			p:last-child {
				color: #999;
			}
		}
		.btn {
			width: 160px;
			height: 50px;
			background: #27ba9b;
			color: #fff;
			border-radius: 4px;
			font-size: 16px;
			text-align: center;
			line-height: 50px;
		}
	}
	.xtx-safe-warn {
		padding: 20px;
		margin-top: 40px;
		background: #f5f5f5;
		color: #999;
		line-height: 30px;
		p:first-child {
			line-height: 40px;
			color: #333;
		}
		p ~ p {
			padding-left: 10px;
			position: relative;
		}
		p ~ p:before {
			content: '•';
			position: absolute;
			left: 0;
			top: 0;
		}
	}
}
</style>
