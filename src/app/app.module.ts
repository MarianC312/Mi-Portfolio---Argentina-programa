import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componente/header/header.component';
import { BannerComponent } from './componente/banner/banner.component';
import { LoginComponent } from './componente/login/login.component';
import { PortfolioComponent } from './componente/portfolio/portfolio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ExperienciaComponent } from './componente/experiencia/experiencia.component';
import { CardComponent } from './componente/experiencia/card/card.component';
import { SobremiComponent } from './componente/sobremi/sobremi.component';
import { TituloComponent } from './componente/titulo/titulo.component';
import { EducacionComponent } from './componente/educacion/educacion.component';
import { SkillComponent } from './componente/skill/skill.component';
import { ProyectoComponent } from './componente/proyecto/proyecto.component';
import { NuevaExperienciaComponent } from './componente/experiencia/nueva-experiencia/nueva-experiencia.component';
import { PersonaComponent } from './componente/persona/persona.component';
import { AptitudComponent } from './componente/sobremi/aptitud/aptitud.component';
import { EducacionContainerComponent } from './componente/educacion/educacion-container/educacion-container.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HabilidadComponent } from './componente/skill/habilidad/habilidad.component';
import { ProyectoCardComponent } from './componente/proyecto/proyecto-card/proyecto-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    LoginComponent,
    PortfolioComponent,
    ExperienciaComponent,
    CardComponent,
    SobremiComponent,
    TituloComponent,
    EducacionComponent,
    SkillComponent,
    ProyectoComponent,
    NuevaExperienciaComponent,
    PersonaComponent,
    AptitudComponent,
    EducacionContainerComponent,
    HabilidadComponent,
    ProyectoCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 20,
      innerStrokeWidth: 2,
      outerStrokeColor: "#F05D23",
      innerStrokeColor: "#2E313C",
      animationDuration: 300,
      maxPercent: 100,
      showTitle: true,
      showSubtitle: true,
      showUnits: false,
      imageHeight: 80,
      imageWidth: 80,
      lazy: true,
      unitsFontSize: "12",
      titleFontSize: "22",
      titleFontWeight: "bold",
      subtitleFontSize: "14",
      titleColor: "#F05D23"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
