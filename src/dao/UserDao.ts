import { isNotEmpty } from '../common'
import Userinfo from '../model/userinfo'
import BaseDao from './BaseDao'

class UserDao {
  constructor() {
    console.log('创建UserDao....')
  }
  static userDao: UserDao = new UserDao()
  // 查询用户信息
  findUserinfo(username: string, psw: string) {
    let sql = 'select * from userinfo where 1=1'
    if (isNotEmpty(username)) {
      sql += ` and username='${username}'`
    }
    if (isNotEmpty(psw)) {
      sql += ` and psw='${psw}'`
    }

    return BaseDao.query<Userinfo[]>(sql)
  }
}

export default UserDao.userDao
