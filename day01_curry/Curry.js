// 手写函数柯里化——Curry

const sum = (a, b, c) => {
  return a + b + c;
}

const curry = (func) => {
  return function curried(...args) {
    if(args.length >= func.length) {
      return func.apply(this, args);
    }else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  }
}

const curriedSum = curry(sum);

console.log(curriedSum(1,2,3));

console.log(curriedSum(1)(2)(3));

console.log(curriedSum(1)(2,3));
