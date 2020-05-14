// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"JS/utils/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTypes = exports.isType = exports.default = void 0;
var _self = null;
var utils = {
  init: function init() {
    _self = this;
  },
  toStr: function toStr(target) {
    return Object.prototype.toString.call(target);
  },
  // 判断是否为这种类型
  isType: function isType(target, type) {
    return _self.toStr(target) === "[object ".concat(type, "]");
  },
  // 判断 type 是一组内的哪些
  isTypes: function isTypes(target, types) {
    return types.some(function (type) {
      return _self.isType(target, type);
    });
  }
};
/* 初始化保存 this */

exports.default = utils;
utils.init();
var isType = utils.isType,
    isTypes = utils.isTypes;
exports.isTypes = isTypes;
exports.isType = isType;
},{}],"JS/react/create-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _utils = require("../utils");

function _default(tag, attrs) {
  // 为 attr 加一个 key 属性 并且 防止 报错
  var transformChild = [];
  /* children 扁平化 */

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  children.forEach(function (v) {
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
    transformChild = transformChild.concat(v);
  });
  attrs = attrs || {};
  var _attrs = attrs,
      _attrs$key = _attrs.key,
      key = _attrs$key === void 0 ? null : _attrs$key;
  return {
    tag: tag,
    attrs: attrs,
    children: transformChild,
    key: key
  };
}
},{"../utils":"JS/utils/index.js"}],"JS/react-dom/create-component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _react = require("../react");

/*
	1、函数组件
	2、类组件
* */
function _default(Comp, props) {
  // 最终实例
  var instance;
  /* 判断是否属于类组件还是函数组件 */
  // 查看是否有 prototype 并且原型上有 render 方法 就是 类组件

  if (Comp.prototype && Comp.prototype.render) {
    instance = new Comp(props); // 现在就是函数组件 我们需要 让它具备 render
  } else {
    instance = new _react.Component(props); // 让创建的实例的构造器 指向 函数组件

    instance.constructor = Comp; // 执行 render 只需要返回 函数组件的结果

    instance.render = function () {
      // 返回结果
      return instance.constructor(props);
    };
  }

  return instance;
}
},{"../react":"JS/react/index.js"}],"JS/react-dom/set-attributes.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _utils = require("../utils");

/*
	做属性分类判断
	1、属性为 class
	2、属性为 style
	3、属性为 event(onXXX)
*/
function _default(dom, key, value) {
  // if (key === 'className') {
  // 	key = 'class'
  // }
  if (key === 'style') {
    // <div style={{ color: 'red', fontSize: '14px' }}></div>
    if ((0, _utils.isType)(value) === 'Object') {
      // 如果是对象形似我们遍历设置样式
      for (var _key in value) {
        dom.style[_key] = value;
      } // 如果是普通的 我们直接设置行类样式

    } else {
      dom.style.cssText = value;
    } // 如果是事件

  } else if (/^on\w+/g.test(key)) {
    key = key.toLowerCase(); // 只需要添加事件 onClick ==> onclick 我们绑定时间 // TODO

    dom[key] = value || ''; // 其他的我们直接赋值给dom 就行
  } else {
    // 其他的我们手动设置
    dom[key] = value;
  }
}
},{"../utils":"JS/utils/index.js"}],"JS/react-dom/set-component-props.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _render2 = require("./render");

/*
* 设置 props 并且 在 实例上加一个 dom 属性
* */
function _default(instance, nextProps) {
  var oldBase = instance.base,
      props = instance.props,
      componentWillReceiveProps = instance.componentWillReceiveProps;
  instance.prevProps = props;
  instance.props = nextProps; // 如果 有 componentWillReceiveProps 我们就执行

  if (oldBase) {
    componentWillReceiveProps && componentWillReceiveProps(instance.props);
  }
}
},{"./render":"JS/react-dom/render.jsx"}],"JS/diff/diff-component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _reactDom = require("../react-dom");

