import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatDialogModule, MatInputModule, MatCardModule, 
         MatListModule, MatTooltipModule, MatProgressSpinnerModule, MatSelectModule, MatExpansionModule, MatTableModule, 
         MatPaginatorModule, MatSortModule, MatDatepickerModule, MatTabsModule, MatTreeModule, MatSnackBarModule, MatProgressBarModule} from '@angular/material'

const materialComponents = [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatTabsModule,
    MatTreeModule,
    MatSnackBarModule,
    MatProgressBarModule
];


@NgModule({
    imports: [materialComponents],
    exports: [materialComponents],
})
export class MaterialModule { }
