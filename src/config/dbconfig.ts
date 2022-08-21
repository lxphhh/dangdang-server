import { isString } from '@/types/typeGuard'

interface DbConConf {
  host: string // 'localhost'
  user: string // 'root'
  password: string // password
  port: number
  database: string
}

// 环境参数
interface EnvConf {
  dev: DbConConf // 开发
  prod: DbConConf // 生产
  // test?: DbConConf // 测试
}

// 数据库初始化配置 单例
class Conf {
  static conf: Conf = new Conf()
  env!: keyof EnvConf // 环境key遍历
  envConfig!: EnvConf
  constructor() {
    // 全局环境变量
    console.log('process.env.NODE_ENV', process.env.NODE_ENV)
    this.env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
    this.initConf()
  }

  // 初始化
  initConf() {
    this.envConfig = {
      dev: {
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: '123456',
        database: 'dangdang'
      },
      prod: {
        host: '121.5.158.223',
        user: 'root',
        port: 3306,
        password: '123456',
        database: 'dangdang'
      }
    }
  }

  // 获取配置
  // 1.不传返回所有配置
  getConfig(): DbConConf
  getConfig(key: keyof DbConConf): DbConConf
  getConfig(key: any = ''): any {
    if (this.isDbConfigKeys(key) && key.length > 0) {
      return this.envConfig[this.env][key]
    } else {
      return this.envConfig[this.env]
    }
  }

  // 更改单个配置
  // setConfig(key: keyof DbConConf): DbConConf

  isDbConfigKeys(key: any): key is keyof DbConConf {
    // 当且仅当key是DbConConf的key时返回true
    return ['host', 'user', 'password', 'port', 'database'].includes(key)
  }
}

export default Conf.conf
