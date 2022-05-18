import { PersonaModel } from "./persona-model.model";

export class ProyectoModel {
    constructor(
      public id?: number,
      public titulo?: string,
      public descripcion?: string,
      public imagen?: string,
      public url_deploy?: string,
      public url_git?: string,
      public persona?: PersonaModel
    ){}
}
