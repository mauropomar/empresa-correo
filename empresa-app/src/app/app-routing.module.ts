import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './components/login/login.component';
import { HomeComponent} from './components/layout/home/home.component';
import { CargosComponent} from './components/cargos/cargos.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    {path : 'login', component : LoginComponent},
    {path : 'cargos', component : CargosComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
