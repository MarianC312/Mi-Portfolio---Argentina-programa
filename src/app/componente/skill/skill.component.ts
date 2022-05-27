import { Component, OnInit, Input } from '@angular/core';
import { SkillModel } from '../../modelo/skill-model.model';
import { SkillServiceService } from '../../servicio/skill-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  skillData?: SkillModel[] = [];
  contentEditable: boolean = false;
  nuevaSkill: boolean = false;
  form:FormGroup;
  loading: boolean = false;
  @Input() isAdmin: boolean = false;

  constructor(private formBuilder: FormBuilder, private skillService: SkillServiceService) { }

  ngOnInit(): void {
    this.loading = true;
    this.skillData = this.skillService.skillData;
    if(!this.skillData?.length){
      this.skillService.fetchSkillData().pipe(
        finalize(() => this.loading = false)
      ).subscribe(() => {
        this.skillData = this.skillService.skillData;
      });
    }
    this.form = this.formBuilder.group(
      {
        titulo:['', [Validators.required,Validators.minLength(3)]],
        nivel:['', [Validators.required,Validators.minLength(1)]],
        imagen:['', []]
      }
    );
  }

  get Titulo() { return this.form.get('titulo'); }
  get Nivel() { return this.form.get('nivel'); }
  get Imagen() { return this.form.get('imagen'); }

  public data() {
    console.log(this.skillData);
  }

  removerHabilidadDelArrego(id: number){
    this.skillData = this.skillData.filter(value => value.id != id);
  }

  eliminarHabilidad(id: number) {
    this.skillService.eliminarSkill(id);
    this.removerHabilidadDelArrego(id);
  }

  editarHabilidad(skill: any): void{
    this.skillService.editarSkill(skill);
    this.contentEditable = false;
  }

  onEnviar(event:Event){
    event.preventDefault;
    let habilidad: SkillModel = {
      titulo: this.form.value.titulo,
      nivel: this.form.value.nivel,
      imagen: this.form.value.imagen
    };
    this.skillService.agregarSkill(habilidad);
  }

}
