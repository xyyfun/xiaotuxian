<template>
	<transition :appear="true">
		<div class="xtx-dialog" v-show="isShowPanel">
			<div class="new-box">
				<h4 class="title">新建收货地址</h4>
				<a href="javascript:;" @click="cancel" class="close"><i class="iconfont icon-close"></i></a>
				<div class="body">
					<div class="form-item">
						<span class="label">姓名：</span
						><input type="text" v-model="receiver" placeholder="收货人姓名" />
					</div>
					<div class="form-item">
						<span class="label">手机号：</span
						><input type="text" v-model="contact" placeholder="输入手机号" />
					</div>
					<div class="form-item">
						<span class="label">地区：</span>
						<div class="xtx-city">
							<div class="curr-wrapper" @click="isShowCity = !isShowCity">
								<span class="selected" v-if="cityAddress">{{ cityAddress }}</span>
								<span class="ph" v-else>请选择所在地</span>
								<i class="iconfont icon-angle-down"></i>
							</div>
							<XtxNationalAddress v-if="isShowCity" />
						</div>
					</div>
					<div class="form-item">
						<span class="label">详细地址：</span
						><input type="text" v-model="address" placeholder="完善详细地址" />
					</div>
					<div class="form-item">
						<span class="label">邮政编码：</span
						><input type="text" v-model="postalCode" placeholder="输入邮政编码" />
					</div>
					<div class="form-item">
						<span class="label">地址标签：</span
						><input type="text" v-model="addressTags" placeholder="输入地址标签,逗号分隔" />
					</div>
				</div>
				<div class="footer">
					<a href="javascript:;" type="info" class="xtx-common-btn" @click="cancel">取消</a>
					<a
						v-if="isEdit"
						href="javascript:;"
						type="primary"
						class="xtx-common-btn"
						@click="saveUserAddress"
						>提交</a
					>
					<a v-else href="javascript:;" type="primary" class="xtx-common-btn" @click="updateAddress"
						>保存</a
					>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import XtxNationalAddress from '@/components/library/xtx-national-address';
export default {
	name: 'AddressDialog',
	data() {
		return {
			isEdit: true, // 提交还是保存
			isShowPanel: false, // 是否显示
			isShowCity: false, // 是否显示城市代码
			receiver: '', // 收件人
			contact: '', // 收件手机号
			cityAddress: '', // 显示地址到页面上地址
			provinceCode: '', // 省份代码
			cityCode: '', // 市代码
			countyCode: '', // 县代码
			address: '', // 详细地址
			postalCode: '', // 邮政编码
			addressTags: '', // 地址标签
			isDefault: 1, // 是否为默认地址 0 是 1 否
			id: '', // 地址id
		};
	},
	components: { XtxNationalAddress },
	methods: {
		// 添加地址
		async saveUserAddress() {
			let data = {
				'receiver': this.receiver,
				'contact': this.contact,
				'provinceCode': this.provinceCode,
				'cityCode': this.cityCode,
				'countyCode': this.countyCode,
				'address': this.address,
				'postalCode': this.postalCode,
				'addressTags': this.addressTags,
				'isDefault': this.isDefault,
			};
			try {
				await this.$store.dispatch('user/addUserAddress', data);
				this.isShowPanel = false;
				this.$message({
					type: 'success',
					message: '添加成功！',
				});
			} catch (error) {
				this.isShowPanel = false;
				this.$message({
					type: 'error',
					message: '添加失败，请稍后再试！',
				});
			}
		},
		// 编辑更新地址
		async updateAddress() {
			let data = {
				'receiver': this.receiver,
				'contact': this.contact,
				'provinceCode': this.provinceCode,
				'cityCode': this.cityCode,
				'countyCode': this.countyCode,
				'address': this.address,
				'postalCode': this.postalCode,
				'addressTags': this.addressTags,
				'isDefault': this.isDefault,
			};
			try {
				await this.$store.dispatch('user/updateUserAddress', { data, id: this.id });
				this.isShowPanel = false;
				this.$message({
					type: 'success',
					message: '地址修改成功！',
				});
			} catch (error) {
				this.isShowPanel = false;
				this.$message({
					type: 'error',
					message: '地址修改失败，请稍后再试！',
				});
			}
		},
		// 取消
		cancel() {
			this.isShowPanel = false;
			this.isEdit = true;
			this.receiver = '';
			this.contact = '';
			this.cityAddress = '';
			this.address = '';
			this.postalCode = '';
			this.addressTags = '';
		},
	},
	mounted() {
		// 城市代码
		this.$bus.$on('city', (address, province, city, county) => {
			this.cityAddress = address;
			this.provinceCode = province;
			this.cityCode = city;
			this.countyCode = county;
			this.isShowCity = false;
		});
		// 编辑地址数据
		this.$bus.$on('editAddress', (data, isDefault) => {
			// 只设置默认地址 直接调用接口参数
			if (isDefault === 0) {
				this.isDefault = isDefault;
				this.receiver = data.receiver;
				this.contact = data.contact;
				this.cityAddress = data.fullLocation;
				this.provinceCode = data.provinceCode;
				this.cityCode = data.cityCode;
				this.countyCode = data.countyCode;
				this.address = data.address;
				this.postalCode = data.postalCode;
				this.addressTags = data.addressTags;
				this.id = data.id;
				this.updateAddress();
				return;
			}
			this.receiver = data.receiver;
			this.contact = data.contact;
			this.cityAddress = data.fullLocation;
			this.provinceCode = data.provinceCode;
			this.cityCode = data.cityCode;
			this.countyCode = data.countyCode;
			this.address = data.address;
			this.postalCode = data.postalCode;
			this.addressTags = data.addressTags;
			this.isDefault = data.isDefault;
			this.id = data.id;
			this.isShowPanel = true;
			this.isEdit = false;
		});
		// 添加地址 清空数据 显示表单
		this.$bus.$on('addAddress', () => {
			this.isShowPanel = true;
			this.receiver = '';
			this.contact = '';
			this.cityAddress = '';
			this.address = '';
			this.postalCode = '';
			this.addressTags = '';
		});
	},
	beforeDestroy() {
		this.$bus.$off(['addAddress', 'city', 'editAddress']);
	},
};
</script>