/*
* 判断是否为改变了组件
* */
function _default(dom, vnode) {
  var comp = dom;
  var tag = vnode.tag,
      attrs = vnode.attrs,
      children = vnode.children; // 如果有 dom 并且它的 constructor 和 tag 是一样的函数，代表没有改变组件

  if (comp && comp.constructor === tag) {
    /* 重新改变 props 就好 */
    (0, _reactDom.setComponentProps)(comp, attrs); // 组件已经改变 Home ===> About
  } else {
    // 如果之前有 我们就要销毁
    if (comp) {
      UnMountComponent(dom);
      dom = null;
    }
    /*
    * 1、创建新组件
    * 2、设置组件属性
    * 3、给当前dom挂载
    * */
    // 我们需要创建一个新的组件


    comp = (0, _reactDom.createComponent)(tag, attrs);
    (0, _reactDom.setComponentProps)(comp, attrs);
  } // // 如果组件内嵌套别的组件我们存放在 props 中 使用 的话 直接 this.props


  if (children) {
    comp.props.children = children;
  } // 开始渲染组件，就会挂载一个 base  属性 也就是 真实dom 对象


  (0, _reactDom.renderComponent)(comp);
  /* 如果有内嵌我们 将它转换为 真实DOM 放到 props 中 */
  // if (children) {
  // 	comp.props.children = diffNode(null, children)
  // }

  /* TODO 为 base 指向 constructor diff 对比 */

  comp.base.constructor = comp.constructor;
  return comp.base;
}

function UnMountComponent(comp) {
  comp.parentNode && comp.parentNode.removeChild(comp);
}
},{"../react-dom":"JS/react-dom/index.jsx"}],"JS/diff/diff-children.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.removeNode = void 0;

var _diffNode = _interopRequireDefault(require("./diff-node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*
* TODO
* */
function _default(dom, vChildren) {
  var domChildren = dom.childNodes;
  var children = [];
  var keyed = {}; // 将有 key 的节点(用对象保存)和没有key 的节点(用数组保存)分开

  if (domChildren.length > 0) {
    ;

    _toConsumableArray(domChildren).forEach(function (child) {
      // console.log(child)
      if (child.key) {
        keyed[child.key] = child;
      } else {
        children.push(child);
      }
    });
  }

  if (vChildren && vChildren.length) {
    var min = 0;
    var childrenLen = vChildren.length;

    _toConsumableArray(vChildren).forEach(function (vChild, i) {
      // 获取 虚拟DOM中所有的KEY值的节点
      var key = vChild.key;
      var child;

      if (key) {
        // 如果有key，找对应的key值的节点
        if (keyed[key]) {
          child = keyed[key];
          keyed[key] = undefined;
        }
      } else if (childrenLen > min) {
        // 如果没有 key， 则优先查找类型相同的节点
        for (var j = min; j < childrenLen; j++) {
          var c = children[j];

          if (c) {
            child = c;
            children[j] = undefined;
            if (j === childrenLen - 1) childrenLen--;
            if (j === min) min++;
            break;
          }
        }
      } // 对比渲染子节点


      child = (0, _diffNode.default)(child, vChild); // 更新DOM

      var f = domChildren[i];

      if (child && child !== dom && child !== f) {
        // 如果更新前对应位置为空，说明此节点是新增的
        if (!f) {
          dom.appendChild(child); // 如果更新后的节点和更新前的节点对应下一个节点位置一样，说明更新了这个节点
        } else if (child === f.nextSibling) {
          removeNode(f);
          console.log(f, 'diffChildren');
        } else {
          console.log(child, 'diffChildren', f, child === f); // 注意insertBefore 第一个参数是要插入的节点，第二个是位置

          dom.insertBefore(child, f);
        }
      }
    });
  }
}

var removeNode = function removeNode(dom) {
  if (dom && dom.parentNode) {
    dom.parentNode.removeChild(dom);
  }
};

exports.removeNode = removeNode;
},{"./diff-node":"JS/diff/diff-node.js"}],"JS/diff/diff-attributes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _reactDom = require("../react-dom");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _default(dom, attrs) {
  // 真实DOM 上属性对象
  var domAttributes = {};
  dom && _toConsumableArray(dom.attributes).forEach(function (attr) {
    var value = attr.value,
        name = attr.name;
    domAttributes[name] = value;
  }); // 遍历 虚拟VDOM的key 在 domAttributes 有没有? 没有的话我们为  真实DOM 加上 改变了值

  for (var key in attrs) {
    if (!(key in domAttributes) || domAttributes[key] !== attrs[key]) {
      (0, _reactDom.setAttributes)(dom, key, attrs[key]);
    }
  } // 遍历 真实DOM的key 在 attrs 有没有? 没有的话我们为 真实DOM 移除这个属性


  for (var _key in domAttributes) {
    if (!(_key in attrs)) {
      (0, _reactDom.setAttributes)(dom, _key, undefined);
    }
  }
}
},{"../react-dom":"JS/react-dom/index.jsx"}],"JS/diff/diff-node.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../utils");

