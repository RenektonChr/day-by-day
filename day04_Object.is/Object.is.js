// 手写Object.is
// MDN Object.is: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is

Object.prototype.myIs = function(a, b) {
  function isNegativeZero(num) {
    return num === 0 && (1 / num < 0);
  }

  if(Number.isNaN(a) && Number.isNaN(b)) {
    return true;
  }

  if(a === 0 && b === 0 && isNegativeZero(a) !== isNegativeZero(b)) {
    return isNegativeZero(a) && isNegativeZero(b);
  }

  if (a === b) {
    return true;
  }

  return false;
}