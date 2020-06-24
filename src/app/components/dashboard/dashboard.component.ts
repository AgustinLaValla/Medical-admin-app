import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, getShowProgressBar } from 'src/app/store/app.reducer';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public opened: boolean = false;

  private showProgressBar$ = new Subscription();
  public showProgressBar:boolean = false;

  constructor(
    private authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanatizer: DomSanitizer,
    private store:Store<AppState>
  ) { }

  ngOnInit() {
    this.setIcons();
    this.showProgressBar$ = this.store.select(getShowProgressBar).subscribe(show => this.showProgressBar = show);
  };

  setIcons() {
    this.matIconRegistry.addSvgIcon('logout',this.domSanatizer.bypassSecurityTrustResourceUrl('assets/icons/logout.svg'));
    this.matIconRegistry.addSvgIcon('medical_folders', this.domSanatizer.bypassSecurityTrustResourceUrl('assets/icons/medical_folders.svg'));
  };

  logOut() {
    this.authService.logout();
  };

  ngOnDestroy(): void {
    this.showProgressBar$.unsubscribe();
  };

}