var _diffComponent = _interopRequireDefault(require("./diff-component"));

var _diffChildren = _interopRequireDefault(require("./diff-children"));

var _diffAttributes = _interopRequireDefault(require("./diff-attributes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* 作用：将虚拟DOM和原始DOM进行对比。最终只改变真实变化的DOM
* */
var mount = false;

var diffNode = function diffNode(dom, vnode) {
  // 输出结果
  var out = dom; // 判断虚拟节点为空 我们直接返回

  if ((0, _utils.isTypes)(vnode, ['Null', 'Undefined', 'Boolean'])) return; // 如果你是数组再次遍历
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

  if ((0, _utils.isType)(vnode, 'Number')) vnode = String(vnode);

  if ((0, _utils.isType)(vnode, 'String')) {
    /*
    * nodeType: 1 ==> 元素节点 2 ==> 属性节点 3 ===> 文本节点
    * */
    // 刚好原始DOM 也是 文本节点 我们只需要替换 文本内容就好了
    if (dom) {
      if (dom.nodeType === 3 && dom.textContent !== vnode) {
        dom.textContent = vnode;
      }
    } else {
      // 生成文本节点 替换 它
      out = document.createTextNode(vnode); // 如果不是 顶级 DOM 元素 我们就 替换

      if (dom && dom.parentNode) {
        dom.parentNode.replaceChild(out, dom);
      }
    }

    return out;
  }
  /* 剩下的就是真实 DOM 了 */


  var _vnode = vnode,
      tag = _vnode.tag,
      attrs = _vnode.attrs,
      children = _vnode.children; // 如果是组件 生成组件

  if ((0, _utils.isType)(tag, 'Function')) {
    // 对比 组件
    return (0, _diffComponent.default)(dom, vnode);
  }

  if (!dom) {
    out = document.createElement(tag);
  }
  /* 去 diff 属性 */


  (0, _diffAttributes.default)(out, attrs);
  /* 如果有 children 我们还需要对比一下  */

  if (children && children.length || out.childNodes.length) {
    (0, _diffChildren.default)(out, children);
  }

  return out;
};

var _default = diffNode;
exports.default = _default;
},{"../utils":"JS/utils/index.js","./diff-component":"JS/diff/diff-component.js","./diff-children":"JS/diff/diff-children.js","./diff-attributes":"JS/diff/diff-attributes.js"}],"JS/diff/index.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "diffNode", {
  enumerable: true,
  get: function () {
    return _diffNode.default;
  }
});
Object.defineProperty(exports, "diffChild", {
  enumerable: true,
  get: function () {
    return _diffChildren.default;
  }
});
Object.defineProperty(exports, "diffComponent", {
  enumerable: true,
  get: function () {
    return _diffComponent.default;
  }
});
exports.default = void 0;

var _diffNode = _interopRequireDefault(require("./diff-node"));

var _diffChildren = _interopRequireDefault(require("./diff-children"));

