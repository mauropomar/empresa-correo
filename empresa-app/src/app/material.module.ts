import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common'




import {
  MatButtonModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatToolbarModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatListModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatMenuModule,
  MatGridListModule,
  MatSidenavModule,
  MatDialogModule,
  MatSelectModule,
  MatPaginatorModule,
  MatSortModule,
  MatTabsModule,

  } from '@angular/material';


const modules = [
  CommonModule,
  MatFormFieldModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatToolbarModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatMenuModule,
  MatGridListModule,
  MatSidenavModule,
  MatListModule,
  MatTableModule,
  MatDialogModule,
  MatPaginatorModule,
  MatSortModule,
  MatSelectModule,
  MatTabsModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {
}
