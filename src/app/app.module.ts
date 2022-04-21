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
    NuevaExperienciaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
