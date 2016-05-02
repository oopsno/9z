import * as _ from 'lodash';

function zhNumber(value) {
  const tens = {
    10: '十',
    100: '百',
    1000: '千'
  };


}

/**
 * 格式化同辈排行
 * 
 * @param value {Number}
 * @returns {String}
 */
function ord(value) {
  if (_.isSafeInteger(value)) {
    switch (value) {
      case 0:
        return '';
      case 1:
        return '长';
      default:
        return zhNumber(value)
    }
  } else {
    return ''
  }
}

export {ord}