import diffNode from './diff-node'
import diffChild from './diff-children'
import diffComponent from './diff-component'

// diff 入口函数 第一个参数为 原始 dom
const diff = function (dom, vnode, container) {
	const result = diffNode(dom, vnode)
	// 如果有容器 加入到 容器汇总
	if (result && container) {
		container.appendChild(result)
	}
}

export {
	diff as default,
	diffNode,
	diffChild,
	diffComponent
}