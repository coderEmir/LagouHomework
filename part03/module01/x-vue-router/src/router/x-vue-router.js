let _Vue = null
export default class VueRouter {
    static install (Vue) {
        if (VueRouter.install.isInstalled) return
        VueRouter.install.isInstalled = true

        _Vue = Vue
        // 混入
        _Vue.mixin ({
            beforeCreate() {
                // vue每个组件声明beforeCreate，都会调用这里。通过if判断，确认是否为根组件
                if (this.$options.router) {
                    _Vue.prototype.$router = this.$options.router    
                    this.$options.router.init()
                }
            },
        })
    }

    constructor (options) {
        this.options = options
        this.routerMap = {}
        console.log(_Vue.observable);
        this.data = _Vue.observable({
            current: this.options.mode === 'history' ? '' : '/' + '#/'
        })
    }

    init() {
        this.initRouteMap()
        this.initComponents(_Vue)
        this.initEvent()
    }
    // key-value形式建立路由和组件间关系
    initRouteMap() {
        // 遍历路由规则
        const modeParma = this.options.mode === 'history' ? '' : '#'
        this.options.routes.forEach(route => {
            let path = modeParma + route.path
            this.routerMap[path] = route.component
            if (this.options.mode === 'hash') {
                if (route.path === '' || route.path === '/') {
                    path = '/#/'
                    this.routerMap[path] = route.component
                }
            }
        });
    }

    initComponents (Vue) {
        Vue.component("router-link", {
            props: {
                to: String
            },
            render(h) {
                return h("a", {
                    attrs: {
                        href: this.$router.options.mode === 'hash' ? '#' + this.to : this.to
                    },
                    on: {
                        click: this.clickHandler
                    }
                }, [this.$slots.default])
            },
            methods: {
                clickHandler(e) {
                    // hash移除事件
                    if (this.$router.options.mode === 'hash') return
                    // history事件处理
                    history.replaceState({}, "", this.to),
                    this.$router.data.current = this.to
                    // 移除默认行为
                    e.preventDefault()
                }
            }
        })
    
        Vue.component("router-view", {
            // 使用箭头函数，保留this的指向（指向initComponents函数中的this：router实例）
            render: (h) => {
                const component = this.routerMap[this.data.current]
                console.log("component", component);
                console.log("this.data.current", this.data.current);
                return h(component)
            }
        })
    }

    initEvent() {
        if (this.options.mode === 'history') {
            console.log("history");
            window.addEventListener('popstate', () => {
                this.data.current = window.location.pathname
            })
            return;
        }
        window.addEventListener('hashchange', () => {
            console.log("hashchange");
            console.log(`hashchange + ${window.location.hash}`);
            const hash = window.location.hash
            this.data.current = hash.length == 0 ? '/#/' : hash
        })
    }
}