import request from '@/utils/request';

/**
 * @Date         : 2023-02-28 11:06:41
 * @description  : 获取购物车列表
 * @return        {Promise}
 */
export const getCartList = () => request({ url: '/member/cart', method: 'get' });

/**
 * @Date         : 2023-02-28 11:06:09
 * @description  : 添加购物车
 * @param         {*} skuId:skuId 非商品id
 * @param         {*} count:数量
 * @return        {Promise}
 */
export const addCart = (skuId, count) => {
	return request({
		url: '/member/cart',
		method: 'post',
		data: {
			skuId,
			count,
		},
		header: { 'Content-Type': 'application/json' },
	});
};

/**
 * @Date         : 2023-02-28 11:10:29
 * @description  : 全选or非全选
 * @param         {*} selected:是否选中
 * @param         {*} ids:
 * @return        {*}
 */
export const changeCartSelected = (selected, ids) => {
	return request({
		url: `/member/cart/selected`,
		method: 'put',
		header: { 'Content-Type': 'application/json' },
		data: { selected, ids },
	});
};

/**
 * @Date         : 2023-02-28 15:21:33
 * @description  : 修改商品数量或是否单选商品
 * @param         {*} selected:是否选中商品
 * @param         {*} count:修改商品的数量
 * @param         {*} skuId:skuId
 * @return        {*}
 */
export const modifyGoodsNum = (selected, count, skuId) => {
	return request({
		url: `/member/cart/${skuId}`,
		method: 'put',
		header: { 'Content-Type': 'application/json' },
		data: { selected, count },
	});
};

/**
 * @Date         : 2023-02-28 16:19:13
 * @description  : 删除商品或删除失效商品
 * @param         {Array} ids:skuId集合
 * @param         {Boolean} clearAll:是否删除商品
 * @param         {Boolean} clearInvalid:是否删除失效商品
 * @return        {*}
 */
export const removeGoods = ids => {
	return request({
		url: '/member/cart',
		method: 'DELETE',
		header: { 'Content-Type': 'application/json' },
		data: { ids },
	});
};
