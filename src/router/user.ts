import { success } from '../common/ResResult'
import { Context } from 'koa'
import Router from 'koa-router'
import logger from '../common/LogUtils'
import Userinfo from '@/model/userinfo'
import userDao from '../dao/UserDao'

const router = new Router()

router.prefix('/usermodule')

router.get('/findUserinfo/:username/:psw', async (ctx: Context) => {
  const { username, psw } = ctx.params
  console.log('执行路由请求findUserinfo开始....')
  const userinfos: Userinfo[] = await userDao.findUserinfo(username, psw)
  console.log('userinfos:', userinfos)
  const dbUserinfo = userinfos[0]
  console.log('userinfos[0]:', userinfos[0])
  ctx.body = success(`欢迎! ${dbUserinfo.psw}`)
})

router.post('/addUser', async (ctx: Context) => {
  const user: Userinfo = ctx.request.body
  // ctx.body = `您好,${user.username},年龄${user.age}`
})

module.exports = router
