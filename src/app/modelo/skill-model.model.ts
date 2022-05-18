import { PersonaModel } from "./persona-model.model";

export class SkillModel {
    constructor(
      public id?: number,
      public titulo?: string,
      public imagen?: string,
      public nivel?: number,
      public persona?: PersonaModel
    ){}
}
