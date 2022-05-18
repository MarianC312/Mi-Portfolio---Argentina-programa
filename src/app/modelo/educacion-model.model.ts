import { PersonaModel } from "./persona-model.model";

export class EducacionModel {
    constructor(
      public id?: number,
      public titulo?: string,
      public periodo?: string,
      public descripcion?: string,
      public persona?: PersonaModel
    ){}
}
