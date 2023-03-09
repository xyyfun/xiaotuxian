<template>
	<div class="page-download xtx-wrapper">
		<div class="container">
			<div class="card">
				<div class="img">
					<img src="../../assets/images/phone.8e64f904.png" alt="" />
				</div>
				<div class="app">
					<h1>小兔鲜儿App</h1>
					<h3>品质新鲜、价格亲民、物流快捷</h3>
					<div class="download">
						<div class="code">
							<img src="../../assets/images/qrcode.jpg" alt="" />
						</div>
						<div class="btn" style="margin-top: 20px">
							<button class="xtx-button">ios版本下载</button
							><button class="xtx-button" style="margin-top: 20px">安卓版本下载</button>
							<p>最新版本: V1.1.0</p>
							<p>更新日期: 2020-06-01</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Download',
};
</script>

<style lang="less" scoped>
.xtx-wrapper {
	position: relative;
	background: #f5f5f5;
	overflow: hidden;
	.card {
		background: #fff;
		display: flex;
		padding: 100px 20px;
		margin-top: 25px;
		align-items: center;
		> div {
			flex: 1;
		}
	}
	.download {
		background: #fff;
		display: flex;
		> div {
			flex: 1;
			p {
				margin: 10px;
			}
		}
		.xtx-button {
			line-height: 1;
			white-space: nowrap;
			cursor: pointer;
			text-align: center;
			box-sizing: border-box;
			outline: none;
			border-radius: 4px;
			display: inline-block;
			width: 180px;
			height: 50px;
			background-color: #27ba9b;
			border: 1px solid #27ba9b;
			color: #fff;
			font-size: 16px;
		}
	}
}
</style>
