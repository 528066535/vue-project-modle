// import createApp from '@Pub/main'
const createApp = require('./resource/pub/main');

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp('history');
        const { url } = context;

        // 设置服务器端 router 的位置
        router.push(url);

        // 等到 router 将可能的异步组件和钩子函数解析完
        router.onReady(() => {
            // 获取当前路径的组件
            const matchedComponents = router.getMatchedComponents()

            // 没有返回404
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }

            // 如果该路径存在，而且该路径存在需要调用接口来预取数据的情况，便等所有`asyncData`函数执行完毕.
            // `asyncData`函数是组件自定义静态函数, 用来提前获取数据。
            Promise.all(matchedComponents.map( ({asyncData}) => asyncData && asyncData({
                store,
                route: router.currentRoute
            }))).then( () => {
                // 执行完毕后，因为获取到的数据都统一存入 vuex 中， 上方 `asyncData` 里面执行的方法就是调用 vuex 的 action, 然后把数据存入的 vuex 的 state 中
                // 所以我们便 store 里面的 state 赋值给 `context.state`
                // 然后 `renderToString` 解析 html 的时候会把 `context.state` 里面的数据 嵌入到 html 的 `window.__INITIAL_STATE__` 变量中
                // 这样我们到时候处理 客户端 的时候，便可以把客户端中 vuex 中的state 替换成 `window.__INITIAL_STATE__` 中的数据,来完成客户端与服务端的数据统一
                context.state = store.state;
                resolve(app)
            }).catch(reject)

        })

    })
}