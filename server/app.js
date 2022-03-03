require('dotenv').config()

const Koa = require('koa')
const app = new Koa()
// const views = require('koa-views')
const json = require('koa-json')
const fs= require("fs")

const onerror = require('koa-onerror')
const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')
const rss = require('./modules/rss_maker')
const index = require('./routes/index')
const users = require('./routes/users')
// const msg = require('./routes/msg')
const debug = require('debug')('server:app')
// error handler
onerror(app)

// middlewares
app.use(json())

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))


if (fs.existsSync(__dirname + '/public/app')) {
  app.use(require('koa-static')(__dirname + '/public/app'))
  debug('using static dir: ' + __dirname + '/public/app')
} else {
  app.use(require('koa-static')(__dirname + '/server/public/app/'))
  debug('using static dir: ' + __dirname + '/server/public/app/')
}



// app.use(views(__dirname + '/views', {
//   extension: 'ejs'
// }))

app.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', '*');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200; 
  } else {
    await next();
  }
});

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  let url = ctx.url
  // if(RegExp("/msg/de/*", "g").exec(url) != null){url = '/msg/de/*'}
  // if(RegExp("/msg/en/*", "g").exec(url) != null){url = '/msg/en/*'}
  console.log(`${ctx.method} ${url} - ${ms}ms`)
})

// routes

app.use(users.routes(), users.allowedMethods())
app.use(index.routes(), index.allowedMethods())
// app.use(msg.routes(), msg.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

// start the timer for refreshing cache
rss.timerToRefreshCache()


module.exports = app
