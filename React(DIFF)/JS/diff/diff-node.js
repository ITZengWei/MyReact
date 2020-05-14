/*
* 作用：将虚拟DOM和原始DOM进行对比。最终只改变真实变化的DOM
* */

import {isType, isTypes} from "../utils"
import diffComponent from './diff-component'
import diffChildren from './diff-children'
import diffAttribute from './diff-attributes'



let mount = false

const diffNode = function (dom, vnode) {
	// 输出结果
	let out = dom


	// 判断虚拟节点为空 我们直接返回
	if (isTypes(vnode, ['Null', 'Undefined', 'Boolean'])) return

	// 如果你是数组再次遍历
	// if (isType(vnode, 'Array')) {
	// 	/* 如果是一个数组怎么办 TODO */
	//
	//
	// 	/* 使用 Fragment 文档片段包裹起来 */
	// 	const f = document.createDocumentFragment()
	// 	// let domChildren = dom ? dom.childNodes : []
	// 	out = out || f
	// 	// diffChildren(out, vnode)
	//
	// 	return out
	// }

	// 如果是字符串类型 生成文本节点 如果是 number 强制转换为 string 类型
	if (isType(vnode, 'Number')) vnode = String(vnode)

	if (isType(vnode, 'String')) {
		/*
		* nodeType: 1 ==> 元素节点 2 ==> 属性节点 3 ===> 文本节点
		* */
		// 刚好原始DOM 也是 文本节点 我们只需要替换 文本内容就好了
		if (dom) {
			if (dom.nodeType === 3 && dom.textContent !== vnode) {
				dom.textContent = vnode
			}

		} else {
			// 生成文本节点 替换 它
			out = document.createTextNode(vnode)

			// 如果不是 顶级 DOM 元素 我们就 替换
			if (dom && dom.parentNode) {
				dom.parentNode.replaceChild(out, dom)
			}
		}
		return out
	}

	/* 剩下的就是真实 DOM 了 */

	let { tag, attrs, children } = vnode

	// 如果是组件 生成组件
	if (isType(tag, 'Function')) {

		// 对比 组件
		return diffComponent(dom, vnode)
	}

	if (!dom) {
		out = document.createElement(tag)
	}

	/* 去 diff 属性 */
	diffAttribute(out, attrs)

	/* 如果有 children 我们还需要对比一下  */
	if (children && children.length || out.childNodes.length) {
		diffChildren(out, children)
	}

	return out
}

export default diffNode