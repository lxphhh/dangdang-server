import koa, { Context } from 'koa'
import { fail } from './ResResult'

const globalException = async (ctx: Context, next: koa.Next) => {
  try {
    await next()
  } catch (err: any) {
    const errresult = err as { message: string }
    ctx.body = fail(`服务器错误,${errresult.message}`)
  }
}

export default globalException
