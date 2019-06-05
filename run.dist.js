const koa = require('koa');
const path = require('path');
const CONFIG = require('./CONFIG');
const proxy = require('koa-proxies');
const koaStatic = require('koa-static');
const koaEjs = require('koa-ejs');

const app = new koa();

//静态目录过期时间
let originalServe = koaStatic(path.join(__dirname, '/dist'), {
    maxage: 30 * 24 * 60 * 60 * 1000
});
let modifiedServe = function(ctx, next) {
    ctx.path = ctx.path.replace('/dist', '/');
    return originalServe(ctx, next);
};
app.use(modifiedServe);

//ejs模板
koaEjs(app, {
    root: path.join(__dirname),
    layout: null,
    viewExt: 'html',
    cache: false,
    debug: true
});

app.use(proxy('/api', {
    target: CONFIG.API_URL,
    xfwd: true,
    changeOrigin: false,
    rewrite: path => {
        return path.replace('/api/', '/');
    },
    logs: true
}));

app.use(async (ctx)=>{
    await ctx.render('dist/index');
});

app.listen(CONFIG.DISPORT);