import { NgIf, AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DSpaceObjectDataService } from 'src/app/core/data/dspace-object-data.service';
import { FindListOptions } from 'src/app/core/data/find-list-options.model';
import { RelationshipDataService } from 'src/app/core/data/relationship-data.service';
import { RemoteData } from 'src/app/core/data/remote-data';
import { DSpaceObject } from 'src/app/core/shared/dspace-object.model';
import { Item } from 'src/app/core/shared/item.model';
import { getFirstSucceededRemoteDataPayload } from 'src/app/core/shared/operators';
import { KwareTranslatePipe } from '../utils/kware-translate.pipe';

@Component({
  selector: 'ds-publictaion-count',
  templateUrl: './publictaion-count.component.html',
  styleUrls: ['./publictaion-count.component.scss'],
  standalone: true,
  imports: [ NgIf, RouterLink, AsyncPipe, TranslateModule,NgClass,KwareTranslatePipe,NgStyle],
})
export class PublictaionCountComponent {
  @Input() dso: Item;
  publicationRelation = [];
  // data = new BehaviorSubject<any[]>([]);
  data = new BehaviorSubject<any[]>([]);
  issueRelation = new BehaviorSubject<any[]>([]);
  issuesIds = [];
  countLength = new BehaviorSubject<number>(0);
  publicationArray=[]
  issusArray=[]
   relationsCounter= new BehaviorSubject<number>(0);

   options = new FindListOptions();
orgUnitRelations=['isPublicationOfOrgUnit','isPublicationOfPublisher','isPublicationOfArabicPublisher'];
publicationRelations=['isPublicationLinkedTo','isPublicationLinkingTo'];

  constructor(
    protected relationshipService: RelationshipDataService,
    protected dsoService: DSpaceObjectDataService // publication counter
  ) {}
  
