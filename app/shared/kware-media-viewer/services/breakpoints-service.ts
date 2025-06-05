import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';

export enum Breakpoints {
  'XS' = 'xs',
  'SM' = 'sm',
  'MD' = 'md',
  'LG' = 'lg',
  'XL' = 'xl',
}

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  xsBreakpoint = ['(max-width:575.98px)'];
  smBreakpoint = ['(min-width:576px) and (max-width:767.98px)'];
  mdBreakpoint = ['(min-width:768px) and (max-width:991.98px)'];
  lgBreakpoint = ['(min-width:992px) and (max-width:1199.98px)'];
  xlBreakpoint = '(min-width:1200px)';

  public screenSizeObserver = new BehaviorSubject<Breakpoints[]>([
    Breakpoints.XS,
  ]);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.initObservers();
  }

  private initObservers() {
    this.breakpointObserver
      .observe(this.xsBreakpoint)
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.screenSizeObserver.next([Breakpoints.XS]);
        }
      });
    this.breakpointObserver
      .observe(this.smBreakpoint)
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.screenSizeObserver.next([Breakpoints.XS, Breakpoints.SM]);
        }
      });
    this.breakpointObserver
      .observe(this.mdBreakpoint)
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.screenSizeObserver.next([
            Breakpoints.XS,
            Breakpoints.SM,
            Breakpoints.MD,
          ]);
        }
      });
    this.breakpointObserver
      .observe(this.lgBreakpoint)
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.screenSizeObserver.next([
            Breakpoints.XS,
            Breakpoints.SM,
            Breakpoints.MD,
            Breakpoints.LG,
          ]);
        }
      });
    this.breakpointObserver
      .observe(this.xlBreakpoint)
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.screenSizeObserver.next([
            Breakpoints.XS,
            Breakpoints.SM,
            Breakpoints.MD,
            Breakpoints.LG,
            Breakpoints.XL,
          ]);
        }
      });
  }
}
