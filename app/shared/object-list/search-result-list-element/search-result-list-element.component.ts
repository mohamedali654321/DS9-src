import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';

import {
  APP_CONFIG,
  AppConfig,
} from '../../../../config/app-config.interface';
import { DSONameService } from '../../../core/breadcrumbs/dso-name.service';
import { DSpaceObject } from '../../../core/shared/dspace-object.model';
import { Metadata } from '../../../core/shared/metadata.utils';
import { hasValue } from '../../empty.util';
import { AbstractListableElementComponent } from '../../object-collection/shared/object-collection-element/abstract-listable-element.component';
import { SearchResult } from '../../search/models/search-result.model';
import { TruncatableService } from '../../truncatable/truncatable.service';
import { LinkService } from 'src/app/core/cache/builders/link.service';

@Component({
  selector: 'ds-search-result-list-element',
  template: ``,
  standalone: true,
})
export class SearchResultListElementComponent<T extends SearchResult<K>, K extends DSpaceObject> extends AbstractListableElementComponent<T> implements OnInit {
  /**
   * The DSpaceObject of the search result
   */
  dso: K;
  dsoTitle: string;


    authors = [];
  keywords = [];  //subject
  publicationRelation=[];
   //kware-edit check locale
   localeAr: boolean;
   localeEn: boolean;
   arabicLang: boolean;
   englishLang: boolean;
    isRelationshipPage:boolean;

  public constructor(protected truncatableService: TruncatableService,
                     public dsoNameService: DSONameService,
                     protected linkService: LinkService, //kware-edit
                     @Inject(APP_CONFIG) protected appConfig?: AppConfig) {
    super(dsoNameService);
  }

  /**
   * Retrieve the dso from the search result
   */
  ngOnInit(): void {
    if (hasValue(this.object)) {
      this.dso = this.object.indexableObject;
      this.dsoTitle = this.dsoNameService.getHitHighlights(this.object, this.dso);
      this.isRelationshipPage= document.URL.includes('/edit/relationships') ? true:false;

    }

         let  arabic = /[\u0600-\u06FF]/;
         let english = /[a-zA-Z]/;
         let arabicKeyswords = this.dso.allMetadataValues('dc.subject').filter(key=>arabic.test(key));
         let englishKeywords = this.dso.allMetadataValues('dc.subject').filter(key=>english.test(key));
         (typeof window === 'object' && hasValue(window.localStorage)) && window.localStorage.getItem('selectedLangCode')  === 'ar' ? this.keywords = arabicKeyswords : this.keywords = englishKeywords;
         // kware-edit replace title ith alternative-title of items based on langugae
    
         this.localeAr = (typeof window === 'object' && hasValue(window.localStorage)) && window.localStorage.getItem('selectedLangCode')  === 'ar';
         this.localeEn = (typeof window === 'object' && hasValue(window.localStorage)) && window.localStorage.getItem('selectedLangCode')  === 'en';
         this.arabicLang = this.dso.firstMetadataValue('dc.language.iso') === 'Arabic | العربية';
         this.englishLang = this.dso.firstMetadataValue('dc.language.iso') === 'English | الإنجليزية';
  }

  /**
   * Gets all matching metadata string values from hitHighlights or dso metadata.
   *
   * @param {string|string[]} keyOrKeys The metadata key(s) in scope. Wildcards are supported; see [[Metadata]].
   * @returns {string[]} the matching string values or an empty array.
   */
  allMetadataValues(keyOrKeys: string | string[]): string[] {
    const dsoMetadata: string[] = Metadata.allValues([this.dso.metadata], keyOrKeys);
    const highlights: string[] = Metadata.allValues([this.object.hitHighlights], keyOrKeys);
    const removedHighlights: string[] = highlights.map(str => str.replace(/<\/?em>/g, ''));
    for (let i = 0; i < removedHighlights.length; i++) {
      const index = dsoMetadata.indexOf(removedHighlights[i]);
      if (index !== -1) {
        dsoMetadata[index] = highlights[i];
      }
    }
    return dsoMetadata;
  }

  /**
   * Gets the first matching metadata string value from hitHighlights or dso metadata, preferring hitHighlights.
   *
   * @param {string|string[]} keyOrKeys The metadata key(s) in scope. Wildcards are supported; see [[Metadata]].
   * @returns {string} the first matching string value, or `undefined`.
   */
  firstMetadataValue(keyOrKeys: string | string[]): string {
    return Metadata.firstValue([this.object.hitHighlights, this.dso.metadata], keyOrKeys);
  }

  /**
   * Emits if the list element is currently collapsed or not
   */
  isCollapsed(): Observable<boolean> {
    return this.truncatableService.isCollapsed(this.dso.id);
  }

    translateDate():any{
    let date=new Date(this.dso.firstMetadataValue('dc.date.accessioned').split('T')[0]);
   if(date && (typeof window === 'object' && hasValue(window.localStorage)) && window.localStorage.getItem('selectedLangCode')  === 'ar'){
     var months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
     "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
   ];
   var delDateString =date.getDate() + ' ' + months[date.getMonth()] + '، ' + date.getFullYear(); 
   
   return delDateString;
   }
   else return null;
   
     }

}