var _diffComponent = _interopRequireDefault(require("./diff-component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// diff 入口函数 第一个参数为 原始 dom
var diff = function diff(dom, vnode, container) {
  var result = (0, _diffNode.default)(dom, vnode); // 如果有容器 加入到 容器汇总

  if (result && container) {
    container.appendChild(result);
  }
};

exports.default = diff;
},{"./diff-node":"JS/diff/diff-node.js","./diff-children":"JS/diff/diff-children.js","./diff-component":"JS/diff/diff-component.js"}],"JS/react-dom/render-component.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _render2 = _interopRequireWildcard(require("./render"));

var _diff = _interopRequireWildcard(require("../diff"));

var _utils = require("../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _default(comp) {
  var oldBase = comp.base,
      prevState = comp.prevState,
      prevProps = comp.prevProps,
      props = comp.props,
      state = comp.state,
      shouldComponentUpdate = comp.shouldComponentUpdate,
      componentWillUpdate = comp.componentWillUpdate,
      componentDidUpdate = comp.componentDidUpdate,
      componentWillMount = comp.componentWillMount,
      componentDidMount = comp.componentDidMount; // 如果之前没有组件 代表 第一次渲染

  if (!oldBase) {
    componentWillMount && componentWillMount.call(comp);
  } else {
    if (shouldComponentUpdate) {
      // 如果 返回 false 我们 就直接退出
      if (!shouldComponentUpdate(props, state)) return;
    }

    componentWillUpdate && componentWillUpdate();
  }

  var renderer = comp.render ? comp.render() : comp.initClass.render(); // const renderer = comp.render()
  // const base = _render(renderer)

  var base = (0, _diff.diffNode)(oldBase, renderer); // console.dir(base, '结果')
  // /* TODO 为 base 指向 constructor diff 对比 */
  // base.constructor = comp.constructor
  // 初始化的时候 类
  // console.log(base.initClass)

  base.initClass = comp.render ? comp : comp.initClass;
  /* 开始渲染子组件 */
  // if (props.children) {
  // 	console.log(props.children)
  // 	diffChild(base, props.children)
  // }
  // if (oldBase && oldBase.parentNode) {
  // 	oldBase.parentNode.replaceChild(base, oldBase)
  // }

  comp.base = base;

  if (oldBase) {
    componentDidUpdate && componentDidUpdate.call(comp, prevProps, prevState);
  } else {
    componentDidMount && componentDidMount.call(comp);
  }
}
},{"./render":"JS/react-dom/render.jsx","../diff":"JS/diff/index.jsx","../utils":"JS/utils/index.js"}],"JS/react-dom/render.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._render = exports.default = void 0;

var _utils = require("../utils");

var _createComponent = _interopRequireDefault(require("./create-component"));

var _setAttributes = _interopRequireDefault(require("./set-attributes"));

var _setComponentProps = _interopRequireDefault(require("./set-component-props"));

var _renderComponent = _interopRequireDefault(require("./render-component"));

