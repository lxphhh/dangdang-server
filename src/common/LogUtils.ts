import log4js from 'log4js'

enum LevelInfo {
  'trace' = 'trace',
  'debug' = 'debug',
  'info' = 'info',
  'warn' = 'warn',
  'error' = 'error',
  'fatal' = 'fatal'
}

// 日志工具--单例模式
class LogUtil {
  static logUtil: LogUtil = new LogUtil()
  logInstance!: log4js.Logger // 日志实例
  // 构造方法私有
  private constructor() {
    // 调用
    this.config()
  }

  config() {
    log4js.configure({
      appenders: {
        console: { type: 'console' },
        debug_file: { type: 'file', filename: 'log4js/debug.log' }
      },
      // 分类
      categories: {
        // 默认debug级别
        default: {
          appenders: ['console', 'debug_file'],
          level: LevelInfo.debug
        },
        info: {
          appenders: ['console'],
          level: LevelInfo.info
        },
        // 警告
        warn: {
          appenders: ['console'],
          level: LevelInfo.warn
        }
      }
    })
  }

  // 获取日志实例等价
  getCategories(level: LevelInfo) {
    this.logInstance = log4js.getLogger(level)
  }

  debug(input: string) {
    this.getCategories(LevelInfo.debug)
    this.logInstance.debug(input) // 输出外部信息
  }

  info(input: string) {
    this.getCategories(LevelInfo.info)
    this.logInstance.info(input)
  }
  warn(input: string) {
    this.getCategories(LevelInfo.warn)
    this.logInstance.warn(input)
  }
}

export default LogUtil.logUtil
