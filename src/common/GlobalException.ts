import koa, { Context } from 'koa'
import { fail } from './ResResult'
import logger from './LogUtils'

const globalException = async (ctx: Context, next: koa.Next) => {
  logger.info('全局异常处理中间件开始....')
  try {
    await next()
  } catch (err: any) {
    const errresult = err as { message: string }
    ctx.body = fail(`服务器错误,${errresult.message}`)
  }
}

export default globalException
