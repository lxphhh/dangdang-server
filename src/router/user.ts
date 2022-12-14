import { success } from '../common/ResResult'
import { Context } from 'koa'
import Router from 'koa-router'
import logger from '../common/LogUtils'

const router = new Router()

router.prefix('/usermodule')

router.get('/findUserinfo/:username', async (ctx: Context) => {
  const { username } = ctx.params
  logger.debug('hhhhhhhhhh')
  ctx.body = success(`${username} 欢迎你`)
})

router.post('/addUser', async (ctx: Context) => {
  const user: UserInfo = ctx.request.body
  ctx.body = `您好,${user.username},年龄${user.age}`
})

interface UserInfo {
  username: string
  psw: string
  age: number
}

module.exports = router
