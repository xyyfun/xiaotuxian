<template>
	<div class="box-body">
		<table class="goods">
			<thead>
				<tr>
					<th width="520">商品信息</th>
					<th width="170">单价</th>
					<th width="170">数量</th>
					<th width="170">小计</th>
					<th width="170">实付</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) in goods" :key="index">
					<td>
						<router-link :to="`/goods/${item.id}`" class="info"
							><img :src="item.picture" alt="" />
							<div class="right">
								<p>{{ item.name }}</p>
								<p>{{ item.attrsText }}</p>
							</div></router-link
						>
					</td>
					<td>¥{{ item.price }}</td>
					<td>{{ item.count }}</td>
					<td>¥{{ item.payPrice }}</td>
					<td>¥{{ item.totalPayPrice }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: 'CheckoutGoods',
	props: ['goods'],
};
</script>

<style lang="less" scoped>
.box-body {
	padding: 20px 0;
	.goods {
		width: 100%;
		border-collapse: collapse;
		border-spacing: 0;
		tr td:first-child,
		tr th:first-child {
			border-left: 1px solid #f5f5f5;
		}
		tr td:last-child,
		tr th:last-child {
			border-right: 1px solid #f5f5f5;
		}

		tr td,
		tr th {
			text-align: center;
			padding: 20px;
			border-bottom: 1px solid #f5f5f5;
		}
		tr th {
			background: #f5f5f5;
			font-weight: 400;
		}
		.info {
			display: flex;
			text-align: left;
			img {
				width: 70px;
				height: 70px;
				margin-right: 20px;
			}
			.right {
				line-height: 24px;
				p:last-child {
					color: #999;
				}
			}
		}
	}
}
</style>
