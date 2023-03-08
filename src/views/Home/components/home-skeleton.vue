<template>
	<div class="home-content">
		<ul>
			<li v-for="(item, index) in 4" :key="index">
				<XtxSkeleton width="306px" height="406px" :animated="true" />
			</li>
		</ul>
	</div>
</template>

<script>
import XtxSkeleton from '@/components/library/xtx-skeleton';
export default {
	name: 'HomeSkeleton',
	components: { XtxSkeleton },
};
</script>

<style lang="less" scoped>
.home-content {
	height: 426px;
	ul {
		display: flex;
		justify-content: space-between;
		height: 406px;
		li {
			width: 306px;
			height: 406px;
		}
	}
}
</style>
