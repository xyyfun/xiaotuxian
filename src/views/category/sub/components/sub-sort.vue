<template>
	<div class="sub-sort">
		<div class="sort">
			<a class="active" href="javascript:;">默认排序</a><a class="" href="javascript:;">最新商品</a
			><a class="" href="javascript:;">最高人气</a><a class="" href="javascript:;">评论最多</a
			><a href="javascript:;"> 价格排序 <i class="arrow up"></i><i class="arrow down"></i></a>
		</div>
		<div class="check">
			<div class="xtx-checkbox">
				<i class="iconfont icon-unchecked"></i><span>仅显示有货商品</span>
			</div>
			<div class="xtx-checkbox">
				<i class="iconfont icon-unchecked"></i><span>仅显示特惠商品</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SubSort',
};
</script>

<style lang="less" scoped>
.sub-sort {
	height: 80px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.sort {
		display: flex;
		a {
			height: 30px;
			line-height: 28px;
			border: 1px solid #e4e4e4;
			padding: 0 20px;
			margin-right: 20px;
			color: #999;
			border-radius: 2px;
			position: relative;
			transition: all 0.3s;
		}
		.active {
			background: #27ba9b;
			border-color: #27ba9b;
			color: #fff;
		}
	}
	.check {
		.xtx-checkbox {
			margin-left: 20px;
			color: #999;
			display: inline-block;
			margin-right: 2px;
			i {
				position: relative;
				top: 1px;
			}
			span {
				margin-left: 2px;
			}
		}
	}
}
</style>
