<template>
	<div class="app-body">
		<div class="container">
			<AppMemberAside />
			<article class="article">
				<transition :appear="true" name="a">
					<router-view></router-view>
				</transition>
			</article>
		</div>
	</div>
</template>

<script>
import AppMemberAside from '@/components/app-member-aside';
export default {
	name: 'Member',
	components: { AppMemberAside },
};
</script>

<style lang="less" scoped>
.app-body {
	min-height: 600px;
	background-color: #f5f5f5;
	.container {
		display: flex;
		padding-top: 20px;
		.article {
			width: 1000px;
		}
	}
}
/* 进入的起点,离开的终点 */
.a-enter,
.a-leave-to {
	transform: translateX(20px);
	opacity: 0;
}
/* 进入进行时,离开进行时 */
.a-enter-active {
	transition: all 0.5s;
}

/* 进入的终点,离开的起点 */
.a-enter-to,
.a-leave {
	transform: none;
	opacity: 1;
}
</style>
