<template>
	<div class="layer" :class="{ open: isShow }">
		<ul>
			<li v-for="item in children" :key="item.id">
				<a href="javascript:;"
					><img :src="item.picture" alt="" />
					<p>{{ item.name }}</p></a
				>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'AppHeaderNav',
	data() {
		return {
			isShow: false,
		};
	},
	props: ['children'],
};
</script>

<style lang="less" scoped>
.open {
	height: 132px !important;
	opacity: 1 !important;
}
.layer {
	width: 1240px;
	background-color: #fff;
	position: absolute;
	z-index: 998;
	left: -200px;
	top: 56px;
	height: 0;
	overflow: hidden;
	opacity: 0;
	box-shadow: 0 0 5px #ccc;
	transition: all 0.2s 0.1s;
	ul {
		display: flex;
		flex-wrap: wrap;
		padding: 0 70px;
		align-items: center;
		height: 132px;
		li {
			width: 110px;
			text-align: center;
			a {
				img {
					width: 60px;
					height: 60px;
				}
				p {
					padding-top: 10px;
				}
			}
		}
	}
}
</style>
