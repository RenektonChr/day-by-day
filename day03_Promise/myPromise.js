/**
 * Promise的三个状态
 * Pending：初始状态  当Promise被创建时，状态为Pending
 * fullled：成功状态  当resolve执行完成时，状态为fulfilled
 * rejected：失败状态 当reject执行完成时，状态为rejected
 */

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(execute) {
    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;

    this.onResolveCAllbacks = [];
    this.onRejectCallbacks = [];

    const resolve = (val) => {
      if(this.status === PENDING) {
        this.status = FULFILLED;
        this.value = val;
        this.onResolveCAllbacks.forEach(fn => {
          fn();
        })
      }
    }

    const reject = (reason) => {
      if(this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectCallbacks.forEach(fn => {
          fn();
        });
      }
    }

    try {
      execute(resolve, reject);
    }catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function'? onFulfilled: value => value;
    onRejected = typeof onRejected === 'function'? onRejected: err => { throw err };
    
    const promise2 = new MyPromise((resolve, reject) => {
      if(this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(x, resolve, reject, promise2);
          }catch(err) {
            reject(err);
          }
        }, 0);
      }
      if(this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(x, resolve, reject, promise2);
          }catch(err) {
            reject(err);
          }
        }, 0);
      }

      if(this.status === PENDING) {
        this.onResolveCAllbacks.push(() => {
          setTimeout(() => {
            try{
              const x = onFulfilled(this.value);
              resolvePromise(x, resolve, reject, promise2);
            }catch(err) {
              reject(err);
            }
          }, 0);
        });
        this.onRejectCallbacks.push(() => {
          setTimeout(() => {
            try{
              const x = onRejected(this.reason);
              resolvePromise(x, resolve, reject, promise2);
            }catch(err) {
              reject(err);
            }
          }, 0);
        })
      }
    });

    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject){
  // 循环引用报错
  if(x === promise2){
    // reject报错
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  // 防止多次调用
  let called;
  // x不是null 且x是对象或者函数
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      // A+规定，声明then = x的then方法
      let then = x.then;
      // 如果then是函数，就默认是promise了
      if (typeof then === 'function') { 
        // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
        then.call(x, y => {
          // 成功和失败只能调用一个
          if (called) return;
          called = true;
          // resolve的结果依旧是promise 那就继续解析
          resolvePromise(promise2, y, resolve, reject);
        }, err => {
          // 成功和失败只能调用一个
          if (called) return;
          called = true;
          reject(err);// 失败了就失败了
        })
      } else {
        resolve(x); // 直接成功即可
      }
    } catch (e) {
      // 也属于失败
      if (called) return;
      called = true;
      // 取then出错了那就不要在继续执行了
      reject(e); 
    }
  } else {
    resolve(x);
  }
}

const myPromise = new MyPromise((resolve, reject) => {
  resolve(200);
}).then((val) => {
  console.log(val)
  return new MyPromise((resolve, reject) => {
    resolve(111)
  })
}).then().then(res => {
  console.log(res);
  return 333
}).then(res => {
  console.log(res);
  return res
});

myPromise.then(res => {
  console.log(res);
});
