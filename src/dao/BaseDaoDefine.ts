import dBconfig from '../config/dbconfig'
import mysql, { Connection } from 'mysql'
import { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

class BaseDaoDefine {
  static baseDaoOrm: BaseDaoDefine = new BaseDaoDefine()
  sequelize!: Sequelize
  constructor() {
    this.initSeqConfig('mysql')
  }

  initSeqConfig(dialect: Dialect) {
    let { host, user, password, database, port } = dBconfig.getConfig()
    // 数据库,用户名,密码
    this.sequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect, // 表示是什么类型的数据库,
      define: { timestamps: false, freezeTableName: true } // 不自动添加时间戳
    })
  }
}

export const { sequelize } = BaseDaoDefine.baseDaoOrm
