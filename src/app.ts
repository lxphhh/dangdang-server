import Koa from 'koa'
// 全自动加载路由
import allRouterLoader from './common/AllRouterLoader'

const app = new Koa()
allRouterLoader.init(app)
