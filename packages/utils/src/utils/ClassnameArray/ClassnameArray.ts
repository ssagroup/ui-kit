export class ClassnameArray extends Array<string> {
  toggle(className: string, condition: boolean) {
    const index = this.indexOf(className);
    if (condition) {
      if (index === -1) {
        this.push(className);
      }
    } else {
      if (index > -1) {
        this.splice(index, 1);
      }
    }
    return this;
  }

  clear() {
    this.length = 0;
    return this;
  }
}
