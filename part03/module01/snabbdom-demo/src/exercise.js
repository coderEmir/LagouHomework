import { h, thunk, init } from 'snabbdom';
// 导入模块
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'
// 注册模块
// h()函数的第二个参数设置模块需要的数据（对象）
// 初始化patch函数，参数：数组[模块],不使用模块传 []
// let patch = init([])

let patch = init([style, eventlisteners])

// h函数: 生成虚拟DOM的函数
// 第一个参数 ： 标签 + 选择器
// 第二个参数 ： 标签中的内容/子节点数组
// let newVNode = h('div#newElement.className', 'this is a div element')
let newVNode = h('div#newElement.className', [
    h('h1', 'this is a h1 element'),
    h('div', 'this is a div element'),
])
// 获取占位div元素
const app = document.querySelector('#app')
// 第一个参数可以是虚拟DOM或者真实DOM，内部会转换成VNode
// 第二个参数：VNode
// 返回值：更新后的VNode
let lastVNode = patch(app, newVNode)

// 更新
// newVNode = h('div#newElement.className', 'new value')
newVNode = h('div#newElement.className', [
    h('h1', 'change h1 content'),
    h('div', 'this is a div element'),
])

lastVNode = patch(lastVNode, newVNode)

const modeVNode = h('div', {
    style: {
        backgroundColor: 'red'
    },
    on: {
        click: handler
    }
}, [h('p', 'this is a p element in div')])

// const modeVNode = h('div',{
//     style: {
//         backgroundColor : 'red'
//     },
//     on: {
//         click: handler
//     }
// }, '我是红色的')

function handler() {
    console.log('被点了');
}

setTimeout(() => {
    console.log(lastVNode, modeVNode);
    patch(lastVNode, modeVNode)
}, 2000);


// clean VNode
setTimeout(() => {
    patch(lastVNode, h('!'))
}, 2000);