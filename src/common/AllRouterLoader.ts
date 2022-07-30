import path from 'path'
import fs from 'fs'
/**
 * @description: 用于自动加载路由(单例)
 * @return {*}
 */
class AllRouterLoader {
  static allRouterLoader: AllRouterLoader = new AllRouterLoader()
  /**
   * @description: 初始化方法
   * @return void
   */
  init() {
    this.loadAppRouterWrapper()
    // 4.监听
    this.listen()
  }

  // 加载文件所有的路由数组
  getFiles() {
    // 目录
    const dir = path.join(process.cwd(), '/src/router')
    const allFiles = fs.readdirSync(dir)
    console.log('allFiles', allFiles)
  }

  loadAppRouterWrapper() {}
  listen() {}
}

export default AllRouterLoader.allRouterLoader
