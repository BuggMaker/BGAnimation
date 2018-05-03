//*********** Utils
const PI = Math.PI,
  PI_2 = 2 * PI;
/**
 * 随机数
 * @param {Number} min
 * @param {Number} max 最大值
 */
function random(min = 0, max = 1, round = true) {
  if (round) return Math.round(Math.random() * (max - min) + min);
  else return Math.random() * (max - min) + min;
}

/**
 * 计算两点距离
 * @param {Array} from 起点
 * @param {Array} to 终点
 */
function distance(from = [0, 0], to = [0, 0]) {
  const disX = from[0] - to[0],
    dsiY = from[1] - to[1];

  return Math.sqrt(disX * disX + dsiY * dsiY);
}
/**
 * 合并属性
 */
function merage(target, source) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const element = source[key];
      target[key] = element;
    }
  }
}

/**
 * 定义属性
 * @param {Object} target 目标对象
 * @param {String} key 属性名
 */
function defProp(target) {
  return function(key, defaultValue, config) {
    let value = defaultValue;
    Object.defineProperty(target, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        if (config.gettter) {
          const rel = config.gettter(value);
          return rel || value;
        }
        return value;
      },
      set: nVal => {
        config.setter
          ? (() => {
              const rel = config.setter(nVal);
              value = rel ? rel : nVal;
            })()
          : (() => {
              throw `Property '${key}' of ${target.toString()} can't be changed!`;
            })();
      }
    });
  };
}

export { PI, PI_2, distance, merage, defProp, random };
