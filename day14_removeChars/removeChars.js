// https://bigfrontend.dev/zh/problem/remove-characters

/**
 * @param {string} input
 * @returns string
 */
function removeChars(input) {
  // your code here
  let result = '';
  if(input.indexOf('b') !== -1 || input.indexOf('ac') !== -1) {
    result = input.replace(/(b)|(ac)/, '');
    return removeChars(result);
  }else {
    return input;
  }
}

let result = removeChars('ab') // 'a'
console.log(result);
result = removeChars('abc') // ''
console.log(result);
result = removeChars('cabbaabcca') // 'caa'
console.log(result);
