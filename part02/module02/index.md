
1. Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
webpack构建流程：
- 默认支持js文件的打包，TreeShaking打包优化
  - TreeShaking在生产模式下会自动启用，其他模式下需要手动开启
- 搭配loader(加载器)实现编译操作、文件转换、代码检查的功能

- 搭配plugin(插件)在Webpack构建过程的特定时机注入扩展逻辑，用来改变或优化构建结果
- 除webpack自带功能，webpack都需要通过入口文件：webpack.config.js 导出的配置对象，获取扩展配置信息，完成其它功能的支持


- 初始化webpack
  - 通过命令：yarn add webpack webpack-cli，安装webpack工具
- 

1. Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