<style lang="less" scoped>
.xtx-dialog {
	width: 100%;
	height: 110%;
	position: fixed;
	left: 0;
	top: 0;
	background: rgba(0, 0, 0, 0.4);
	z-index: 9999;
	// opacity: 0;
	> .new-box {
		width: 800px;
		background: #fff;
		position: absolute;
		left: 50%;
		top: 47%;
		transform: translate(-50%, -50%);
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		> .title {
			font-weight: 400;
			font-size: 18px;
			line-height: 70px;
			padding-left: 20px;
			height: 70px;
			border-bottom: 1px solid #f5f5f5;
			.iconfont {
				font-family: 'iconfont' !important;
				font-size: 16px;
				font-style: normal;
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
			}
		}
		> .close {
			position: absolute;
			top: 15px;
			right: 15px;
			width: 40px;
			height: 40px;
			text-align: center;
			line-height: 40px;
			color: #ccc;
		}
		> .body {
			overflow: visible;
			padding: 20px 75px;
			max-height: 540px;
			.form-item {
				display: flex;
				line-height: 50px;
				padding-bottom: 20px;
				.label {
					width: 150px;
					text-align: right;
					padding-right: 10px;
					color: #999;
				}
				input {
					width: 350px;
					height: 50px;
					border: 1px solid #e4e4e4;
					padding: 0 10px;
				}
				.xtx-city {
					width: 350px;
					height: 50px;
					min-width: 150px;
					display: inline-block;
					position: relative;
					vertical-align: middle;
					.curr-wrapper {
						width: 100%;
						line-height: 48px;
						padding-left: 10px;
						height: 100%;
						border: 1px solid #e4e4e4;
						padding: 0 5px;
						display: flex;
						justify-content: space-between;
						position: relative;
						z-index: 10;
						overflow: hidden;
						.ph {
							color: #ccc;
						}
						.selected {
							color: #333;
						}
						.iconfont {
							transition: all 0.5s;
							color: #ccc;
						}
					}
				}
			}
		}
		> .footer {
			padding: 10px 0 30px;
			text-align: center;
			> a {
				margin: 0 10px;
			}
			.xtx-common-btn[type='primary'] {
				background: #27ba9b;
			}
			.xtx-common-btn[type='info'] {
				background: #ccc;
			}
			.xtx-common-btn {
				width: 180px;
				height: 50px;
				line-height: 48px;
				font-size: 16px;
				color: #fff;
				text-align: center;
				border-radius: 4px;
				display: inline-block;
			}
		}
	}
}
/* 进入的起点,离开的终点 */
.v-enter,
.v-leave-to {
	transform: translateY(-20px);
	opacity: 0;
}
/* 进入进行时,离开进行时 */
.v-enter-active {
	transition: all 0.4s;
}

/* 进入的终点,离开的起点 */
.v-enter-to,
.v-leave {
	transform: none;
	opacity: 1;
}
</style>
