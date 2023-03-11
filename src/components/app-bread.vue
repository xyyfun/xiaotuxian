<template>
	<div class="xtx-bread">
		<div class="xtx-bread-item">
			<router-link to="/" class="router-link-active">首页</router-link>
			<i class="iconfont icon-right"></i>
		</div>
		<div class="xtx-bread-item" v-for="(item, index) in result" :key="index">
			<router-link :to="`${item.id}`" class="router-link-active">{{ item.name }}</router-link>
			<i class="iconfont icon-right"></i>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AppBread',
	data() {
		return {
			result: [],
		};
	},
	mounted() {
		this.$bus.$on('bread', value => {
			this.result = value;
		});
	},
	beforeDestroy() {
		this.$bus.$off('bread');
	},
};
</script>

<style lang="less" scoped>
.xtx-bread {
	display: flex;
	padding: 25px 10px;
	.xtx-bread-item {
		a {
			color: #666;
			transition: all 0.4s;
			&:hover {
				color: #27ba9b;
			}
		}
		i {
			font-size: 12px;
			margin-left: 5px;
			margin-right: 5px;
			line-height: 22px;
		}
	}
	.xtx-bread-item:last-child > i {
		display: none;
	}
}
</style>
