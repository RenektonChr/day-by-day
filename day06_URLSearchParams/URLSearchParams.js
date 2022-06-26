class MyURLSearchParams {
  /**
   * @params {string} init
   */
  constructor(init) {
    const match = init.replace(/^.*\?/, '');

    const list  = match.split('&').map(item => item.split('='));

    this.paramsMap = new Map();

    for (const [key, value] of list) {
      this.append(key, value);
    }
  }

  /** 
   * @params {string} name
   * @params {any} value
   */
  append(name, value) {
    if(this.paramsMap.has(name)) {
      this.paramsMap.set(name, [...this.paramsMap.get(name), String(value)]);
    }else {
      this.paramsMap.set(name, [String(value)]);
    }
  }

  /**
   * @params {string} name
   */
  delete(name) {
    this.paramsMap.delete(name);
  }

  /**
   * @returns {Iterator} 
   */
  *entries() {
    for (const [key, values] of this.paramsMap) {
      for (const value of values) {
        yield [key, value]
      }
    }
  }


  /**
   * @param {(value, key) => void} callback
   */
  forEach(callback) {
    for (const [key, values] of this.paramsMap) {
      for (const value of values) {
        callback(value, key);
      }
    }
  }

  /**
   * @param {string} name
   * returns the first value of the name
   */
  get(name) {
    const paramsItem = this.paramsMap.get(name.replace(/^.*\?/, ''));
    if(paramsItem) {
      return paramsItem[0];
    }

    return null;
  }

  /**
   * @param {string} name
   * @return {string[]}
   * returns the value list of the name
   */
  getAll(name) {
    const paramsItem = this.paramsMap.get(name);
    if(paramsItem) {
      return paramsItem;
    }

    return [];
  }

  /**
   * @params {string} name
   * @return {boolean}
   */
  has(name) {
    return this.paramsMap.has(name);
  }

  /**
   * @return {Iterator}
   */
  keys() {
    return this.paramsMap.keys();
  }

  /**
   * @param {string} name
   * @param {any} value
   */
  set(name, value) {
    this.paramsMap.set(name, [String(value)]);
  }

  // sor all key/value pairs based on the keys
  sort() {
    const sortedEntries = [...this.paramsMap].sort((a, b) => a[0] < b[0] ? -1 : 1);

    this.paramsMap = new Map(sortedEntries)
  }

  /**
   * @return {string}
   */
  toString() {
    let str = '';
    for (const [key, value] of this.paramsMap) {
      value.forEach(v => {
        str += `${key}=${v}&`;
      });
    }

    return str.substring(0, str.length - 1);
  }

  /**
   * @return {Iterator} values
   */
  *values() {
    const entries = this.entries();
    let value;
    while (value = entries.next().value) {
      yield value[1]
    }
  }
}
