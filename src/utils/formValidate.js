/**
 * @Date         : 2023-02-23 20:12:24
 * @description  : 11位中国大陆手机号验证
 * @param         {String} val:
 * @return        {Boolean}
 */
export const phoneValidate = val => {
	const rge = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
	return rge.test(val);
};

/**
 * @Date         : 2023-02-23 20:14:40
 * @description  : 六位数以上至少包含1个大小写字母，1个数字，1个特殊字符
 * @param         {String} val:
 * @return        {Boolean}
 */
export const passwordValidate = val => {
	const rge = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
	return rge.test(val);
};

/**
 * @Date         : 2023-02-23 20:20:52
 * @description  : 确认密码
 * @param         {String} val:
 * @param         {String} password:
 * @return        {Boolean}
 */
export const confirmValidate = (val, password) => {
	const rge = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
	if (val === password && rge.test(val)) return true;
	return false;
};

/**
 * @Date         : 2023-02-24 23:28:31
 * @description  : 六位数验证码验证
 * @param         {Number} val:
 * @return        {Boolean}
 */
export const codeValidate = val => {
	const rge = /^\d{6}$/;
	return rge.test(val);
};
