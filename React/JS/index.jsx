import React, { Component } from './react'
import { render } from './react-dom'
/*
* 1、解析普通JSX
* 2、解析组件
* 3、生命周期实现
* 4、渲染diff实现
* 5、子组件更新实现
* 6、异步setState实现
* */

// const ele =  (
// 	<div className="ele-wra" title="这是JSX基础">
// 		<h3 title="title">这是 普通的JSX</h3>
// 		<div className="calcWra">
// 			<button className="reduce" onClick={ (e) => { console.log(e) } }>-</button>
// 			<span>{ 100 }</span>
// 			<button className="add" onClick={ (e) => { console.log(e) } }>+</button>
// 		</div>
// 	</div>
// )
// console.log(ele, 'JSX语法')

//
// const ele = (
// 	<div className="wra" title="wra">
// 		<p onClick={ (e) => { console.log(e) } }>这是 示例</p>
// 		<ul>
// 			{
// 				[1, 2, 3, 4].map(v => (<li>{ v }</li>))
// 			}
// 		</ul>
// 	</div>
//
// )
// console.log(ele, 'JSX语法')
// console.log(JSON.stringify(ele), 'JSX语法')
// /* 解析普通JSX */
// render(ele, document.querySelector('#root'))

// 注意这里需要大驼峰的形式
//
// class ClassComp_ extends Component {
// 	render() {
// 		return <div>hello class component</div>
// 	}
// }
//
// const FnComp = function (props) {
// 	console.log(props.children)
//
// 	return (
// 		<div className="ele-wra" title="这是JSX基础">
// 			<h3 title="title">这是 方法的JSX</h3>
// 			<div className="calcWra">
// 				<button className="reduce" onClick={ (e) => { console.log(e) } }>-</button>
// 				<span>{ 100 }</span>
// 				<button className="add" onClick={ (e) => { console.log(e) } }>+</button>
// 			</div>
// 			{ props.children }
// 		</div>
// 	)
// }
// console.log((
// 	<FnComp id="100">
// 		<span>{ 100 }</span>
// 		<FnComp id="1001">
// 			<span>{ 100 }</span>
// 		</FnComp>
// 	</FnComp>
// ), 'JSX语法')

/* 解析函数组件 */
// render((
// 	<FnComp id="100">
// 		<address>曾大大</address>
// 		{/*<ClassComp_></ClassComp_>*/}
// 	</FnComp>
// ), document.querySelector('#root'))




class ClassCom extends Component {
	constructor() {
		super()

		this.state = {
			num: 100
		}

		this.handleReduce = () => {
			console.log(this)
			this.setState({
				num: this.state.num - 1
			})
		}

		this.handleAdd = () => {
			this.setState(prevState => {
				console.log(prevState)
				return {
					num: prevState.num + 1
				}
			}, (currentState) => {
				console.log(currentState.num)
			})
		}
	}


	componentWillReceiveProps() {
		console.log('componentWillReceiveProps')

	}

	shouldComponentUpdate() {
		console.log('shouldComponentUpdate')
		return true
	}

	componentWillUpdate() {
		console.log('componentWillUpdate')

	}

	componentDidUpdate() {
		console.log('componentDidUpdate')

	}

	componentDidMount() {
		console.log('componentDidMount')
		for (let i = 0; i < 100; i ++) {
			this.setState(prevState => {
				// console.log('上一次 state 中 number' + prevState.num)
				return {
					num: prevState.num + 1
				}
			}, () => {
				// console.log(this.state.num)
			})
		}

	}

	componentWillMount() {
		console.log('componentWillMount')

	}


	render() {
		let { name } = this.props
		let { num } = this.state
		return (
			<div>
				<h1>hello { name }  </h1>
				<div className="calcWra">
					<button className="reduce" onClick={ this.handleReduce }>-</button>
					<span>{ num }</span>
					<button className="add" onClick={ this.handleAdd }>+</button>
				</div>

			</div>

		)
	}
}

/* 解析类组件 */
render(<ClassCom name="bill"></ClassCom>, document.querySelector('#root'))