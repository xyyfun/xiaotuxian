import request from '@/utils/request';
import { method } from 'lodash';

/**
 * @Date         : 2023-02-24 22:51:31
 * @description  : 获取验证码
 * @param         {Number} mobile:
 * @return        {Boolean}
 */
export const getCode = mobile => {
	return request({
		url: `/register/code?mobile=${mobile}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-02-25 13:05:15
 * @description  : 判断用户名唯一性
 * @param         {String} account:
 * @return        {Boolean}
 */
export const isUnique = account => {
	return request({
		url: `/register/check?account=${account}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-02-25 13:15:12
 * @description  : 注册用户
 * @param         {Object} data:
 * @return        {Promise}
 */
export const register = data => {
	return request({
		url: '/register',
		method: 'post',
		data,
		header: { 'Content-Type': 'application/json' },
	});
};
