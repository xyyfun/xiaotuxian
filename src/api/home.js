import request from '@/utils/request';

/**
 * @Date         : 2023-02-22 19:08:37
 * @description  : 获取新鲜好物数据
 * @param        {Number} :限制数量 默认4
 * @return        Promise
 */
export const getNew = () => {
	return request({
		url: '/home/new',
		method: 'get',
	});
};

/**
 * @Date         : 2023-02-22 19:09:55
 * @description  : 获取人气推荐数据
 * @return        Promise
 */
export const getHot = () => request({ url: '/home/hot', method: 'get' });

/**
 * @Date         : 2023-02-22 19:19:46
 * @description  : 获取热门品牌数据
 * @param        {Number} :限制数量 默认4
 * @return        Promise
 */
export const getBrand = () => request({ url: '/home/brand', method: 'get' });

/**
 * @Date         : 2023-02-22 19:30:37
 * @description  : 获取最新专题数据
 * @param        {Number} :限制数量 默认3
 * @return        Promise
 */
export const getSpecial = () => request({ url: '/home/special', method: 'get' });

/**
 * @Date         : 2023-02-22 19:45:48
 * @description  : 获取产品数据
 * @return        Promise
 */
export const getGoods = () => request({ url: '/home/goods', method: 'get' });

/**
 * @Date         : 2023-02-22 20:10:01
 * @description  : 获取广告数据
 * @return        Promise
 */
export const getBanner = () => request({ url: '/home/banner', method: 'get' });

/**
 * @Date         : 2023-02-22 20:15:18
 * @description  : 获取全部分类数据
 * @return        Promise
 */
export const getCategory = () => request({ url: '/home/category/head', method: 'get' });
