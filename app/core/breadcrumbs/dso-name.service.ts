import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import {
  hasValue,
  isEmpty,
  isNotEmpty,
} from '../../shared/empty.util';
import { DSpaceObject } from '../shared/dspace-object.model';
import { Metadata } from '../shared/metadata.utils';
import { LocaleService } from '../locale/locale.service';

/**
 * Returns a name for a {@link DSpaceObject} based
 * on its render types.
 */
@Injectable({
  providedIn: 'root',
})
export class DSONameService {
  /* kware start edit -- issue.8.0.067
  - Entity configuration
  */

        //kware-edit check locale
        localeAr: boolean;
        localeEn: boolean;
        arabicLang: boolean;
        englishLang: boolean;
        title: string; // kware-edit
        AdministrationName: string; // kware-edit
        OrgUnitName:string // kware-edit
        PlaceName:string // kware-edit
        SiteName:string // kware-edit
        EventName:string // kware-edit
        EraName:string // kware-edit
        ActivityName:string // kware-edit
        SeriesName: string // kware-edit
        ProjectName: string // kware-edit
        result:string;
        resultName:string;
        // kware end edit -- issue.8.0.004

  constructor(private translateService: TranslateService,public localeService: LocaleService) {

  }

  /**
   * Functions to generate the specific names.
   *
   * If this list ever expands it will probably be worth it to
   * refactor this using decorators for specific entity types,
   * or perhaps by using a dedicated model for each entity type
   *
   * With only two exceptions those solutions seem overkill for now.
   */
  private readonly factories = {
    EPerson: (dso: DSpaceObject): string => {
      const firstName = dso.firstMetadataValue('eperson.firstname');
      const lastName = dso.firstMetadataValue('eperson.lastname');
      if (isEmpty(firstName) && isEmpty(lastName)) {
        return this.translateService.instant('dso.name.unnamed');
      } else if (isEmpty(firstName) || isEmpty(lastName)) {
        return this.localeService.getStringByLocale(firstName) || this.localeService.getStringByLocale(lastName);
      } else {
        return `${firstName} ${lastName}`;
      }
    },
    Person: (dso: DSpaceObject): string => {
      const familyName = this.localeService.getStringByLocale(dso.firstMetadataValue('person.familyName')) ;
      const givenName = this.localeService.getStringByLocale(dso.firstMetadataValue('person.givenName'));
      if ((isEmpty(familyName) || isEmpty(givenName)) && isNotEmpty(dso.firstMetadataValue('dspace.object.owner'))) {
        return this.localeService.getStringByLocale(dso.firstMetadataValue('dspace.object.owner')?.split(' null')[0]) || dso.name;
      }
      else if (isEmpty(familyName) || isEmpty(givenName)) {
        return familyName || givenName;
      }else if   ((isEmpty(familyName) && isEmpty(givenName))&& isEmpty(dso.firstMetadataValue('dspace.object.owner'))) {
        return this.localeService.getStringByLocale(dso.firstMetadataValue('dc.title')?.split(' null')[0]) || dso.name;
      } 
       else {
        return this.convertComma(`${familyName}, ${givenName}`);
      }
    },
    OrgUnit: (dso: DSpaceObject): string => {
      return  this.localeService.getStringByLocale(this.firstMetadataValueByLanguage(dso,'organization.legalName'));
    },
    Administration: (dso: DSpaceObject): string => {
      return this.localeService.getStringByLocale(this.firstMetadataValueByLanguage(dso,'organization.childLegalName'));
    },
    Place: (dso: DSpaceObject): string => {
      return this.localeService.getStringByLocale(this.firstMetadataValueByLanguage(dso,'place.legalName'));
    },
    Subject: (dso: DSpaceObject): string => {
      return this.localeService.getStringByLocale(this.firstMetadataValueByLanguage(dso,'subject.title'));
    },
    Event: (dso: DSpaceObject): string => {
      return this.localeService.getStringByLocale(this.firstMetadataValueByLanguage(dso,'event.title'));
    },
    Series: (dso: DSpaceObject): string => {
      return this.localeService.getStringByLocale(this.firstMetadataValueByLanguage(dso,'series.name'));
    },
    Project: (dso: DSpaceObject): string => {
      return this.localeService.getStringByLocale(this.firstMetadataValueByLanguage(dso,'project.name'));
    },
    Site: (dso: DSpaceObject): string => {
      return this.localeService.getStringByLocale(this.firstMetadataValueByLanguage(dso,'place.childLegalName'));
    },
    Activity: (dso: DSpaceObject): string => {
      return this.localeService.getStringByLocale(this.firstMetadataValueByLanguage(dso,'event.childTitle'));
    },
    Era: (dso: DSpaceObject): string => {
      return this.localeService.getStringByLocale(this.firstMetadataValueByLanguage(dso,'era.title'));
    },
    Default: (dso: DSpaceObject): string => {
      // If object doesn't have dc.title metadata use name property
             // kware-edit keywords end
   // kware-edit replace title ith alternative-title of items based on langugae

   this.localeAr = this.localeService.getCurrentLanguageCode() === 'ar';
   this.localeEn = this.localeService.getCurrentLanguageCode()   === 'en';
   this.arabicLang = dso.firstMetadataValue('dc.language.iso') === 'Arabic | العربية';
   this.englishLang = dso.firstMetadataValue('dc.language.iso') === 'English | الإنجليزية';

    switch (true){
        case (this.localeAr && this.arabicLang):
           this.title = this.firstMetadataValueByLanguage(dso,'dc.title');
           break;
         case (this.localeAr && !this.arabicLang && !!dso.firstMetadataValue('dc.title.alternative')  ):
           this.title = this.firstMetadataValueByLanguage(dso,'dc.title.alternative');
           break;
         case (this.localeAr && !this.arabicLang  && !dso.firstMetadataValue('dc.title.alternative') ):
           this.title = this.firstMetadataValueByLanguage(dso,'dc.title');
           break;
         case (this.localeEn && this.englishLang) :
           this.title = this.firstMetadataValueByLanguage(dso,'dc.title');
           break;
          case (this.localeEn && !this.englishLang && !!dso.firstMetadataValue('dc.title.alternative')  ) :
             this.title = this.firstMetadataValueByLanguage(dso,'dc.title.alternative');
             break;
           case (this.localeEn && !this.englishLang && !dso.firstMetadataValue('dc.title.alternative') ) :
             this.title = this.firstMetadataValueByLanguage(dso,'dc.title');
             break;

    }
    //kware-edit end
      return this.localeService.getStringByLocale(dso.firstMetadataValue('dc.title')) || this.localeService.getStringByLocale(dso.name) || this.translateService.instant('dso.name.untitled');
    }
  };