var _diff = _interopRequireDefault(require("../diff"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// import {renderComponent} from "../../Teacher/JS/react-dom";
var render = function render(vnode, container, dom) {
  // 使用diff
  (0, _diff.default)(dom, vnode, container); // const dom = _render(vnode)
  // // 如果有容器 并且 dom 是真实有效的 我们就 加入到容器中
  // if (container && dom) return container.appendChild(dom)
};
/* 根据虚拟节点去生成真实DOM */


exports.default = render;

var _render = function _render(vnode) {
  // 判断虚拟节点为空 我们直接返回
  if ((0, _utils.isTypes)(vnode, ['Null', 'Undefined', 'Boolean'])) return; // 如果你是数组再次遍历

  if ((0, _utils.isType)(vnode, 'Array')) {
    /* 使用 Fragment 文档片段包裹起来 */
    var f = document.createDocumentFragment();
    vnode.map(function (item) {
      return f.appendChild(_render(item));
    });
    return f;
  } // 如果是字符串类型 生成文本节点 如果是 number 强制转换为 string 类型


  if ((0, _utils.isType)(vnode, 'Number')) vnode = String(vnode);
  if ((0, _utils.isType)(vnode, 'String')) return document.createTextNode(vnode);
  var _vnode = vnode,
      tag = _vnode.tag,
      attrs = _vnode.attrs,
      children = _vnode.children; // 如果是组件 生成组件

  if ((0, _utils.isType)(tag, 'Function')) {
    /*
    * 1、创建组件
    * 2、设置组件属性
    * 3、组件渲染的节点返回
    * */
    var instance = (0, _createComponent.default)(tag, attrs);
    (0, _setComponentProps.default)(instance, attrs); // 如果组件内嵌套别的组件我们存放在 props 中 使用 的话 直接 this.props

    if (children) instance.props.children = children; // 渲染组件

    (0, _renderComponent.default)(instance);
    return instance.base;
  } // 普通JSX 语法
  // 生成一个标签


  var ele = document.createElement(tag); // 设置属性

  attrs && Object.keys(attrs).forEach(function (key) {
    (0, _setAttributes.default)(ele, key, attrs[key]);
  }); // 递归遍历子组件

  children && _toConsumableArray(children).forEach(function (vChild) {
    render(vChild, ele);
  });
  return ele;
};

exports._render = _render;
},{"../utils":"JS/utils/index.js","./create-component":"JS/react-dom/create-component.js","./set-attributes":"JS/react-dom/set-attributes.jsx","./set-component-props":"JS/react-dom/set-component-props.js","./render-component":"JS/react-dom/render-component.jsx","../diff":"JS/diff/index.jsx"}],"JS/react-dom/index.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function () {
    return _render.default;
  }
});
Object.defineProperty(exports, "setAttributes", {
  enumerable: true,
  get: function () {
    return _setAttributes.default;
  }
});
Object.defineProperty(exports, "renderComponent", {
  enumerable: true,
  get: function () {
    return _renderComponent.default;
  }
});
Object.defineProperty(exports, "createComponent", {
  enumerable: true,
  get: function () {
    return _createComponent.default;
  }
});
Object.defineProperty(exports, "setComponentProps", {
  enumerable: true,
  get: function () {
    return _setComponentProps.default;
  }
});
exports.default = void 0;

var _render = _interopRequireDefault(require("./render"));

var _setAttributes = _interopRequireDefault(require("./set-attributes"));

var _renderComponent = _interopRequireDefault(require("./render-component"));

var _createComponent = _interopRequireDefault(require("./create-component"));

var _setComponentProps = _interopRequireDefault(require("./set-component-props"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactDOM = {
  render: _render.default,
  setAttributes: _setAttributes.default,
  renderComponent: _renderComponent.default,
  createComponent: _createComponent.default,
  setComponentProps: _setComponentProps.default
};
exports.default = ReactDOM;
},{"./render":"JS/react-dom/render.jsx","./set-attributes":"JS/react-dom/set-attributes.jsx","./render-component":"JS/react-dom/render-component.jsx","./create-component":"JS/react-dom/create-component.js","./set-component-props":"JS/react-dom/set-component-props.js"}],"JS/react/set-state-queue.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleEnqueue = handleEnqueue;
exports.handleDeQueue = handleDeQueue;

var _utils = require("../utils");

var _reactDom = require("../react-dom");

var _diff = require("../diff");

/*
* 1、异步更新state，短时间内把多个 setState 合并一个 (队列：先进先出)
* 2、一段时间之后，清空队列，渲染组件
* */
// 状态队列

/* 状态队列 */
var StateQueue = [];
/* 改变组件队列 */

var CompQueue = [];
/* 完成时的队列 */

var changedQueue = [];

var delay = function delay(fn) {
  fn();
}; // 入队


