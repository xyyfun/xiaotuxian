<template>
	<div class="box-body">
		<div class="checkout-address">
			<div class="text">
				<div class="none" v-if="!isDefault.id">您需要先添加收货地址才可提交订单。</div>
				<template v-else>
					<ul>
						<li><span>收货人：</span>{{ isDefault.receiver }}</li>
						<li>
							<span>联系方式：</span
							>{{ isDefault.contact.replace(/([0-9]{3})([0-9]{4})([0-9]{4})/, '$1****$3') }}
						</li>
						<li><span>收货地址：</span>{{ isDefault.fullLocation + isDefault.address }}</li>
					</ul>
					<a href="javascript:;">修改地址</a>
				</template>
			</div>
			<div class="action">
				<button class="xtx-button ellipsis middle default btn" @click="isShow = !isShow">
					切换地址</button
				><button class="xtx-button ellipsis middle default btn">添加地址</button>
			</div>
		</div>
		<transition>
			<XtxDialog :title="title" v-show="isShow">
				<template slot="body">
					<div
						class="default item"
						:class="item.id == id ? 'selected' : ''"
						@click="changAddress(item.id)"
						v-for="item in userAddresses"
						:key="item.id">
						<dl>
							<dt>收货人：</dt>
							<dd>{{ item.receiver }}</dd>
						</dl>
						<dl>
							<dt>联系方式：</dt>
							<dd>{{ item.contact.replace(/([0-9]{3})([0-9]{4})([0-9]{4})/, '$1****$3') }}</dd>
						</dl>
						<dl>
							<dt>收货地址：</dt>
							<dd>{{ item.fullLocation + item.address }}</dd>
						</dl>
					</div>
				</template>
				<template slot="footer">
					<a href="javascript:;" type="info" class="xtx-common-btn" @click="isShow = !isShow"
						>取消</a
					><a href="javascript:;" type="primary" class="xtx-common-btn" @click="confirm">确认</a>
				</template>
			</XtxDialog>
		</transition>
	</div>
</template>

<script>
import XtxDialog from '@/components/library/xtx-dialog';
export default {
	name: 'CheckoutAddress',
	props: ['userAddresses'],
	data() {
		return {
			isDefault: {},
			title: '切换地址',
			id: '',
			isShow: false,
		};
	},
	components: { XtxDialog },
	watch: {
		userAddresses(newVal) {
			newVal.forEach(e => {
				if (!e.isDefault) {
					this.isDefault = e;
				}
			});
		},
	},
	methods: {
		changAddress(id) {
			this.id = id;
		},
		confirm() {
			if (this.id) {
				this.userAddresses.forEach(e => {
					if (e.id === this.id) {
						this.isDefault = e;
					}
				});
				this.$emit('changAddress', this.id);
				this.isShow = false;
			} else {
				this.$message({
					message: '请选择地址或取消选择！',
					type: 'warning',
				});
			}
		},
	},
	beforeDestroy() {
		this.$off('changAddress');
	},
};
</script>

<style lang="less" scoped>
.box-body {
	padding: 20px 0;
	.checkout-address {
		border: 1px solid #f5f5f5;
		display: flex;
		align-items: center;
		.text {
			flex: 1;
			min-height: 90px;
			display: flex;
			align-items: center;
			.none {
				line-height: 90px;
				color: #999;
				text-align: center;
				width: 100%;
			}
			> ul {
				flex: 1;
				padding: 20px;
				li {
					line-height: 30px;
					word-break: break-all;
					span {
						color: #999;
						margin-right: 5px;
					}
				}
			}
			> a {
				color: #27ba9b;
				width: 160px;
				text-align: center;
				height: 90px;
				line-height: 90px;
				border-right: 1px solid #f5f5f5;
			}
		}
		.action {
			width: 420px;
			text-align: center;
			.xtx-button {
				appearance: none;
				border: none;
				outline: none;
				background: #fff;
				text-align: center;
				border: 1px solid transparent;
				border-radius: 4px;
				cursor: pointer;
			}
			.btn {
				width: 140px;
				height: 46px;
				line-height: 44px;
				font-size: 14px;
				border-color: #e4e4e4;
				color: #666;
				&:first-child {
					margin-right: 10px;
				}
			}
		}
	}
}
</style>
