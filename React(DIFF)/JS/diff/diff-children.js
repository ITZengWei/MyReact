import diffNode from './diff-node'

/*
* TODO
* */

export default function (dom, vChildren) {
	const domChildren = dom.childNodes
	const children = []
	const keyed = {}
	// 将有 key 的节点(用对象保存)和没有key 的节点(用数组保存)分开
	if (domChildren.length > 0) {
		;[...domChildren].forEach(child => {
			// console.log(child)
			if (child.key) {
				keyed[child.key] = child
			} else {
				children.push(child)
			}
		})
	}


	if (vChildren && vChildren.length) {
		let min = 0
		let childrenLen = vChildren.length
		;[...vChildren].forEach((vChild, i) => {
			// 获取 虚拟DOM中所有的KEY值的节点
			const key = vChild.key
			let child
			if (key) {
				// 如果有key，找对应的key值的节点
				if (keyed[key]) {
					child = keyed[key]
					keyed[key] = undefined
				}
			} else if (childrenLen > min) {
				// 如果没有 key， 则优先查找类型相同的节点
				for (let j = min; j < childrenLen; j ++) {
					let c = children[j]
					if (c) {
						child = c
						children[j] = undefined
						if (j === childrenLen - 1) childrenLen--
						if (j === min) min++
						break
					}
				}
			}

			// 对比渲染子节点
			child = diffNode(child, vChild)
			// 更新DOM
			const f = domChildren[i]

			if (child && child !== dom && child !== f) {
				// 如果更新前对应位置为空，说明此节点是新增的
				if (!f) {
					dom.appendChild(child)
					// 如果更新后的节点和更新前的节点对应下一个节点位置一样，说明更新了这个节点
				} else if (child === f.nextSibling) {
					removeNode(f)
					console.log(f, 'diffChildren')
				} else {
					console.log(child, 'diffChildren', f, child === f)
					// 注意insertBefore 第一个参数是要插入的节点，第二个是位置
					dom.insertBefore(child, f)
				}
			}
		})
	}
}

export const removeNode = function (dom) {
	if (dom && dom.parentNode) {
		dom.parentNode.removeChild(dom)
	}
}