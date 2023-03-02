<template>
	<div class="xtx-dialog" style="">
		<div class="wrapper">
			<div class="header">
				<h3>取消订单</h3>
				<a href="JavaScript:;" class="iconfont icon-close-new"></a>
			</div>
			<div class="body">
				<div class="cancel-info">
					<p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
					<p class="tip">请选择取消订单的原因（必选）：</p>
					<div class="btn">
						<a
							href="javascript:;"
							@click="sendCause(value)"
							:class="{ active: reason === value }"
							v-for="(value, index) in reasons"
							:key="index"
							>{{ value }}</a
						>
					</div>
				</div>
			</div>
			<div class="footer">
				<button
					class="xtx-button ellipsis middle gray"
					data-v-1e3a5560=""
					style="margin-right: 20px"
				>
					取消</button
				><button class="xtx-button ellipsis middle primary" @click="send">确认</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'XtxCancelWindow',
	data() {
		return {
			reasons: [
				'配送信息有误',
				'商品买错了',
				'重复下单/误下单',
				'忘记使用优惠券、兔币等',
				'其他渠道价格更低',
				'不想买了',
			],
			reason: '',
		};
	},
	methods: {
		sendCause(params) {
			this.reason = params;
		},
		send() {
			if (this.reason) {
				this.$bus.$emit('send', this.reason);
			} else {
				this.$message({
					message: '请选择取消订单的原因！',
					type: 'warning',
				});
			}
		},
	},
};
</script>

<style lang="less" scoped>
.xtx-dialog {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 1000;
	background: rgba(0, 0, 0, 0.4);
	.wrapper {
		width: 620px;
		background: #fff;
		border-radius: 4px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -60%);
		// opacity: 0;
		.header {
			position: relative;
			height: 70px;
			line-height: 70px;
			padding: 0 20px;
			border-bottom: 1px solid #f5f5f5;
			h3 {
				font-weight: 400;
				font-size: 18px;
			}
			a {
				position: absolute;
				right: 25px;
				top: 25px;
				font-size: 24px;
				width: 20px;
				height: 20px;
				line-height: 20px;
				text-align: center;
				color: #999;
			}
		}
		.body {
			padding: 20px 40px;
			font-size: 16px;
			p {
				font-size: 16px;
				line-height: 35px;
				.tip {
					color: #999;
				}
			}
			.btn {
				padding-top: 21px;
				display: flex;
				flex-wrap: wrap;
				a {
					width: 256px;
					height: 45px;
					line-height: 45px;
					text-align: center;
					background-color: #fff;
					border: 1px solid #e4e4e4;
					margin-right: 20px;
					margin-bottom: 20px;
					color: #666;
					&:nth-child(2n) {
						margin-right: 0;
					}
				}
				.active,
				a:hover {
					background-color: #e3f9f4;
					border-color: #27ba9b;
				}
			}
		}
		.footer {
			text-align: center;
			padding: 10px 0 30px 0;
			.xtx-button {
				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;
				border: none;
				outline: none;
				background: #fff;
				text-align: center;
				border: 1px solid transparent;
				border-radius: 4px;
				cursor: pointer;
				width: 180px;
				height: 50px;
				font-size: 16px;
			}
			.primary {
				border-color: #27ba9b;
				background: #27ba9b;
				color: #fff;
			}
			.gray {
				border-color: #ccc;
				background: #ccc;
				color: #fff;
				margin-right: 20px;
			}
		}
	}
}
</style>
