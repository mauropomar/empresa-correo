import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/layout/home/home.component';
import {CargosComponent} from './components/cargos/cargos.component';
import {CargoComponent} from './components/cargos/cargo.component';
import {ActividadesComponent} from "./components/actividades/actividades.component";
import {ActividadComponent} from "./components/actividades/actividad.component";
import {TrabajadoresComponent} from "./components/trabajadores/trabajadores.component";
import {TrabajadorComponent} from "./components/trabajadores/trabajador.component";
import {AccidentesComponent} from "./components/accidentes/accidentes.component";
import {AccidenteComponent} from "./components/accidentes/accidente.component";


const routes: Routes = [
  {path: '', component: HomeComponent, data: {title: 'Inicio'}},
  {path: 'login', component: LoginComponent},
  {path: 'cargos', component: CargosComponent, data: {title: 'Cargos'}},
  {path: 'cargo/nuevo', component: CargoComponent, data: {title: 'Nuevo Cargo'}},
  {path: 'cargo/:id', component: CargoComponent, data: {title: 'Editar Cargo'}},
  {path: 'actividades', component: ActividadesComponent, data: {title: 'Actividades'}},
  {path: 'actividad/nuevo', component: ActividadComponent, data: {title: 'Nueva Actividad'}},
  {path: 'actividad/:id', component: ActividadComponent, data: {title: 'Editar Actividad'}},
  {path: 'trabajadores', component: TrabajadoresComponent, data: {title: 'Trabajadores'}},
  {path: 'trabajador/nuevo', component: TrabajadorComponent, data: {title: 'Nuevo Trabajador'}},
  {path: 'trabajador/:id', component: TrabajadorComponent, data: {title: 'Editar Trabajador'}},
  {path: 'accidentes', component: AccidentesComponent, data: {title: 'Accidentes'}},
  {path: 'accidente/nuevo', component: AccidenteComponent, data: {title: 'Nuevo Accidente'}},
  {path: 'accidente/:id', component: AccidenteComponent, data: {title: 'Editar Accidente'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
