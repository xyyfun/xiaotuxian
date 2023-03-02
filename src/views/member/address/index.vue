<template>
	<div class="member-address">
		<div class="member-address-page">
			<!-- 头部 -->
			<AddressHeader :num="userAddress.length" @addAddress="isShowDialog = !isShowDialog" />
			<!-- 主体内容 -->
			<div v-if="userAddress.length">
				<AddressList
					v-for="item in userAddress"
					:key="item.id"
					:item="item"
					@editAddress="editAddress"
				/>
			</div>
			<div v-else class="xtx-center-none">
				<img src="../../../assets/images/none.png" alt="" />
				<p>当前还未添加收货地址</p>
			</div>
			<!-- 表单 -->
			<transition>
				<XtxDialog title="新建收货地址" v-show="isShowDialog">
					<template slot="body">
						<div class="form-item">
							<span class="label">姓名：</span
							><input type="text" v-model="params.receiver" placeholder="收货人姓名" />
						</div>
						<div class="form-item">
							<span class="label">手机号：</span
							><input type="text" v-model="params.contact" placeholder="输入手机号" />
						</div>
						<div class="form-item">
							<span class="label">地区：</span>
							<div class="xtx-city">
								<div class="curr-wrapper" @click="isShowCity = !isShowCity">
									<span class="selected" v-if="cityAddress">{{ cityAddress }}</span>
									<span class="ph" v-else>请选择所在地</span
									><i class="iconfont icon-angle-down"></i>
								</div>
								<XtxNationalAddress v-if="isShowCity" />
							</div>
						</div>
						<div class="form-item">
							<span class="label">详细地址：</span
							><input type="text" v-model="params.address" placeholder="完善详细地址" />
						</div>
						<div class="form-item">
							<span class="label">邮政编码：</span
							><input type="text" v-model="params.postalCode" placeholder="输入邮政编码" />
						</div>
						<div class="form-item">
							<span class="label">地址标签：</span>
							<input type="text" v-model="params.addressTags" placeholder="输入地址标签,逗号分隔" />
						</div>
					</template>
					<template slot="footer">
						<a href="javascript:;" @click="cancel" type="info" class="xtx-common-btn">取消</a>
						<a
							v-if="isEdit"
							href="javascript:;"
							type="primary"
							class="xtx-common-btn"
							@click="saveUserAddress"
							>提交</a
						>
						<a
							v-else
							href="javascript:;"
							type="primary"
							class="xtx-common-btn"
							@click="updateAddress"
							>保存</a
						>
					</template>
				</XtxDialog>
			</transition>
		</div>
	</div>
</template>

<script>
import AddressHeader from './components/address-header';
import AddressList from './components/address-list';
import XtxDialog from '@/components/library/xtx-dialog';
import XtxNationalAddress from '@/components/library/xtx-national-address';
import { mapState } from 'vuex';
export default {
	name: 'MemberAddress',
	data() {
		return {
			isShowDialog: false,
			isEdit: true, // 提交还是保存
			isShowCity: false, // 是否显示城市代码
			cityAddress: '', // 显示地址到页面上地址
			id: '', // 地址id
			params: {
				receiver: '', // 收件人
				contact: '', // 收件手机号
				provinceCode: '', // 省份代码
				cityCode: '', // 市代码
				countyCode: '', // 县代码
				address: '', // 详细地址
				postalCode: '', // 邮政编码
				addressTags: '', // 地址标签
				isDefault: 1, // 是否为默认地址 0 是 1 否
			},
		};
	},
	computed: {
		...mapState('user', ['userAddress']),
	},
	methods: {
		// 添加地址
		async saveUserAddress() {
			try {
				await this.$store.dispatch('user/addUserAddress', this.params);
				this.cancel();
				this.$message({
					type: 'success',
					message: '添加成功！',
				});
			} catch (error) {
				this.cancel();
				this.$message({
					type: 'error',
					message: '添加失败，请稍后再试！',
				});
			}
		},
		async updateAddress() {
			try {
				await this.$store.dispatch('user/updateUserAddress', { data: this.params, id: this.id });
				this.cancel();
				this.$message({
					type: 'success',
					message: '地址修改成功！',
				});
			} catch (error) {
				this.cancel();
				this.$message({
					type: 'error',
					message: '地址修改失败，请稍后再试！',
				});
			}
		},
		// 取消
		cancel() {
			this.cityAddress = '';
			this.params.receiver = '';
			this.params.contact = '';
			this.params.address = '';
			this.params.postalCode = '';
			this.params.addressTags = '';
			this.isShowDialog = false;
			this.isEdit = true;
		},
		// 编辑地址将数据展示到页面
		editAddress(data, num) {
			if (num === 0) {
				this.params.isDefault = num;
				this.params.receiver = data.receiver;
				this.params.contact = data.contact;
				this.params.provinceCode = data.provinceCode;
				this.params.cityCode = data.cityCode;
				this.params.countyCode = data.countyCode;
				this.params.address = data.address;
				this.params.postalCode = data.postalCode;
				this.params.addressTags = data.addressTags;
				this.id = data.id;
				this.cityAddress = data.fullLocation;
				this.updateAddress();
				return;
			}
			this.params.receiver = data.receiver;
			this.params.contact = data.contact;
			this.params.provinceCode = data.provinceCode;
			this.params.cityCode = data.cityCode;
			this.params.countyCode = data.countyCode;
			this.params.address = data.address;
			this.params.postalCode = data.postalCode;
			this.params.addressTags = data.addressTags;
			this.params.isDefault = data.isDefault;
			this.cityAddress = data.fullLocation;
			this.isEdit = false;
			this.id = data.id;
			this.isShowDialog = true;
		},
	},
	components: { AddressHeader, AddressList, XtxDialog, XtxNationalAddress },
	created() {
		// 判断地址是否存储至vuex
		if (!this.$store.state.user.userAddress.length) {
			this.$store.dispatch('user/getUserAddress');
		}
	},
	mounted() {
		// 城市代码
		this.$bus.$on('city', (address, province, city, county) => {
			this.cityAddress = address;
			this.params.provinceCode = province;
			this.params.cityCode = city;
			this.params.countyCode = county;
			this.isShowCity = false;
		});
	},
	beforeDestroy() {
		this.$bus.$off('city');
	},
};
</script>

<style lang="less" scoped>
.member-address {
	flex: 1;
	background: #fff;
	padding-bottom: 25px;
	min-height: 100%;
	.xtx-center-none {
		padding: 150px 0;
		text-align: center;
		img {
			width: 200px;
		}
		p {
			font-size: 20px;
			padding: 20px;
			color: #ccc;
		}
	}
}
</style>
