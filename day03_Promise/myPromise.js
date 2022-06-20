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
    this.exception = undefined;

    this.onResolveCAllbacks = [];
    this.onRejectCallbacks = [];

    const resolve = (val) => {
      if(this.status === PENDING) {
        this.status = FULFILLED;
        this.value = val;
        this.onResolveCAllbacks.forEach(fn => {
          fn(val);
        })
      }
    }

    const reject = (reason) => {
      if(this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectCallbacks.forEach(fn => {
          fn(reason);
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
    const promise2 = new MyPromise((resolve, reject) => {
      if(this.status === FULFILLED) {
        
        const x = onFulfilled(this.value);
        if(x instanceof MyPromise) {
          x.then(resolve, reject);
        }else {
          resolve(x);
        }
      }
      if(this.status === REJECTED) {
        onRejected(this.reason);
      }

      if(this.status === PENDING) {
        this.onResolveCAllbacks.push(() => {
          onFulfilled(this.value);
        });
        this.onRejectCallbacks.push(() => {
          onRejected(this.reason);
        })
      }
    });

    return promise2;
  }
}

const myPromise = new MyPromise((resolve, reject) => {
  resolve(200);
}).then((val) => {
  return new MyPromise((resolve, reject) => {
    resolve(111)
  })
}).then(res => {
  console.log(res);
  return 333
}).then(res => {
  console.log(res);
});

myPromise.then(res => {
  console.log(res);
})

console.log(myPromise);
