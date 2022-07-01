// sum(a, b, c)
// const curriedSum = curry(sum);
// curriedSum(a, b, c)

function curry(fn) {
  return function curried(...args) {
    if (args.lenth >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  }
}