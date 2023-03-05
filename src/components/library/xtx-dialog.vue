<template>
	<div class="xtx-dialog">
		<div class="new-box" :style="{ width }">
			<h4 class="title">{{ title }}</h4>
			<div class="body">
				<slot name="body"></slot>
			</div>
			<div class="footer">
				<slot name="footer"></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'XtxDialog',
	props: ['title', 'width'],
};
</script>

<style lang="less" scoped>
.xtx-dialog {
	width: 100%;
	height: 110%;
	position: fixed;
	left: 0;
	top: 0;
	background: rgba(0, 0, 0, 0.4);
	z-index: 999;
	> .new-box {
		width: 600px;
		background: #fff;
		position: absolute;
		left: 50%;
		top: 47%;
		transform: translate(-50%, -50%);
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		> .title {
			font-weight: 400;
			font-size: 18px;
			line-height: 70px;
			padding-left: 20px;
			height: 70px;
			border-bottom: 1px solid #f5f5f5;
		}
		> .body {
			padding: 20px 40px;
			overflow-y: auto;
			max-height: 540px;
			overflow: auto;
			&::-webkit-scrollbar {
				/*滚动条整体样式*/
				width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
				height: 1px;
			}
			&::-webkit-scrollbar-thumb {
				/*滚动条里面小方块*/
				border-radius: 10px;
				// box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
				background: #b5b5b5;
			}
			&::-webkit-scrollbar-track {
				/*滚动条里面轨道*/
				border-radius: 10px;
				background: #f5f5f5;
			}
			// 地址
			.form-item {
				display: flex;
				line-height: 50px;
				padding-bottom: 20px;
				.label {
					width: 150px;
					text-align: right;
					padding-right: 10px;
					color: #999;
				}
				input {
					width: 350px;
					height: 50px;
					border: 1px solid #e4e4e4;
					padding: 0 10px;
				}
				.xtx-city {
					width: 350px;
					height: 50px;
					min-width: 150px;
					display: inline-block;
					position: relative;
					vertical-align: middle;
					.curr-wrapper {
						width: 100%;
						line-height: 48px;
						padding-left: 10px;
						height: 100%;
						border: 1px solid #e4e4e4;
						padding: 0 5px;
						display: flex;
						justify-content: space-between;
						position: relative;
						z-index: 10;
						overflow: hidden;
						.ph {
							color: #ccc;
						}
						.cityAddress {
							color: #333;
						}
						.iconfont {
							transition: all 0.5s;
							color: #ccc;
						}
					}
				}
			}
			// 提交订单切换地址
			.item {
				padding: 10px 20px;
				border: 1px solid #e4e4e4;
				margin-bottom: 20px;
				position: relative;
			}
			.selected {
				background-color: #e3f9f4;
				border-color: #27ba9b;
			}
			// 取消订单
			.cancel-info {
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
			.default {
				flex: 1;
				dl {
					line-height: 30px;
					display: flex;
					dt {
						width: 80px;
						color: #999;
					}
					dd {
						flex: 1;
					}
				}
			}
		}
		> .footer {
			padding: 10px 0 30px;
			text-align: center;
			.xtx-common-btn {
				width: 180px;
				height: 50px;
				line-height: 48px;
				font-size: 16px;
				color: #fff;
				text-align: center;
				border-radius: 4px;
				display: inline-block;
				border-color: transparent;
				cursor: pointer;
			}
			.xtx-common-btn[type='primary'] {
				background: #27ba9b;
			}
			.xtx-common-btn[type='info'] {
				background: #ccc;
				margin-right: 10px;
			}
		}
	}
} /* 进入的起点,离开的终点 */
.v-enter,
.v-leave-to {
	transform: translateY(-20px);
	opacity: 0;
}
/* 进入进行时,离开进行时 */
.v-enter-active {
	transition: all 0.4s;
}

/* 进入的终点,离开的起点 */
.v-enter-to,
.v-leave {
	transform: none;
	opacity: 1;
}
</style>
