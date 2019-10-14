import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule
} from '@angular/material';

const modules = [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule
];

@NgModule({
    imports: modules,
    exports: modules,
})
export class MaterialModule{}
