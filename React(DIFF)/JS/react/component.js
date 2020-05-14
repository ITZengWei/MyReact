import {isType} from "../utils";
import { renderComponent } from '../react-dom'
import { handleEnqueue } from './set-state-queue'

export default class Component {
	constructor(props) {
		this.props = props || {}
		this.state = {}
	}

	// 具有 render 方法
	render() {

	}

	// 具有 setState 方法
	setState() {
		let [changeState, changedState] = arguments

		handleEnqueue({ changeState, changedState, changeComponent: this })




		// // 第一个参数是方法 执行得到结果再覆盖到state
		// if (isType(changeState, 'Function')) {
		// 	Object.assign(this.state, changeState(this.state, this.props))
		//
		// // 第一个参数是对象 直接覆盖到state
		// } else if (isType(changeState, 'Object')) {
		// 	Object.assign(this.state, changeState)
		// }
		//
		//
		// /* 渲染页面 */
		// renderComponent(this)
		//
		// // 如果传了 改变之后的回调我们就执行
		// changedState && changedState(this.state, this.props)
	}
}