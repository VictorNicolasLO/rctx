export class ContextStore {
  constructor(defaultData) {
    if (defaultData) this.data = defaultData;
  }
  set(data, key) {
    if (!this.data[key]) {
      this.data[key] = {};
    }
    this.data[key] = { ...this.data[key], ...data };
  }
  get(key) {
    if (!this.data[key]) {
      this.data[key] = {};
    }
    return this.data[key];
  }
  data = {};
}
