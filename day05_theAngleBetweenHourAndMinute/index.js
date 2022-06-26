// 计算时钟时针和分针的角度
// 原题地址：https://bigfrontend.dev/zh/problem/the-angle-between-hour-hand-and-minute-hand-of-a-clock

/**
 * @param {string} time
 * @returns {number} 
 */
function angle(time) {
  // your code here
  const angleOfHour = 360 / 12; // 时针一小时的角度
  const angleOfMinute = 360 / 12 / 5; // 分针一分钟的角度

  const currentTime = time.trim();
  let [currentHour, currentMinute] = currentTime.split(':').map(Number);

  currentHour = currentHour >= 12? (currentHour - 12): currentHour;
  let minuteAngle = currentMinute * angleOfMinute;
  let hourAngle = currentHour * angleOfHour + (minuteAngle / 360) * angleOfHour;

  let angleBetween = Math.round(Math.abs(minuteAngle - hourAngle));
  angleBetween = angleBetween > 180? (360 - angleBetween): angleBetween;

  console.log(angleBetween)

  return angleBetween;
}

angle('12:00')
// 0

angle('23:30')
// 165
