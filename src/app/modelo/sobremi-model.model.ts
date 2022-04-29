import { PersonaModel } from "./persona-model.model";

export class SobremiModel {
    constructor(
      public id?: number,
      public icono?: string,
      public titulo?: string,
      public persona?: PersonaModel
    ){}
}
