import 'koa-router'

// env 合并接口
declare module 'koa-router' {
  export interface ParameterizedContext {
    params: any
  }
}
