import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

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
    MatProgressSpinnerModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    MatSidenavModule
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
    MatListModule
];

@NgModule({
    imports: modules,
    exports: modules,
})
export class MaterialModule{}
