import { h, thunk, init } from 'snabbdom';
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'

const app = document.querySelector('#app')

let patch = init([style, eventlisteners])

let headerVNode = [
    h('button#ranking', {
        on: {
            click: updateSort
        }
    }, '综合排名'),
    h('button#month', {
        on: {
            click: updateSort
        }
    },'月份'),
    h('button#sales', {
        on: {
            click: updateSort
        }
    }, '销量')
]

let originalData = [
    { ranking: 1, month: 12, sales:1200 },
    { ranking: 2, month: 3, sales: 1000 },
    { ranking: 3, month: 5, sales: 800 }
]

let listVNode = []

function initListNode(array) {
    const tempListVNode = []
    array.forEach(item => {
        const singleRowVNode = h('div', [
            h('span', item.ranking),
            h('span',' '),
            h('span', item.month),
            h('span', ' '),
            h('span', item.sales)
        ])
        tempListVNode.push(singleRowVNode)
    })
    return tempListVNode
}
listVNode = initListNode(originalData)

let currentStandard = ''
let oldVNode = app
let newVNode

function render (oldNode, newVNode) {
    let contentVNode = [...headerVNode, ...listVNode]
    newVNode = h('div#app', contentVNode);
    oldVNode = patch(oldNode, newVNode)
}
render(oldVNode, newVNode)

function updateSort(event) {
    console.log('updateSort');
    const button = event.target
    originalData = sort(originalData, button.id)
    listVNode = initListNode(originalData)
    render(oldVNode, newVNode)
}


function sort (arr, standard) {
    if (arr.length <= 1) { return arr; }
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][standard] < pivot[standard]) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return sort(left, standard).concat([pivot], sort(right, standard));
};

// function sort(arr, standard) {
// if (arr.length <= 1) { return arr; }
//     for (let i = 0; i < arr.length - 1; i++) {
//         console.log(i);
//         for (let j = 0; j < arr.length - 1 - i; j++) {
//             if (arr[j][standard] > arr[j + 1][standard]) {
//                 var temp = arr[j];
//                 arr[j] = arr[j + 1];
//                 arr[j + 1] = temp;
//             }
//         }
//     }
//     return arr;
// };