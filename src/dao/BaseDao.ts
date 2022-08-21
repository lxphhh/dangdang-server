import dBconfig from '../config/dbconfig'
import mysql, { Connection } from 'mysql'

class BaseDao {
  static baseDao: BaseDao = new BaseDao()
  config!: Connection
  constructor() {
    this.connect()
  }

  async connect() {
    this.config = await mysql.createConnection(dBconfig.getConfig())
    console.log('this.config', this.config)
  }

  async query<T>(sql: string) {
    return new Promise<T>((resolve, reject) => {
      // 可以增删改查
      this.config.query(sql, (err, result: T) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}

export default BaseDao.baseDao
