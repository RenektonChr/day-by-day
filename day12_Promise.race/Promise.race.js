// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race

// Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个 promise 解决或拒绝，返回的 promise 就会解决或拒绝。

function race(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      promise.then(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      })
    });
  })
}