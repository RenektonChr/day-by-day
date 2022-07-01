// 函数防抖
// 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时

function debounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn();
    }, delay);
  }
}


// 函数节流
// 函数防抖关注一定时间连续触发的事件只在最后执行一次，而函数节流侧重于一段时间内只执行一次。
function throttle(fn, delay) {
  const previous = Date.now();

  return function () {
    const now = Date.now();
    if (now - previous > delay) {
      fn.apply(this, arguments);
      previous = now;
    }
  }
}
