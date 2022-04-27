import { PersonaModel } from './persona-model.model';
export class ExperienciaModel {
  constructor(
    public id?: number,
    public descripcion?: string,
    public logo?: string,
    public periodo?: string,
    public titulo?: string,
    public persona?: PersonaModel
  ){}
}
