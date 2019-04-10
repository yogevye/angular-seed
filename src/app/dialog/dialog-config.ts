const uuidv1 = require('uuid/v1');

export class DialogConfig<D = any> {
  id: string;
  data?: D;

  constructor(data?: D) {
    this.id = uuidv1();
    this.data = data;
  }
}
