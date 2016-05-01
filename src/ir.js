/**
 * 9z - IR
 *
 * 完备的亲属关系的中间表示
 *
 * f - 父
 * m - 母
 * & - 配偶
 * % - 同性配偶
 * B/b - 兄弟
 * S/s - 姐妹
 * n - 子
 * d - 女
 * #n - 排行
 */

import * as _ from 'lodash';
import * as L10n from './l10n'

/**
 * 亲属的元数据
 *
 * 格式: [汉语称谓, 是否为男性, 相对辈分, 相对长幼]
 */
const relationshipMetadata = {
  f: ["父", true, 1, NaN],
  m: ["母", false, 1, NaN],
  B: ["兄", true, NaN, 1],
  b: ["弟", true, NaN, -1],
  S: ["姐", false, NaN, 1],
  s: ["妹", false, NaN, -1],
  n: ["子", true, -1, NaN],
  d: ["女", false, -1, NaN],
// TODO 添加同性伴侣支持
  '&h': ["夫", false, NaN, NaN],
  '&w': ["妻", false, NaN, NaN]
};

function ensureInteger(value) {
  if (_.isString(value)) {
    return _.toSafeInteger(value);
  } else {
    return NaN
  }
}

class Relationship {
  /**
   * 从IR构造亲属关系的一个环节
   * @param literal {String} 描述关系的字面值
   * @param ord {Number} 排行, 可以为NaN
   */
  constructor(literal, ord) {
    let meta = relationshipMetadata[literal];
    if (meta === undefined) {
      throw new SyntaxError(`无法解析'${literal}'`);
    }
    [this.appellation, this.isMale, this.generation, this.elder] = meta;
    this.ord = ensureInteger(ord);
  }

  /**
   * @return {String} 返回描述
   */
  toString() {
    return `${L10n.ord(this.ord)}${this.appellation}`
  }
}

class Spouse extends Relationship {
  constructor(paths, literal) {
    // TODO 添加同性伴侣支持
    if (literal === '%') {
      throw new SyntaxError("暂不支持同性伴侣");
    }
    let spouseLiteral = _.last(paths).isMale ? '&w' : '&h';
    super(spouseLiteral, NaN);
  }
}

/**
 * 9z IR
 */
class IR {
  /**
   * @param ir {String}
   */
  constructor(ir) {
    const irRegexS = '(\\w)(#(-?\\d+))?|%|&';
    const irRegex = new RegExp(irRegexS);
    const irRegexG = new RegExp(irRegexS, 'g');
    let xs = ir.match(irRegexG);
    this.pathes = [];
    for (let x of xs) {
      let mx = x.match(irRegex);
      if (mx.input.match(/^\w/)) {
        this.pathes.push(new Relationship(mx[1], mx[3]));
      } else {
        this.pathes.push(new Spouse(this.pathes, mx.input));
      }
    }
  }

  get generation() {
    return _.sumBy(this.pathes, r => r.generation)
  }
  
  get elder() {
    return _.sumBy(this.pathes, r => r.elder)
  }

  toString() {
    return _.map(this.pathes, r => r.toString()).join('-')
  }
}

export {Relationship, IR};
export default IR;
