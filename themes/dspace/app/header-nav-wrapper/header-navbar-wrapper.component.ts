import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ThemedHeaderComponent } from '../../../../app/header/themed-header.component';
import { HeaderNavbarWrapperComponent as BaseComponent } from '../../../../app/header-nav-wrapper/header-navbar-wrapper.component';
import { ThemedNavbarComponent } from '../../../../app/navbar/themed-navbar.component';
import { slideMobileNav } from '../../../../app/shared/animations/slide';

/**
 * This component represents a wrapper for the horizontal navbar and the header
 */
@Component({
  selector: 'ds-themed-header-navbar-wrapper',
  styleUrls: ['header-navbar-wrapper.component.scss'],
  templateUrl: 'header-navbar-wrapper.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    ThemedHeaderComponent,
    ThemedNavbarComponent,
    TranslateModule,
    NgIf
  ],
  animations: [slideMobileNav],
})
export class HeaderNavbarWrapperComponent extends BaseComponent {
lang: boolean = this.localeService.getCurrentLanguageCode() === 'ar' ? true : false; //kware-edit

}
