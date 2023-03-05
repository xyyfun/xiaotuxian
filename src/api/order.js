import request from '@/utils/request';

/**
 * @Date         : 2023-03-01 12:29:48
 * @description  : 获取我的订单数据列表
 * @param         {*} page:当前页
 * @param         {*} pageSize:一页多少数量
 * @return        {*}
 */
export const getOrderList = (page = 1, pageSize = 5) => {
	return request({
		url: `/member/order?page=${page}&pageSize=${pageSize}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-03-05 14:49:11
 * @description  : 获取订单详细数据
 * @param         {*} id: 订单id
 * @return        {*}
 */
export const getOrderDetailed = id => {
	return request({
		url: `/member/order/${id}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-03-02 11:04:56
 * @description  : 取消订单
 * @param         {*} id:订单id
 * @param         {*} cancelReason:取消理由
 * @return        {*}
 */
export const cancelOrder = ({ id, cancelReason }) => {
	return request({
		url: `/member/order/${id}/cancel`,
		method: 'put',
		header: { 'Content-Type': 'application/json' },
		data: { cancelReason },
	});
};

export const removeOrder = orderId => {
	return request({
		url: '/member/order',
		method: 'delete',
		data: { ids: [orderId] },
	});
};

/**
 * @Date         : 2023-03-04 21:50:58
 * @description  : 下单结算生成订单
 * @return        {*}
 */
export const placeOrder = () => {
	return request({
		url: '/member/order/pre',
		method: 'get',
		header: { 'Content-Type': 'application/json' },
	});
};

/**
 * @Date         : 2023-03-04 21:50:04
 * @description  : 提交订单
 * @param         {*} data:
 * @return        {*}
 */
export const subOrder = (addressId, deliveryTimeType, payType, goods) => {
	return request({
		url: `/member/order`,
		method: 'post',
		header: { 'Content-Type': 'application/json' },
		data: { addressId, deliveryTimeType, payType, goods },
	});
};

/**
 * @Date         : 2023-03-05 17:13:39
 * @description  : 模拟支付
 * @param         {*} orderId: 订单id
 * @return        {*}
 */
export const pay = orderId => {
	return request({
		url: `/pay/mock?orderId=${orderId}`,
		method: 'get',
	});
};
