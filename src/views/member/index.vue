<template>
	<div class="app-body">
		<div class="container">
			<AppMemberAside />
			<article class="article">
				<transition :appear="true" name="a">
					<router-view></router-view>
				</transition>
			</article>
			<XtxCancelWindowVue v-if="isShowWindow" />
		</div>
	</div>
</template>

<script>
import AppMemberAside from '@/components/app-member-aside';
import XtxCancelWindowVue from '@/components/library/xtx-cancel-window';
import { removeOrder } from '@/api/member';
export default {
	name: 'Member',
	data() {
		return {
			isShowWindow: false,
			id: '', // 订单id
		};
	},
	components: { AppMemberAside, XtxCancelWindowVue },
	mounted() {
		this.$bus.$on('cancelOrder', id => {
			this.isShowWindow = true;
			this.id = id;
		});
		this.$bus.$on('send', cause => {
			this.isShowWindow = false;
			console.log(this.id, cause);
			removeOrder(this.id, cause).then(resolv => {
				console.log(resolv);
			});
		});
	},
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
