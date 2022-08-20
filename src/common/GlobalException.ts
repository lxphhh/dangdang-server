import koa, { Context } from 'koa'

const globalException = async (ctx: Context, next: koa.Next) => {
  try {
    await next()
  } catch (err: any) {
    const errresult = err as { message: string }
    ctx.body = `服务器错误,${errresult.message}`
  }
}

export default globalException
