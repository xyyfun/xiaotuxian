import request from '@/utils/request';

/**
 * @Date         : 2023-03-09 10:24:27
 * @description  : 一级分类
 * @param         {*} id: 分类id
 * @return        {*}
 */
export const category = id => {
	return request({
		url: `/category?id=${id}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-03-09 19:25:03
 * @description  : 筛选
 * @param         {*} id:
 * @return        {*}
 */
export const getCategoryFilter = id => {
	return request({
		url: `/category/sub/filter?id=${id}`,
		method: 'get',
	});
};
