import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';
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
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

//Pipes
import {NoimagePipe} from './pipes/noimage.pipe';
import {DomseguroPipe} from './pipes/domseguro.pipe';
import {FechaformatPipe} from "./pipes/fechaformat.pipe";


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
import { AccidentesComponent } from './components/accidentes/accidentes.component';
import { AccidenteComponent } from './components/accidentes/accidente.component';
import { CombotiposComponent } from './components/genericos/tipos-accidentes/combotipos/combotipos.component';
import { CombocausasComponent } from './components/genericos/causas/combocausas/combocausas.component'
import { CargoActividadesComponent } from './components/accidentes/cargo-actividades.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { TablaReportesComponent } from './components/reportes/tabla-reportes.component';
import { FormReportesComponent } from './components/reportes/form-reportes.component';


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
    FechaformatPipe,
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
    PaginatedComponent,
    AccidentesComponent,
    AccidenteComponent,
    CombotiposComponent,
    CombocausasComponent,
    CargoActividadesComponent,
    ReportesComponent,
    TablaReportesComponent,
    FormReportesComponent,
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
    NgxSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  providers: [GlobalesService, {
    provide:LOCALE_ID, useValue:"es"
  }],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDeleteComponent
  ]
})
export class AppModule {

}