  /**
   * Get the name for the given {@link DSpaceObject}
   *
   * @param dso  The {@link DSpaceObject} you want a name for
   */
  getName(dso: DSpaceObject | undefined): string {
    if (dso) {
      const types = dso.getRenderTypes();
      const match = types
        .filter((type) => typeof type === 'string')
        .find((type: string) => Object.keys(this.factories).includes(type)) as string;

      let name;
      if (hasValue(match)) {
        name = this.factories[match](dso);
      }
      if (isEmpty(name)) {
        name = this.factories.Default(dso);
      }
      return name;
    } else {
      return '';
    }
  }

  /**
   * Gets the Hit highlight
   *
   * @param object
   * @param dso
   *
   * @returns {string} html embedded hit highlight.
   */

  getHitHighlights(object: any, dso: DSpaceObject): string {
    const types = dso.getRenderTypes();
    const entityType = types
      .filter((type) => typeof type === 'string')
      .find((type: string) => (['Person', 'OrgUnit','Administration','Place','Event','Series','Project','Site','Activity','Era','Subject']).includes(type)) as string;
    if (entityType === 'Person') {
      const familyName = this.localeService.getStringByLocale(dso.firstMetadataValue('person.familyName')) ;
      const givenName = this.localeService.getStringByLocale(dso.firstMetadataValue('person.givenName'));
      if ((isEmpty(familyName) || isEmpty(givenName)) && isNotEmpty(dso.firstMetadataValue('dspace.object.owner'))) {
        return this.localeService.getStringByLocale(dso.firstMetadataValue('dspace.object.owner')) || dso.name;
      }
      else if (isEmpty(familyName) || isEmpty(givenName)) {
        return familyName || givenName;
      }else if   ((isEmpty(familyName) && isEmpty(givenName))&& isEmpty(dso.firstMetadataValue('dspace.object.owner'))) {
        return this.localeService.getStringByLocale(dso.firstMetadataValue('dc.title')) || dso.name;
      } 
       else {
        return this.convertComma(`${familyName}, ${givenName}`);
      }
    } else if (entityType === 'OrgUnit') {
      return this.localeService.getStringByLocale(this.firstMetadataValue(object, dso, 'organization.legalName') || this.translateService.instant('dso.name.untitled'));
    }
    else if (entityType === 'Administration') {
      return this.localeService.getStringByLocale(this.firstMetadataValue(object, dso, 'organization.childLegalName') || this.translateService.instant('dso.name.untitled'));
    }
    else if (entityType === 'Place') {
      return this.localeService.getStringByLocale(this.firstMetadataValue(object, dso, 'place.legalName') || this.translateService.instant('dso.name.untitled'));
    }
    else if (entityType === 'Subject') {
      return this.localeService.getStringByLocale(this.firstMetadataValueByLanguage(dso,'subject.title') || this.translateService.instant('dso.name.untitled'));
    }
    else if (entityType === 'Event') {
      return this.localeService.getStringByLocale(this.firstMetadataValue(object, dso, 'event.title') || this.translateService.instant('dso.name.untitled'));
    }
    else if (entityType === 'Series') {
      return this.localeService.getStringByLocale(this.firstMetadataValue(object, dso, 'series.name') || this.translateService.instant('dso.name.untitled'));
    }
    else if (entityType === 'Project') {
      return this.localeService.getStringByLocale(this.firstMetadataValue(object, dso, 'project.name') || this.translateService.instant('dso.name.untitled'));
    }
    else if (entityType === 'Site') {
      return this.localeService.getStringByLocale(this.firstMetadataValue(object, dso, 'place.childLegalName') || this.translateService.instant('dso.name.untitled'));
    }
    else if (entityType === 'Activity') {
      return this.localeService.getStringByLocale(this.firstMetadataValue(object, dso, 'event.childTitle') || this.translateService.instant('dso.name.untitled'));
    }
    else if (entityType === 'Era') {
      return this.localeService.getStringByLocale(this.firstMetadataValue(object, dso, 'era.title') || this.translateService.instant('dso.name.untitled'));
    }
    // return this.firstMetadataValue(object, dso, 'dc.title') || dso.name || this.translateService.instant('dso.name.untitled');
     // If object doesn't have dc.title metadata use name property
             // kware-edit keywords end
   // kware-edit replace title ith alternative-title of items based on langugae

   this.localeAr = this.localeService.getCurrentLanguageCode() === 'ar';
   this.localeEn = this.localeService.getCurrentLanguageCode()   === 'en';
   this.arabicLang = dso.firstMetadataValue('dc.language.iso') === 'Arabic | العربية';
   this.englishLang = dso.firstMetadataValue('dc.language.iso') === 'English | الإنجليزية';

    switch (true){
        case (this.localeAr && this.arabicLang):
           this.title = dso.firstMetadataValue('dc.title');
           break;
         case (this.localeAr && !this.arabicLang && !!dso.firstMetadataValue('dc.title.alternative')  ):
           this.title = dso.firstMetadataValue('dc.title.alternative');
           break;
         case (this.localeAr && !this.arabicLang  && !dso.firstMetadataValue('dc.title.alternative') ):
           this.title = dso.firstMetadataValue('dc.title');
           break;
         case (this.localeEn && this.englishLang) :
           this.title = dso.firstMetadataValue('dc.title');
           break;
          case (this.localeEn && !this.englishLang && !!dso.firstMetadataValue('dc.title.alternative')  ) :
             this.title = dso.firstMetadataValue('dc.title.alternative');
             break;
           case (this.localeEn && !this.englishLang && !dso.firstMetadataValue('dc.title.alternative') ) :
             this.title = dso.firstMetadataValue('dc.title');
             break;

    }
    //kware-edit end
      return this.localeService.getStringByLocale(this.title) || this.localeService.getStringByLocale(dso.name) || this.translateService.instant('dso.name.untitled');
  }


