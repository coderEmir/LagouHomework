
1. Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
webpack构建流程：
- 默认支持js文件的打包，TreeShaking打包优化
  - TreeShaking在生产模式下会自动启用，其他模式下需要手动开启
- 搭配loader(加载器)实现编译操作、文件转换、代码检查的功能

- 搭配plugin(插件)在Webpack构建过程的特定时机注入扩展逻辑，用来改变或优化构建结果
- 除webpack自带功能，webpack都需要通过入口文件：webpack.config.js 导出的配置对象，获取扩展配置信息，完成其它功能的支持


1. Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
- loader(加载器)
加载不同的资源模块(默认仅支持加载、解析js文件)。loader专注实现资源模块加载。

- Loader开发：
  - 创建一个 xxx-loader文件
  - module.exports 导出一个函数 
  - 加工输入的source，return 输出结果

- plugin(插件)
在webpack构建过程的特定时机，注入扩展逻辑，改变或优化构建结果。 
增强webpack自动化能力，解决除模块加载外的自动化工作。
实现大多前端的工程化工作。
webpack 不等于 工程化

- webpack开发：
  - 创建一个函数，或者包含apply方法的对象
  - 通过apply传入的参数，向hooks的具体钩子，通过tap绑定自定义钩子函数
  - 利用自定义函数获取到的compilation，完成插件的需求处理