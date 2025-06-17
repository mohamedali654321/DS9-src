import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';
import * as Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root',
})

export class SharedVariableService {


private fileURL = new Subject<string>();

private fileRestrictedURL = new Subject<string>();

private specializations = new BehaviorSubject([]);

private orgunit_type = new BehaviorSubject('');

private childOrgunit_type = new BehaviorSubject('');

private mainAdministrationType = new BehaviorSubject('');

private mainCollege = new BehaviorSubject('');

public entityTypes = new BehaviorSubject([]);

currentSpecializations = this.specializations.asObservable();

currentOrgunit_type = this.orgunit_type.asObservable();

currentChildOrgunit_type = this.childOrgunit_type.asObservable();

currentMainAdministrationType = this.mainAdministrationType.asObservable();

currentMainCollege = this.mainCollege.asObservable();

currentEntityTypes = this.entityTypes.asObservable();

private college = new BehaviorSubject('');

currentCollege = this.college.asObservable();


ngOnDestroy(): void {
  return null;

}

setSpecializations (specializations: any) {
  this.specializations.next(specializations);
}


setOrgunit_type (orgunit_type: any) {
  this.orgunit_type.next(orgunit_type);
}

setChildOrgunit_type (orgunit_child_type: any) {
  this.childOrgunit_type.next(orgunit_child_type);
}

setMainAdministrationType (mainAdministrationType: any) {
  this.mainAdministrationType.next(mainAdministrationType);
}

setMainCollege (mainCollege: any) {
  this.mainCollege.next(mainCollege);
}


setEntityTypes (entityTypes: any) {
  this.entityTypes.next(entityTypes);
}


setCollege (college: any) {
  this.college.next(college);
}

  /*
   * @return {Observable<string>} : siblingMsg
   */
  public getMessage(): Observable<string> {
    return this.fileURL.asObservable();
  }
  /*
   * @param {string} message : siblingMsg
   */
  public updateMessage(message: string): void {
    this.fileURL.next(message);
  }


    /*
   * @return {Observable<string>} : siblingMsg
   */
    public getRestrictedMessage(): Observable<string> {
      return this.fileRestrictedURL.asObservable();
    }
    /*
     * @param {string} message : siblingMsg
     */
    public updateRestrictedMessage(message: string): void {
      this.fileRestrictedURL.next(message);
    }



}