function handleEnqueue(payload) {
  /* 一定时间内操作 */
  if (StateQueue.length === 0) {
    setTimeout(function () {
      delay(handleDeQueue);
    }, 66);
  }

  var changeState = payload.changeState,
      changedState = payload.changedState,
      changeComponent = payload.changeComponent;
  StateQueue.push({
    changeState: changeState,
    changeComponent: changeComponent
  });
  (0, _utils.isType)(changedState, 'Function') && changedQueue.push({
    changedState: changedState,
    changeComponent: changeComponent
  }); // 更改的组件如果没有这个 就加入

  if (!CompQueue.some(function (v) {
    return v === changeComponent;
  })) {
    CompQueue.push(changeComponent);
  }
} // 出队


function handleDeQueue() {
  var item, component, changed;
  /* 合并 state */

  while (item = StateQueue.shift()) {
    var _item = item,
        changeState = _item.changeState,
        changeComponent = _item.changeComponent;

    if ((0, _utils.isType)(changeState, 'Function')) {
      changeComponent.prevState = changeComponent.state;
      Object.assign(changeComponent.state, changeState(changeComponent.state, changeComponent.state.props));
    } else if ((0, _utils.isType)(changeState, 'Object')) {
      Object.assign(changeComponent.state, changeState);
    }
  }
  /* 按顺序改变 */


  while (component = CompQueue.shift()) {
    (0, _reactDom.renderComponent)(component); // diffComponent(component, component.render())
  }
  /* 更改时候的回调 */


  while (changed = changedQueue.shift()) {
    var _changed = changed,
        changedState = _changed.changedState,
        _changeComponent = _changed.changeComponent;
    changedState(_changeComponent.state, _changeComponent.state.props);
  }
}
},{"../utils":"JS/utils/index.js","../react-dom":"JS/react-dom/index.jsx","../diff":"JS/diff/index.jsx"}],"JS/react/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../utils");

var _reactDom = require("../react-dom");

var _setStateQueue = require("./set-state-queue");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Component = /*#__PURE__*/function () {
  function Component(props) {
    _classCallCheck(this, Component);

    this.props = props || {};
    this.state = {};
  } // 具有 render 方法


  _createClass(Component, [{
    key: "render",
    value: function render() {} // 具有 setState 方法

  }, {
    key: "setState",
    value: function setState() {
      var _arguments = Array.prototype.slice.call(arguments),
          changeState = _arguments[0],
          changedState = _arguments[1];

      (0, _setStateQueue.handleEnqueue)({
        changeState: changeState,
        changedState: changedState,
        changeComponent: this
      }); // // 第一个参数是方法 执行得到结果再覆盖到state
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
  }]);

  return Component;
}();

exports.default = Component;
},{"../utils":"JS/utils/index.js","../react-dom":"JS/react-dom/index.jsx","./set-state-queue":"JS/react/set-state-queue.js"}],"JS/react/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createElement", {
  enumerable: true,
  get: function () {
    return _createElement.default;
  }
});
Object.defineProperty(exports, "Component", {
  enumerable: true,
  get: function () {
    return _component.default;
  }
});
exports.default = void 0;

var _createElement = _interopRequireDefault(require("./create-element"));

