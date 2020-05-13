import { isType } from "../utils";
/*
	做属性分类判断
	1、属性为 class
	2、属性为 style
	3、属性为 event(onXXX)
*/



export default function (dom, key, value) {
	// if (key === 'className') {
	// 	key = 'class'
	// }

	if (key === 'style') {
		// <div style={{ color: 'red', fontSize: '14px' }}></div>
		if (isType(value) === 'Object') {
		// 如果是对象形似我们遍历设置样式
			for (let key in value) {
				dom.style[key] = value
			}

		// 如果是普通的 我们直接设置行类样式
		} else {
			dom.style.cssText = value
		}
	// 如果是事件
	} else if (/^on\w+/g.test(key)) {
		key = key.toLowerCase()
		// 只需要添加事件 onClick ==> onclick 我们绑定时间 // TODO
		dom[key] = value || ''

	// 其他的我们直接赋值给dom 就行
	} else {
		// 其他的我们手动设置
		dom[key] = value
	}
}