<template>
	<div class="sub-list">
		<h3>全部分类</h3>
		<ul>
			<li v-for="item in categoryAll" :key="item.id">
				<router-link :to="`/category/sub/${item.id}`" class="">
					<img v-lazy="item.picture" />
					<p>{{ item.name }}</p>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'CategoryAll',
	props: {
		categoryAll: {
			type: Array,
		},
	},
};
</script>

<style lang="less" scoped>
.sub-list {
	background-color: #fff;
	ul {
		display: flex;
		padding: 0 32px;
		flex-wrap: wrap;
		min-height: 160px;
		li {
			width: 168px;
			height: 160px;
			a {
				text-align: center;
				display: block;
				font-size: 16px;
				img {
					width: 100px;
					height: 100px;
				}
				p {
					line-height: 40px;
				}
			}
		}
	}
}
</style>