var _component = _interopRequireDefault(require("./component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = {
  createElement: _createElement.default,
  Component: _component.default
};
exports.default = React;
},{"./create-element":"JS/react/create-element.js","./component":"JS/react/component.js"}],"JS/index.jsx":[function(require,module,exports) {
"use strict";

var _react = _interopRequireWildcard(require("./react"));

var _reactDom = require("./react-dom");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
//
// class ClassCom extends Component {
// 	constructor() {
// 		super()
//
// 		this.state = {
// 			num: 100
// 		}
//
// 		this.handleReduce = () => {
// 			console.log(this)
// 			this.setState({
// 				num: this.state.num - 1
// 			})
// 		}
//
// 		this.handleAdd = () => {
// 			this.setState(prevState => {
// 				console.log(prevState)
// 				return {
// 					num: prevState.num + 1
// 				}
// 			}, (currentState) => {
// 				console.log(currentState.num)
// 			})
// 		}
// 	}
//
//
// 	componentWillReceiveProps() {
// 		console.log('componentWillReceiveProps')
//
// 	}
//
// 	shouldComponentUpdate() {
// 		console.log('shouldComponentUpdate')
// 		return true
// 	}
//
// 	componentWillUpdate() {
// 		console.log('componentWillUpdate')
//
// 	}
//
// 	componentDidUpdate() {
// 		console.log('componentDidUpdate')
//
// 	}
//
// 	componentDidMount() {
// 		console.log('componentDidMount')
// 		for (let i = 0; i < 100; i ++) {
// 			this.setState(prevState => {
// 				// console.log('上一次 state 中 number' + prevState.num)
// 				return {
// 					num: prevState.num + 1
// 				}
// 			}, () => {
// 				// console.log(this.state.num)
// 			})
// 		}
//
// 	}
//
// 	componentWillMount() {
// 		console.log('componentWillMount')
//
// 	}
//
//
// 	render() {
// 		let { name } = this.props
// 		let { num } = this.state
// 		return (
// 			<div>
// 				<h1>hello { name }  </h1>
// 				<div className="calcWra">
// 					<button className="reduce" onClick={ this.handleReduce }>-</button>
// 					<span>{ num }</span>
// 					<button className="add" onClick={ this.handleAdd }>+</button>
// 				</div>
//
// 			</div>
//
// 		)
// 	}
// }
//
// /* 解析类组件 */
// render(<ClassCom name="bill"></ClassCom>, document.querySelector('#root'))
var ClassCom = /*#__PURE__*/function (_Component) {
  _inherits(ClassCom, _Component);

  var _super = _createSuper(ClassCom);

  function ClassCom() {
    var _this;

    _classCallCheck(this, ClassCom);

    _this = _super.call(this);
    _this.state = {
      num: 100,
      title: '这是标题'
    };

    _this.handleReduce = function () {
      console.log(_assertThisInitialized(_this));

      _this.setState({
        num: _this.state.num - 1
      });
    };

    _this.handleAdd = function () {
      _this.setState(function (prevState) {
        console.log(prevState);
        return {
          num: prevState.num + 1
        };
      }, function (currentState) {
        console.log(currentState.num);
      });
    };

    return _this;
  }

  _createClass(ClassCom, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var name = this.props.name;
      var _this$state = this.state,
          num = _this$state.num,
          title = _this$state.title;
      console.log(this.props);
      return _react.default.createElement("div", null, _react.default.createElement("h1", {
        key: 1,
        title: title,
        onClick: function onClick() {
          _this2.setState({
            title: title + '-1'
          });
        }
      }, "hello ", name, " ", title), _react.default.createElement("div", {
        className: "calcWra"
      }, _react.default.createElement("button", {
        className: "reduce",
        onClick: this.handleReduce
      }, "-"), _react.default.createElement("span", null, num), _react.default.createElement("button", {
        className: "add",
        onClick: this.handleAdd
      }, "+")), [1, 2, 3, 4].map(function (v) {
        return _react.default.createElement("p", {
          key: v + '123'
        }, v);
      }));
    }
  }]);

  return ClassCom;
}(_react.Component);
/* 解析类组件 */


(0, _reactDom.render)(_react.default.createElement("div", null, _react.default.createElement(ClassCom, {
  name: "bill"
}, _react.default.createElement(ClassCom, {
  name: "tom"
}))), document.querySelector('#root')); //
// const ele = (
// 	<div>
// 		<h1>hello { name }  </h1>
//
// 		{
// 			[1,2, 3, 4].map(v => <p>{ v }</p>)
// 		}
//
// 	</div>
// )
// render(ele, document.querySelector('#root'))
},{"./react":"JS/react/index.js","./react-dom":"JS/react-dom/index.jsx"}],"node_modules/_parcel-bundler@1.12.4@parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56050" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/_parcel-bundler@1.12.4@parcel-bundler/src/builtins/hmr-runtime.js","JS/index.jsx"], null)
//# sourceMappingURL=/JS.d9f4f5e9.js.map