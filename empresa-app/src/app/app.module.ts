import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import {MaterialModule} from "./material.module";
import {EcoFabSpeedDialModule} from '@ecodev/fab-speed-dial'
import { NgxLoadingModule } from 'ngx-loading';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from "ngx-spinner";

//Pipes
import {NoimagePipe} from './pipes/noimage.pipe';
import {DomseguroPipe} from './pipes/domseguro.pipe';

//services
import { GlobalesService } from "./services/constantes.service";
//components

import {ConfirmDeleteComponent} from './components/genericos/dialog/confirm-delete/confirm-delete.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HeaderComponent} from './components/layout/header/header.component';
import {FooterComponent} from './components/layout/footer/footer.component';
import {HomeComponent} from './components/layout/home/home.component';
import {SidenavComponent} from './components/layout/sidenav/sidenav.component';
import {CargosComponent} from './components/cargos/cargos.component';
import {CargoComponent} from './components/cargos/cargo.component';
import { LoadingComponent } from './components/genericos/loading/loading.component';
import { FavbuttonComponent } from './components/genericos/favbutton/favbutton.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { ActividadComponent } from './components/actividades/actividad.component';
import { CombocargosComponent } from './components/genericos/cargos/combocargos/combocargos.component';
import { CombosexoComponent } from './components/genericos/combosexo/combosexo.component';
import { SearchComponent } from './components/genericos/search/search.component';
import { TrabajadoresComponent } from './components/trabajadores/trabajadores.component';
import { TrabajadorComponent } from './components/trabajadores/trabajador.component';
import { TablaActividadesComponent } from './components/trabajadores/tabla-actividades.component';
import { ScrollContainerComponent } from './components/genericos/scroll-container/scroll-container.component';
import { PaginatedComponent } from './components/genericos/paginated/paginated.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SidenavComponent,
    NoimagePipe,
    DomseguroPipe,
    CargosComponent,
    CargoComponent,
    ConfirmDeleteComponent,
    LoadingComponent,
    FavbuttonComponent,
    ActividadesComponent,
    ActividadComponent,
    CombocargosComponent,
    CombosexoComponent,
    SearchComponent,
    TrabajadoresComponent,
    TrabajadorComponent,
    TablaActividadesComponent,
    ScrollContainerComponent,
    PaginatedComponent
  ],
  imports: [
    EcoFabSpeedDialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    InfiniteScrollModule,
    NgxSpinnerModule

  ],
  providers: [GlobalesService],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDeleteComponent
  ]
})
export class AppModule {

}


