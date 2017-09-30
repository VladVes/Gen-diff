export default class {
  constructor(data, method) {
    this.method = method;
    this.data = data;
  }

  execute() {
    return this.method(this.data);
  }

}
