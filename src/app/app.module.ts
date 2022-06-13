import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componente/header/header.component';
import { BannerComponent } from './componente/banner/banner.component';
import { LoginComponent } from './auth/login.component';
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
import { LoadingComponent } from './componente/loading/loading.component';
import { RegistroComponent } from './auth/registro.component';
import { interceptorProvider } from './servicio/interceptor/prod-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { APP_BASE_HREF } from '@angular/common';
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
    ProyectoCardComponent,
    LoadingComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
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
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true
    })
  ],
  providers: [
    interceptorProvider,
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
