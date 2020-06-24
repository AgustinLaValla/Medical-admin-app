import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { loadHiddeStatistics } from 'src/app/store/actions';

@Component({
  selector: 'app-estadisticas-y-facturacion',
  templateUrl: './estadisticas-y-facturacion.component.html',
  styleUrls: ['./estadisticas-y-facturacion.component.css']
})
export class EstadisticasYFacturacionComponent implements OnDestroy {

  constructor(private store:Store<AppState>) { }

  ngOnDestroy() {
    this.store.dispatch(loadHiddeStatistics());
  };
};
