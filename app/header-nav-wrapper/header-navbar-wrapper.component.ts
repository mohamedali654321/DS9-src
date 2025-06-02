import { AsyncPipe, NgClass } from "@angular/common";
import { Component, HostListener, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { ThemedHeaderComponent } from "../header/themed-header.component";
import { ThemedNavbarComponent } from "../navbar/themed-navbar.component";
import {
  HostWindowService,
  WidthCategory,
} from "../shared/host-window.service";
import { MenuService } from "../shared/menu/menu.service";
import { MenuID } from "../shared/menu/menu-id.model";
import { LocaleService } from "../core/locale/locale.service";

/**
 * This component represents a wrapper for the horizontal navbar and the header
 */
@Component({
  selector: "ds-base-header-navbar-wrapper",
  styleUrls: ["header-navbar-wrapper.component.scss"],
  templateUrl: "header-navbar-wrapper.component.html",
  standalone: true,
  imports: [AsyncPipe, NgClass, ThemedHeaderComponent, ThemedNavbarComponent],
})
export class HeaderNavbarWrapperComponent implements OnInit {
  public isNavBarCollapsed$: Observable<boolean>;
  public isMobile$: Observable<boolean>;
  handleScroll = new BehaviorSubject<boolean>(false);
  topPosToStartShowing = 50;

  menuID = MenuID.PUBLIC;
  maxMobileWidth = WidthCategory.SM;

  constructor(
    private menuService: MenuService,
    protected windowService: HostWindowService,
    public localeService: LocaleService
  ) {}

  ngOnInit(): void {
    this.isMobile$ = this.windowService.isUpTo(this.maxMobileWidth);
    this.isNavBarCollapsed$ = this.menuService.isMenuCollapsed(this.menuID);
  }

  @HostListener("window:scroll")
  checkScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (scrollPosition > this.topPosToStartShowing) {
      this.handleScroll.next(true);
    } else {
      this.handleScroll.next(false);
    }
  }
}
