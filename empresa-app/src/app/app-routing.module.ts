import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './components/login/login.component';
import { HomeComponent} from './components/layout/home/home.component';
import { CargosComponent} from './components/cargos/cargos.component';
import { CargoComponent} from './components/cargos/cargo.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    {path : 'login', component : LoginComponent},
    {path : 'cargos', component : CargosComponent},
    {path : 'cargo/:id', component : CargoComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
