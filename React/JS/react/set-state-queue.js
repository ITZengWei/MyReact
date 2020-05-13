/*
* 1、异步更新state，短时间内把多个 setState 合并一个 (队列：先进先出)
* 2、一段时间之后，清空队列，渲染组件
* */

// 状态队列
import {isType} from "../utils";
import {renderComponent} from "../react-dom";

/* 状态队列 */
const StateQueue = []

/* 改变组件队列 */
const CompQueue = []

/* 完成时的队列 */
const changedQueue = []

const delay = function (fn) {
	fn()
}

// 入队
export function handleEnqueue(payload) {

	/* 一定时间内操作 */
	if (StateQueue.length === 0) {

		setTimeout(() => {
			delay(handleDeQueue)
		}, 66)
	}

	let { changeState, changedState, changeComponent } = payload

	StateQueue.push({ changeState, changeComponent })

	isType(changedState, 'Function') && changedQueue.push({ changedState, changeComponent })

	// 更改的组件如果没有这个 就加入
	if (!CompQueue.some(v => v === changeComponent)) {
		CompQueue.push(changeComponent)
	}

}

// 出队
export function handleDeQueue() {
	let item, component, changed
	/* 合并 state */
	while (item = StateQueue.shift()) {
		let { changeState, changeComponent } = item

		if (isType(changeState, 'Function')) {
			changeComponent.prevState = changeComponent.state
			Object.assign(changeComponent.state, changeState(changeComponent.state, changeComponent.state.props))
		} else if (isType(changeState, 'Object')) {
			Object.assign(changeComponent.state, changeState)
		}
	}

	/* 按顺序改变 */
	while (component = CompQueue.shift()) {
		renderComponent(component)
	}

	/* 更改时候的回调 */
	while (changed = changedQueue.shift()) {
		let { changedState, changeComponent } = changed
		changedState(changeComponent.state, changeComponent.state.props)
	}

}