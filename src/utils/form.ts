export function checkPhone(rule: any, val: number | string, cb: Function) {
  if (typeof val === "string") {
    cb(new Error("请输入您的手机号码"));
  } else if (val.toString().length !== 11) {
    cb(new Error("手机号必须为 11 位"));
  } else {
    cb();
  }
}

export function checkEmail(rule: any, val: string, cb: Function) {
  const reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;

  if (val === "") {
    cb(new Error("请输入您的邮箱"));
  } else if (!reg.test(val)) {
    cb(new Error("请输入正确的邮箱地址"));
  } else {
    cb();
  }
}