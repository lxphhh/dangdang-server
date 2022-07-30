import Koa from 'koa'
import body from 'koa-body'
import json from 'koa-json'
import Router from 'koa-router'

// 全自动加载路由
import allRouterLoader from './common/AllRouterLoader'
import userRouter from './router/user'

const app = new Koa()

const router = new Router()
router.prefix('/dang') //为所有的路由访问添加路由前缀/dang，来作为一级路由
router.use(json()) // 对象转json
router.use(body()) // 转body

router.use(userRouter.routes(), userRouter.allowedMethods())

router.get('/test', async (ctx: Koa.Context, next: Koa.Next) => {
  ctx.body = '测试页面'
  // !c tx.app.context  全局上下文
})

app.use(router.routes())
app.listen(3000)

console.log('server running in 3000')
