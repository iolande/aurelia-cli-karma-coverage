export class App {
  constructor() {
    this.message = 'Hello World!';
  }

  // some extra code to check the coverage task is working :)
  doSomething(params = {}) {
    if (!!params.id) {
      return true;
    }

    return false;
  }
}
