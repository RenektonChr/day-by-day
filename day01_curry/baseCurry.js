// 手写函数柯里化——baseCurry

const sum = (a, b, c) => {
  return a + b + c;
}

// 基础版本的函数柯里化
const curry = (func) => {
  return (a) => {
    return (b) => {
      return (c) => {
        return func(a, b, c);
      }
    }
  }
}

const sumCurried = curry(sum);

const result = sumCurried(1)(2)(3);

console.log(result);
