<template>
	<div class="sub-filter" v-if="saleProperties.length">
		<div class="item" v-for="(item, indx) in saleProperties" :key="item.id">
			<div class="head">{{ item.name }}：</div>
			<div class="body">
				<a
					class="ellipsis"
					:class="{ active: item.id === list.id }"
					:title="list.name"
					href="javascript:;"
					@click="changFilter(item.name, list.name, list.id, indx)"
					v-for="(list, index) in item.properties"
					:key="index">
					{{ list.name }}
				</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SubFilter',
	props: {
		saleProperties: {
			type: Array,
			default: () => [],
		},
	},
	methods: {
		changFilter(item, list, id, index) {
			this.$emit(
				'changFilter',
				{
					groupName: item,
					propertyName: list,
					index,
				},
				id
			);
		},
	},
	beforeDestroy() {
		this.$off('changFilter');
	},
};
</script>

<style lang="less" scoped>
.sub-filter {
	background: #fff;
	padding: 25px;
	.item {
		display: flex;
		.head {
			width: 80px;
			color: #999;
			line-height: 40px;
		}
		.body {
			flex: 1;
			a {
				margin-right: 36px;
				transition: all 0.3s;
				display: inline-block;
				max-width: 112px;
				line-height: 40px;
			}
			.active,
			a:hover {
				color: #27ba9b;
			}
		}
	}
}
</style>
