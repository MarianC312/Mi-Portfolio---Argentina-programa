import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './componente/portfolio/portfolio.component';
import { LoginComponent } from './auth/login.component';
import { NuevaExperienciaComponent } from './componente/experiencia/nueva-experiencia/nueva-experiencia.component';
import { ProdGuardService as guard } from './servicio/guard/prod-guard.service';



const routes: Routes = [
  {path:'portfolio', component: PortfolioComponent},
  {path:'login', component: LoginComponent},
  {path:'portfolio/experiencia/nueva', component: NuevaExperienciaComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}},
  {path:'', redirectTo: 'portfolio', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
