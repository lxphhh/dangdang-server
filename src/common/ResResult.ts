enum Code {
  SUCESS = 200,
  SERVERERROR = 500
}

export class ResResult {
  static success(data: any = void 0, msg: any = '') {
    const code: Code = Code.SUCESS
    return {
      data,
      msg,
      code
    }
  }
  static fail(msg: any = '') {
    const code: Code = Code.SERVERERROR
    return {
      undefined,
      msg,
      code
    }
  }
}

export let { success, fail } = ResResult
