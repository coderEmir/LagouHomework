## 一、简答题

### 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。

 - 动态给 data 增加的成员不是响应式数据
 - 实现方式：
    ```js
        Vue.set(object, propertyName, value)
    ```
 - 内部原理：
    对象的响应式是在new Vue时，Vue在2.xxx版本内部使用ObjectDefineProperty、3.xx版本使用proxy将属性转为getter和setter，在getter和setter中监听属性状态变化，实现响应式。
    直接动态给data增加的成员，不满足实现对象的响应式的基本要求，Vue.set函数内部对传入的属性进行getter和setter转换处理。
 

### 2、请简述 Diff 算法的执行过程
- diff的过程是比较新旧节点，最后将比对结果更新到真实DOM上。是对真实DOM打补丁的过程。
- 新旧VNode节点是否相同（key与sel相同）
  - 不相同，删除旧内容，重新渲染
  - 相同，判断VNode是否有text，如果有text，而与oldVNode 的text不同 ，则更新test
  - 如果新的VNode有children，判断子节点的差异，将差异更新到真实DOM
    
> diff过程只在同层级比较 
 

## 二、编程题

### 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。

 

### 2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。

 

### 3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果，如图：