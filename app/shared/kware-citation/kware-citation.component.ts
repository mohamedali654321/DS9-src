import { Component, Input } from '@angular/core';
import { LocaleService } from 'src/app/core/locale/locale.service';
import { Item } from 'src/app/core/shared/item.model';
import Cite from "citation-js";
import { NgIf, AsyncPipe, NgFor, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ThemedLoadingComponent } from '../loading/themed-loading.component';
require("@citation-js/plugin-bibtex");
require("@citation-js/plugin-ris");
import chicago from "./plugins/chicago.js"
import mla from "./plugins/mla.js"
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'ds-kware-citation',
  standalone: true,
  imports: [   NgIf,
    NgFor,
    NgForOf,
    TranslateModule,
    ThemedLoadingComponent,
    FormsModule,
    AsyncPipe,],
  templateUrl: './kware-citation.component.html',
  styleUrl: './kware-citation.component.scss'
})
export class KwareCitationComponent {
  @Input() object: Item;
  date = new Date();
  constructor(public localeService: LocaleService,protected activeModal: NgbActiveModal,){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCitationOfPublication()
  }

  getCitationOfPublication() :any{
    const authorData = this.object?.allMetadataValues('dc.contributor.author')?.map((author)=>{
      return {
				given: this.convertComma(this.localeService.getStringByLocale((((author?.split(",")[1]))?.split(',undefined')[0])?.split(' null')[0])),
				family: this.convertComma(this.localeService.getStringByLocale((((author?.split(",")[0]))?.split(',undefined')[0])?.split(' null')[0])),
			};
    }) 
    const authorsEntry = authorData.length ? { author: authorData } : {};
    Cite.CSL.register.addTemplate("chicago", chicago)
    Cite.CSL.register.addTemplate("mla", mla)
    const bibliographyData = [
       {
         id: this.object.uuid,
         type: this.localeService.getStringByLocale(this.object?.firstMetadataValue('dc.type')) ,
         title: this.convertComma(this.localeService.getStringByLocale(this.object?.firstMetadataValue('dc.title'))) ,
         DOI: this.object?.firstMetadataValue('dc.identifier.doi'),
         ...authorsEntry,
        //  author: [
        //    {
        //      given: this.localeService.getStringByLocale((((this.object.firstMetadataValue('dc.contributor.author')?.split(",")[1]))?.split(',undefined')[0])?.split(' null')[0]),
        //      family: this.localeService.getStringByLocale((((this.object.firstMetadataValue('dc.contributor.author')?.split(",")[0]))?.split(',undefined')[0])?.split(' null')[0])
        //    }
        //  ],
         issued: { "date-parts": [this.object.firstMetadataValue('dc.date.issued')?.split(/[- :]/)?.map(Number)] },
         "container-title": this.convertComma(this.localeService.getStringByLocale(this.object?.firstMetadataValue('journal.title'))) ,
         volume: this.convertComma(this.localeService.getStringByLocale(this.object?.firstMetadataValue('journalvolume.identifier.name'))) ,
         issue: this.convertComma(this.localeService.getStringByLocale(this.object?.firstMetadataValue('publicationissue.title'))) ,
         publisher: this.convertComma(this.localeService.getStringByLocale(this.object?.firstMetadataValue('dc.publisher')) || this.localeService.getStringByLocale(this.object?.firstMetadataValue('dc.source'))) ,
        //  page: "5441-5444"
       }
     ];
   
     const reference = new Cite(bibliographyData);
   
     const refs = {
      //  Citation: reference.format("citation", {
      //    template: "apa",
         
      //  }),
       APA: reference.format("bibliography", {
         template: "apa",
         
       }),
       Vancouver: reference.format("bibliography", {
         template: "vancouver",
       
       }),
       
       Harvard: reference.format("bibliography", {
         template: "harvard1",
         
       }),
       Chicago: reference.format("bibliography", {
        template: "chicago",
        
      }),
      MLA: reference.format("bibliography", {
        template: "mla",
        
      }),
       RIS: reference.format("ris", {
         
       })
     };
   
   return  Object.entries(refs)
   }
     
   onModalClose() {
    this.activeModal.close();
  }


  copyToClipboard(item) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }


  getCitationLink(citation: string): string {
    switch (true) {
      case citation === 'APA':
        return 'https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_formatting_and_style_guide/general_format.html';
        break;
      case citation === 'Vancouver':
        return 'https://www.scribbr.co.uk/referencing/vancouver-style/';
        break;

      case citation === 'Harvard':
        return 'https://www.scribbr.co.uk/referencing/harvard-style/';
        break;
      case citation === 'Chicago':
        return 'https://www.chicagomanualofstyle.org/tools_citationguide/citation-guide-1.html';
        break;
      case citation === 'MLA':
        return 'https://owl.purdue.edu/owl/research_and_citation/mla_style/mla_formatting_and_style_guide/mla_general_format.html';
        break;
      case citation === 'RIS':
        return 'https://biodiversitylinks.org/projects/completed-projects/cbnrm/help-documents-to-support-group-activities/dec-ris-functionality/ris-and-dec-xml-background-information/what-is-the-ris-reference-format-1';
        break;
      default:
        return;
        break;
    }
  }
  
    // replace comma ', or ;' to '،' if language  is Arabic
    convertComma(str: string): string{
      let newstr = '';
      if (this.localeService.getCurrentLanguageCode() === 'ar'){
        let regx = /;|,/gi;
       newstr = str?.replace(regx, '،');
       return newstr;
  
      } else {
        return str;
      }
    }
  
    // kware end edit -- issue.8.0.021
}
