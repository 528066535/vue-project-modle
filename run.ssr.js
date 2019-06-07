// server.js
const path = require('path');
const Koa = require("koa");
const app = new Koa();

const koaStatic = require('koa-static');
const resolve = file => path.resolve(__dirname, file);
// 开放dist目录
app.use(koaStatic(resolve('./dist')));


const { createBundleRenderer } = require('vue-server-renderer');
// 第 2 步：创建一个 renderer
const clientManifest = require('./dist/manifest.json');
const bundle = require("./dist/vue-ssr-server-bundle.json");
const renderer = createBundleRenderer(bundle,{
    runInNewContext: false, // 推荐
    // template: require('fs').readFileSync('./src/resource/template/ssr.html', 'utf-8'),
    clientManifest: clientManifest
})


// 第 3 步：添加一个中间件来处理所有请求
app.use(async (ctx, next) => {
    // const vm = new Vue({
    //     data: {
    //         title: "ssr example",
    //         url: ctx.url
    //     },
    //     template: `<div>访问的 URL 是： {{ url }}</div>`
    // });
    const context = {
        title: 'hellos',
        url: ctx.url
    };

    // 将 Vue 实例渲染为 HTML
    renderer.renderToString(context, (err, html) => {
        if(err){
            console.log('-----------');
            console.log(err);
            return
        }
        console.log('++++++++++++=');
        console.log(html);
        ctx.body = html;
    });

});

const port = 3002;
app.listen(port, function() {
    console.log(`server started at localhost:${port}`);
});
