import path from 'path'
import fs from 'fs'
import Router from 'koa-router'
import Koa, { Context } from 'koa'
import json from 'koa-json'
import body from 'koa-body'
import globalException from './GlobalException'

// const middleware1 = async (ctx: Context, next: Koa.Next) => {
//   console.log('第一个中间件开始....')
//   await next()
//   console.log('第一个中间件结束....')
// }
// const middleware2 = async (ctx: Context, next: Koa.Next) => {
//   console.log('第二个中间件开始....')
//   await next()
//   console.log('第二个中间件结束....')
// }

/**
 * @description: 用于自动加载路由(单例)
 * @param {string} rootPath 路由根路径
 */
class AllRouterLoader {
  app!: Koa // koa实例
  static allRouterLoader: AllRouterLoader = new AllRouterLoader()
  /**
   * @description: 初始化方法
   * @return void
   */
  init(app: Koa) {
    this.app = app // koa实例
    const rootRouter = this.loadAppRouterWrapper()
    // 全局异常处理,任何请求过来先错误中间件,再路由
    this.app.use(globalException)
    this.app.use(rootRouter.routes())
    // 4.监听
    this.listen()
  }

  // 1.加载文件所有的路由数组
  getFiles(dir: string) {
    // 目录
    return fs.readdirSync(dir)
  }

  // 2.加载所有路由文件的绝对路 径数组
  getAttributeFilePaths() {
    const dir = path.join(process.cwd(), '/src/router')
    const allFiles = this.getFiles(dir)
    const allFullFilePaths: string[] = []
    for (let file of allFiles) {
      const fullFilePath = dir + '/' + file // T1
      allFullFilePaths.push(fullFilePath)
    }
    return allFullFilePaths
  }

  // 3.加载所有的二级路由到一级路由中去
  loadAppRouterWrapper() {
    // 3.0 先获取一级路由
    const rootRouter = this.getRootRouter()
    // 3.1调用获取绝对路径的方法
    const allFullFilePaths = this.getAttributeFilePaths()
    // 3.2调用加载所有二级路由到一级路由的方法
    this.loadAllRouter(allFullFilePaths, rootRouter)
    return rootRouter
  }

  /**
   * 初始化一级路由
   */
  getRootRouter() {
    const rootRouter = new Router()
    rootRouter.prefix('/dang') //为所有的路由访问添加路由前缀/dang，来作为一级路由
    this.app.use(json()) // 对象转json
    this.app.use(body()) // 转body
    return rootRouter
  }

  /**
   * 自定义守卫是否为Router类型
   */
  isRouter(data: any): data is Router {
    return data instanceof Router
  }

  // 获取所有的路由
  loadAllRouter(allFullFilePaths: string[], rootRouter: Router) {
    for (let fullFilePath of allFullFilePaths) {
      const module = require(fullFilePath)
      if (this.isRouter(module)) {
        rootRouter.use(module.routes(), module.allowedMethods())
      }
    }
  }

  // 监听方法
  listen() {
    this.app.listen(3002)
    console.log('server running in 3002')
  }
}

export default AllRouterLoader.allRouterLoader
