import {isType} from "../utils";

export default function (tag, attrs, ...children) {
	// 为 attr 加一个 key 属性 并且 防止 报错


	let transformChild = []
	/* children 扁平化 */
	children.forEach(v => {
		// console.log(v)
		// if (v && v.attrs) {
		// 	v.attrs.key = 110
		// }
		// if (isType(v, 'Array')) {
		// 	// 设置 key
		// 	v = v.map((v, i) => {
		// 		v.attrs.key = i
		// 		return v
		// 	})
		// }
		transformChild = transformChild.concat(v)
	})
	attrs = attrs || {}
	let { key = null } = attrs
	return {
		tag,
		attrs,
		children: transformChild,
		key
	}
}