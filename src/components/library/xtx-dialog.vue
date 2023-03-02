<template>
	<div class="xtx-dialog">
		<div class="new-box">
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
	props: ['title'],
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
	z-index: 9999;
	// opacity: 0;
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
			padding: 20px 75px;
			overflow-y: auto;
			max-height: 540px;
			overflow: visible;
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
						.selected {
							color: #333;
						}
						.iconfont {
							transition: all 0.5s;
							color: #ccc;
						}
					}
				}
			}
		}
		> .footer {
			padding: 10px 0 30px;
			text-align: center;
			.xtx-common-btn[type='primary'] {
				background: #27ba9b;
			}
			.xtx-common-btn[type='info'] {
				background: #ccc;
				margin-right: 10px;
			}
			.xtx-common-btn {
				width: 180px;
				height: 50px;
				line-height: 48px;
				font-size: 16px;
				color: #fff;
				text-align: center;
				border-radius: 4px;
				display: inline-block;
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