  ngOnInit(): void {
   
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    if (
      this.dso.firstMetadataValue('dspace.entity.type') === 'Journal' &&
      this.dso.allMetadataValues('relation.isVolumeOfJournal').length > 0
    ) {
      this.relationshipService.getRelatedItemsByLabel(this.dso ,'isVolumeOfJournal', Object.assign(this.options,
        { elementsPerPage: -1, currentPage: 1, fetchThumbnail: false })).pipe(getFirstSucceededRemoteDataPayload()).subscribe((journal) => {
          journal.page.forEach((volume) => {

            this.relationshipService.getRelatedItemsByLabel(volume ,'isIssueOfJournalVolume', Object.assign(this.options,
              { elementsPerPage: -1, currentPage: 1, fetchThumbnail: false })).pipe(getFirstSucceededRemoteDataPayload()).subscribe((data) => {
                data.page.forEach((issue)=>{
      
                  this.relationshipService.getRelatedItemsByLabel(issue ,'isPublicationOfJournalIssue', Object.assign(this.options,
                    { elementsPerPage: -1, currentPage: 1, fetchThumbnail: false })).pipe(getFirstSucceededRemoteDataPayload()).subscribe(item=>{
                      this.relationsCounter.next(this.relationsCounter.getValue() + item.totalElements)
                    })
      
                })
              })

          })

        })



    } else if (
      this.dso.firstMetadataValue('dspace.entity.type') === 'JournalVolume' &&
      this.dso.allMetadataValues('relation.isIssueOfJournalVolume').length > 0
    ) {

      this.relationshipService.getRelatedItemsByLabel(this.dso ,'isIssueOfJournalVolume', Object.assign(this.options,
        { elementsPerPage: -1, currentPage: 1, fetchThumbnail: false })).pipe(getFirstSucceededRemoteDataPayload()).subscribe((data) => {
          data.page.forEach((issue)=>{

            this.relationshipService.getRelatedItemsByLabel(issue ,'isPublicationOfJournalIssue', Object.assign(this.options,
              { elementsPerPage: -1, currentPage: 1, fetchThumbnail: false })).pipe(getFirstSucceededRemoteDataPayload()).subscribe(item=>{
                this.relationsCounter.next(this.relationsCounter.getValue() + item.totalElements)
              })

          })
        })
    } 
    else if (
      this.dso.firstMetadataValue('dspace.entity.type') === 'JournalIssue' &&
      this.dso.allMetadataValues('relation.isPublicationOfJournalIssue').length > 0
    ) {
      this.relationshipService.getRelatedItemsByLabel(this.dso ,'isPublicationOfJournalIssue', Object.assign(this.options,
        { elementsPerPage: -1, currentPage: 1, fetchThumbnail: false })).pipe(getFirstSucceededRemoteDataPayload()).subscribe(item=>{
          this.relationsCounter.next(item.totalElements)
        })
    }
    else if(
      this.dso.firstMetadataValue('dspace.entity.type') === 'Administration' &&
      this.dso.allMetadataValues('relation.isPublicationOfAdministration').length > 0
    ){
      this.relationshipService.getRelatedItemsByLabel(this.dso ,'isPublicationOfAdministration', Object.assign(this.options,
        { elementsPerPage: -1, currentPage: 1, fetchThumbnail: false })).pipe(getFirstSucceededRemoteDataPayload()).subscribe(item=>{
          this.relationsCounter.next(item.totalElements)
        })
    }
    else if(
      this.dso.firstMetadataValue('dspace.entity.type') === 'Place' &&
      this.dso.allMetadataValues('relation.isPublicationOfPlace').length > 0
    ){
      this.relationshipService.getRelatedItemsByLabel(this.dso ,'isPublicationOfPlace', Object.assign(this.options,
        { elementsPerPage: -1, currentPage: 1, fetchThumbnail: false })).pipe(getFirstSucceededRemoteDataPayload()).subscribe(item=>{
          this.relationsCounter.next(item.totalElements)
        })
    }
    else if(
      this.dso.firstMetadataValue('dspace.entity.type') === 'Site' &&
      this.dso.allMetadataValues('relation.isPublicationOfSite').length > 0
    ){
      this.relationshipService.getRelatedItemsByLabel(this.dso ,'isPublicationOfSite', Object.assign(this.options,
        { elementsPerPage: -1, currentPage: 1, fetchThumbnail: false })).pipe(getFirstSucceededRemoteDataPayload()).subscribe(item=>{
          this.relationsCounter.next(item.totalElements)
        })
    }
    else if(
      this.dso.firstMetadataValue('dspace.entity.type') === 'Event' &&
      this.dso.allMetadataValues('relation.isPublicationOfEvent').length > 0
    ){
      this.relationshipService.getRelatedItemsByLabel(this.dso ,'isPublicationOfEvent', Object.assign(this.options,
        { elementsPerPage: -1, currentPage: 1, fetchThumbnail: false })).pipe(getFirstSucceededRemoteDataPayload()).subscribe(item=>{
          this.relationsCounter.next(item.totalElements)
        })
    }
    else if(
      this.dso.firstMetadataValue('dspace.entity.type') === 'Subject' &&
      this.dso.allMetadataValues('relation.isPublicationOfSubject').length > 0
    ){
      this.relationshipService.getRelatedItemsByLabel(this.dso ,'isPublicationOfSubject', Object.assign(this.options,
        { elementsPerPage: -1, currentPage: 1, fetchThumbnail: false })).pipe(getFirstSucceededRemoteDataPayload()).subscribe(item=>{
          this.relationsCounter.next(item.totalElements)
        })
    }
    else if(
      this.dso.firstMetadataValue('dspace.entity.type') === 'Activity' &&
      this.dso.allMetadataValues('relation.isPublicationOfActivity').length > 0
    ){
      this.relationshipService.getRelatedItemsByLabel(this.dso ,'isPublicationOfActivity', Object.assign(this.options,
        { elementsPerPage: -1, currentPage: 1, fetchThumbnail: false })).pipe(getFirstSucceededRemoteDataPayload()).subscribe(item=>{
          this.relationsCounter.next(item.totalElements)
        })
    }
    else if(
      this.dso.firstMetadataValue('dspace.entity.type') === 'Era' &&
      this.dso.allMetadataValues('relation.isPublicationOfEra').length > 0
    ){
      this.relationshipService.getRelatedItemsByLabel(this.dso ,'isPublicationOfEra', Object.assign(this.options,
        { elementsPerPage: -1, currentPage: 1, fetchThumbnail: false })).pipe(getFirstSucceededRemoteDataPayload()).subscribe(item=>{
          this.relationsCounter.next(item.totalElements)
        })
    }
    else if(
      this.dso.firstMetadataValue('dspace.entity.type') === 'Project' &&
      this.dso.allMetadataValues('relation.isPublicationOfProject').length > 0
    ){
      this.relationshipService.getRelatedItemsByLabel(this.dso ,'isPublicationOfProject', Object.assign(this.options,
        { elementsPerPage: -1, currentPage: 1, fetchThumbnail: false })).pipe(getFirstSucceededRemoteDataPayload()).subscribe(item=>{
          this.relationsCounter.next(item.totalElements)
        })
    }
    else if(
      this.dso.firstMetadataValue('dspace.entity.type') === 'Series' &&
      this.dso.allMetadataValues('relation.isPublicationOfSeries').length > 0
    ){
      this.relationshipService.getRelatedItemsByLabel(this.dso ,'isPublicationOfSeries', Object.assign(this.options,
        { elementsPerPage: -1, currentPage: 1, fetchThumbnail: false })).pipe(getFirstSucceededRemoteDataPayload()).subscribe(item=>{
          this.relationsCounter.next(item.totalElements)
        })
    }

    else if(
      this.dso.firstMetadataValue('dspace.entity.type') === 'Publication' &&
      (this.dso.allMetadataValues('relation.isPublicationLinkingTo').length > 0 || this.dso.allMetadataValues('relation.isPublicationLinkedTo').length > 0) 
    ){
         this.publicationRelations.forEach(relation=>{

        this.relationshipService.getRelatedItemsByLabel(this.dso ,relation, Object.assign(this.options,
          { elementsPerPage: -1, currentPage: 1, fetchThumbnail: false })).pipe(getFirstSucceededRemoteDataPayload()).subscribe(item=>{
            this.relationsCounter.next(this.relationsCounter.getValue()+ item.totalElements)
          })

      })
    }

    else if(
      this.dso.firstMetadataValue('dspace.entity.type') === 'OrgUnit' && (this.dso.allMetadataValues('relation.isPublicationOfOrgUnit').length > 0 || 
      this.dso.allMetadataValues('relation.isPublicationOfPublisher').length > 0 || this.dso.allMetadataValues('relation.isPublicationOfArabicPublisher').length > 0)
      
    ){
      this.orgUnitRelations.forEach(relation=>{

        this.relationshipService.getRelatedItemsByLabel(this.dso ,relation, Object.assign(this.options,
          { elementsPerPage: -1, currentPage: 1, fetchThumbnail: false })).pipe(getFirstSucceededRemoteDataPayload()).subscribe(item=>{
            this.relationsCounter.next(this.relationsCounter.getValue()+ item.totalElements)
          })

      })
    
    }
     else {
      this.relationshipService.getRelatedItems(this.dso).subscribe(res=>{
      

      let arr = res.filter((item)=>{
      return item.metadata['dspace.entity.type'][0].value === 'Publication' 
     })    
       this.relationsCounter.next(arr.length)
      })
    }
   
    this.data.subscribe((res) => {
      this.publicationRelation= this.removeDuplicates(res);
      this.countLength.next(this.publicationRelation.length) ;
    });
  }
  removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}
  
}
