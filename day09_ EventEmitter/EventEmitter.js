class EventEmitter {
  constructor() {
    //维护一个订阅该对象的map
    //map:  (eventName,[callback...]),key为eventName，value是由相同eventName的回调函数组成的数组
    //key: eventName,value: An array of callback functions with the same eventName
    this.watcher = new Map();
  }
  subscribe(eventName, callback) {
    var watcher=this.watcher;
    if (!watcher.has(eventName)) {
      //eventName不存在，则添加
      //eventName does not exist,add
      watcher.set(eventName, [callback]);
    } else {
      //存在则向对应value里增加callback
      //eventName exists,add callback to the corresponding value
      watcher.set(eventName, [...watcher.get(eventName),callback]);
    }
    return {
      //返回一个包含release方法的对象
      //return an object containing the release method
      release: function () {
        //找到对应的callback，删除
        //find the corresponding callback and delete it
        //此时利用闭包，使用的是第10行的watcher
        //At this point,the Closures is used,and the watcher on line 10 is used
        watcher.get(eventName).map((item,index) => {
          if (item == callback) {
            watcher.get(eventName).splice(index,1);
          } else {
            return item;
          }
        })
      }
    }
  }

  emit(eventName, ...args) {
    if (this.watcher.has(eventName)) {
      //eventName存在则依此调用watcher里的callback
      //if eventName exists,call the callback in watcher accordingly
      this.watcher.get(eventName).forEach(call => {
        call.apply(this, args);
      })
    }
  }
}