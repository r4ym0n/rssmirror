const router = require('koa-router')()
const mime = require('mime-types')
const debug = require('debug')('server:routes:index')

const rss_maker = require('../modules/rss_maker')
// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })

// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

router.get('/(.*)', async function (ctx, next) {
  let url = ctx.url
  account = url.split('/')[1]
  ctx.body = await rss_maker.genRssOfAccount(url)
  ctx.response.set("content-type", mime.lookup('xml'));
  
})

module.exports = router
