// 是否为字符串
export function isString(data: any): data is string {
  return typeof data === 'string'
}
