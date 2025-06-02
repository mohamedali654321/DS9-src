import { AsyncPipe } from '@angular/common';
import {
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ThemedSearchNavbarComponent } from '../search-navbar/themed-search-navbar.component';
import { ThemedAuthNavMenuComponent } from '../shared/auth-nav-menu/themed-auth-nav-menu.component';
import {
  HostWindowService,
  WidthCategory,
} from '../shared/host-window.service';
import { ImpersonateNavbarComponent } from '../shared/impersonate-navbar/impersonate-navbar.component';
import { ThemedLangSwitchComponent } from '../shared/lang-switch/themed-lang-switch.component';
import { MenuService } from '../shared/menu/menu.service';
import { MenuID } from '../shared/menu/menu-id.model';
import { ContextHelpToggleComponent } from './context-help-toggle/context-help-toggle.component';
import { LocaleService } from '../core/locale/locale.service';

/**
 * Represents the header with the logo and simple navigation
 */
@Component({
  selector: 'ds-base-header',
  styleUrls: ['header.component.scss'],
  templateUrl: 'header.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    ContextHelpToggleComponent,
    ImpersonateNavbarComponent,
    NgbDropdownModule,
    RouterLink,
    ThemedAuthNavMenuComponent,
    ThemedLangSwitchComponent,
    ThemedSearchNavbarComponent,
    TranslateModule,
  ],
})
export class HeaderComponent implements OnInit {
  /**
   * Whether user is authenticated.
   * @type {Observable<string>}
   */
  public isAuthenticated: Observable<boolean>;
  public isMobile$: Observable<boolean>;

  menuID = MenuID.PUBLIC;
  maxMobileWidth = WidthCategory.SM;

  handleScroll = new BehaviorSubject<boolean>(false);
  topPosToStartShowing = 50;
  constructor(
    protected menuService: MenuService,
    protected windowService: HostWindowService,
    public localeService: LocaleService ,
  ) {
  }

  ngOnInit(): void {
    this.isMobile$ = this.windowService.isUpTo(this.maxMobileWidth);
  }

  public toggleNavbar(): void {
    this.menuService.toggleMenu(this.menuID);
  }

    @HostListener('window:scroll')
  checkScroll(){
    const scrollPosition =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;

    if (scrollPosition > this.topPosToStartShowing) {
      this.handleScroll.next(true);    }
    else {
      this.handleScroll.next(false)
    }
  }
}