  /**
   * Gets the first matching metadata string value from hitHighlights or dso metadata, preferring hitHighlights.
   *
   * @param object
   * @param dso
   * @param {string|string[]} keyOrKeys The metadata key(s) in scope. Wildcards are supported; see [[Metadata]].
   *
   * @returns {string} the first matching string value, or `undefined`.
   */
  firstMetadataValue(object: any, dso: DSpaceObject, keyOrKeys: string | string[]): string {
    return Metadata.firstValue([object.hitHighlights, dso.metadata], keyOrKeys);
  }

  firstMetadataValueByLanguage( dso: DSpaceObject, keyOrKeys: string | string[]): string{
    dso.allMetadata(keyOrKeys).map(value=>{
      if(value.language !== null && dso.allMetadata(keyOrKeys).length > 1){
     let Md =   dso.allMetadata(keyOrKeys).filter(metdataValue=>{
        return metdataValue.language  === this.localeService.getCurrentLanguageCode()
       })

      this.resultName=Md && Md.length > 0 ? Md[0].value : dso.firstMetadataValue(keyOrKeys);
      }
      else{
        this.resultName= dso.firstMetadataValue(keyOrKeys);
      }
     })  

    return this.resultName;

   }

      // replace comma ', or ;' to '،' if language  is Arabic
      convertComma(str: any){
        let newstr = '';
        if (this.localeService.getCurrentLanguageCode() === 'ar'){
          let regx = /;|,/gi;
         newstr = str?.replace(regx, '،');
         return newstr;
    
        } else {
          return str;
        }
      }
// kware end edit -- issue.8.0.067

}
