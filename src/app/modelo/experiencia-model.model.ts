export class ExperienciaModel {
  constructor(
    public id: bigint,
    public descripcion: string,
    public estado: boolean,
    public logo: string,
    public periodo: string,
    public titulo: string
  ){}
}
