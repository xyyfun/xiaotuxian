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
 * @Date         : 2023-03-02 11:04:56
 * @description  : 取消订单
 * @param         {*} id:订单id
 * @param         {*} cancelReason:取消理由
 * @return        {*}
 */
export const removeOrder = (id, cancelReason) => {
	return request({
		url: `/member/order/${id}/cancel`,
		method: 'put',
		header: { 'Content-Type': 'application/json' },
		data: { cancelReason },
	});
};

/**
 * @Date         : 2023-03-01 12:11:18
 * @description  : 获取我的收藏列表
 * @param         {*} page:第几页
 * @param         {*} pageSize:一页多少条数据
 * @param         {*} collectType:收藏类型，1为商品，2为专题，3为品牌
 * @return        {*}
 */
export const getMyCollection = (page = 1, pageSize = 4, collectType = 1) => {
	return request({
		url: `/member/collect?page=${page}&pageSize=${pageSize}&collectType=${collectType}`,
		method: 'get',
		header: { 'Content-Type': 'application/json' },
	});
};

/**
 * @Date         : 2023-03-02 09:16:25
 * @description  : 获取足迹数据
 * @param         {*} data:地址信息
 * @param         {*} page:当前页
 * @param         {*} pageSize:一页机几条数据
 * @return        {*}
 */
export const getMyFootprint = (data, page = 1, pageSize = 4) => {
	return request({
		url: `/member/browseHistory?page=${page}&pageSize=${pageSize}`,
		method: 'get',
		header: { 'Content-Type': 'application/json' },
		data,
	});
};

/**
 * @Date         : 2023-03-01 14:51:59
 * @description  : 添加用户地址
 * @param		   {Object} : 数据
 * @return        {*}
 */
export const addUserAddress = data => {
	return request({
		url: `/member/address`,
		method: 'post',
		header: { 'Content-Type': 'application/json' },
		data,
	});
};

/**
 * @Date         : 2023-03-01 15:55:14
 * @description  : 获取用户收件地址
 * @return        {*}
 */
export const getUserAddress = () => {
	return request({
		url: '/member/address',
		method: 'get',
		header: { 'Content-Type': 'application/json' },
	});
};

/**
 * @Date         : 2023-03-01 16:05:32
 * @description  : 删除用户收件地址
 * @param         {*} id:地址id
 * @return        {*}
 */
export const removeUserAddress = id => {
	return request({
		url: `/member/address/${id}`,
		method: 'delete',
		header: { 'Content-Type': 'application/json' },
	});
};

/**
 * @Date         : 2023-03-01 19:33:19
 * @description  : 编辑更新地址
 * @param         {*} data:
 * @param         {*} id:
 * @return        {*}
 */
export const updateUserAddress = (data, id) => {
	return request({
		url: `/member/address/${id}`,
		method: 'put',
		data,
	});
};
