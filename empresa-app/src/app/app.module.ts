import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material.module";
//Pipes
import {NoimagePipe} from './pipes/noimage.pipe';
import {DomseguroPipe} from './pipes/domseguro.pipe';
//components

import {ConfirmDeleteComponent} from './components/genericos/dialog/confirm-delete/confirm-delete.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HeaderComponent} from './components/layout/header/header.component';
import {FooterComponent} from './components/layout/footer/footer.component';
import {HomeComponent} from './components/layout/home/home.component';
import {SidenavComponent} from './components/layout/sidenav/sidenav.component';
import {CargosComponent} from './components/cargos/cargos.component';
import {CargoComponent} from './components/cargos/cargo.component';

//services
import { ConstantesService } from "./services/constantes.service";
import { LoadingComponent } from './components/genericos/loading/loading.component';

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
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [ConstantesService],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDeleteComponent
  ]
})
export class AppModule {
}
