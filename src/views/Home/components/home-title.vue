<template>
	<div class="home-title">
		<!-- <h3>
			新鲜毫无
			<span>新鲜出入 品质靠谱</span>
		</h3>
		<ul>
			<li><a href="javascript:;">茶咖酒具</a></li>
			<li><a href="javascript:;">茶咖酒具</a></li>
			<li><a href="javascript:;">茶咖酒具</a></li>
			<li><a href="javascript:;">茶咖酒具</a></li>
			<li><a href="javascript:;">茶咖酒具</a></li>
		</ul>
		<a href="javascript:;">
			<span>查看全部</span>
			<i>&gt;</i>
		</a> -->
		<slot name="title"></slot>
		<slot name="nav"></slot>
		<slot name="more"></slot>
	</div>
</template>

<script>
export default {
	name: 'HomeTitle',
};
</script>

<style lang="less" scoped>
@import '@/assets/styles/variables.less';
.home-title {
	display: flex;
	padding: 40px 0;
	align-items: flex-end;
	h3 {
		flex: 1;
		font-size: 32px;
		font-weight: 400;
		margin-left: 6px;
		height: 35px;
		line-height: 35px;
		span {
			font-size: 16px;
			color: #999;
			margin-left: 20px;
		}
	}
	ul {
		display: flex;
		margin-bottom: 2px;
		li {
			a {
				padding: 2px 12px;
				font-size: 16px;
				border-radius: 4px;
				&:hover {
					color: #fff;
					background-color: @xtxColor;
				}
			}
			&:last-child {
				margin-right: 80px;
			}
		}
	}
	.more {
		margin-bottom: 2px;
		&:hover > span,
		&:hover > i {
			color: @xtxColor;
		}
		span {
			font-size: 16px;
			vertical-align: middle;
			margin-right: 4px;
			color: #999;
		}
		i {
			font-size: 14px;
			vertical-align: middle;
			color: #ccc;
		}
	}
	.xtx-btn-brand {
		width: 20px;
		height: 20px;
		background: #ccc;
		color: #fff;
		display: inline-block;
		text-align: center;
		margin-left: 5px;
	}
	.next {
		background: #27ba9b;
	}
}
</style>
