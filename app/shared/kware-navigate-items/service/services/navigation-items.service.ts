import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NavigationItemsService {
  resultsRDNavigation$= new BehaviorSubject([]);
  currentResultsRDNavigation$=this.resultsRDNavigation$.asObservable();
  resultRoute$=new BehaviorSubject(null);
  currentResultRoute$=this.resultRoute$.asObservable();

  resultRouteParams$=new BehaviorSubject(null);
  currentResultRouteParams$=this.resultRoute$.asObservable();


  setResultsRDNavigation (results: any) {
    this.resultsRDNavigation$.next(results);
  }

  setResultRoute(url:any){
    this.resultRoute$.next(url);
  }

  setResultRouteParams(params:any){
    this.resultRoute$.next(params);
  }

}
