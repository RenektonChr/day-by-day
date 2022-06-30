// 实现一个promise.any方法，可以接受一个promise数组，返回一个promise。
// MDN：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/any
function any(promises) {
  if(promises.length === 0) {
    return Promise.reject(new Error('promises is empty'));
  }

  if(!promises.find(promise => promise instanceof Promise)) {
    return Promise.reject(new Error('promises is not all promise'));
  }

  const promiseLength = promises.length;
  let rejectCount = 0;
  let errors = [];

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise.then(res => {
        resolve(res);
      }, err => {
        rejectCount++;
        errors[index] = err;
        if(index === promiseLength - 1 && rejectCount === promiseLength) {
          reject(new AggregateError('No Promise in Promise.any was resolved', errors));
        }
      })
    });
  });
}