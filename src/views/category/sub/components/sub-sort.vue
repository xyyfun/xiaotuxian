<template>
	<div class="sub-sort">
		<div class="sort">
			<a
				:class="{ active: now === item.sortMethod }"
				href="javascript:;"
				v-for="(item, index) in sort"
				:key="index"
				@click="changFilter(item.sortMethod)">
				{{ item.name }}
			</a>
			<!-- <a class="" href="javascript:;">最新商品</a>
			<a class="" href="javascript:;">最高人气</a>
			<a class="" href="javascript:;">评论最多</a> -->
		</div>
		<div class="check">
			<div class="xtx-checkbox" @click="inventory" :class="available ? 'active' : ''">
				<i
					class="iconfont"
					:class="available ? 'icon-duoxuanxuanzhong' : 'icon-duoxuanweixuanzhong'"></i>
				<span>仅显示有货商品</span>
			</div>
			<div class="xtx-checkbox" @click="onlyDiscount" :class="discounts ? 'active' : ''">
				<i
					class="iconfont"
					:class="discounts ? 'icon-duoxuanxuanzhong' : 'icon-duoxuanweixuanzhong'"></i>
				<span>仅显示特惠商品</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SubSort',
	data() {
		return {
			sort: [
				{
					sortMethod: 'default',
					name: '默认排序',
				},
				{
					sortMethod: 'asc',
					name: '价格升序',
				},
				{
					sortMethod: 'desc',
					name: '价格降序',
				},
			],
			now: 'default',
			available: false, // 是否有货
			discounts: false, // 是否特惠
		};
	},
	methods: {
		changFilter(sortMethod) {
			if (sortMethod === this.now) return;
			this.now = sortMethod;
			this.$bus.$emit('changFilter', sortMethod);
		},
		inventory() {
			this.available = !this.available;
			this.$bus.$emit('changFilter', 'inventory', this.available);
		},
		onlyDiscount() {
			this.discounts = !this.discounts;
			this.$bus.$emit('changFilter', 'onlyDiscount', this.discounts);
		},
	},
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
			cursor: pointer;
			i {
				position: relative;
				top: 1px;
			}
			span {
				margin-left: 2px;
			}
		}
		.active {
			color: #27ba9b;
		}
	}
}
</style>
