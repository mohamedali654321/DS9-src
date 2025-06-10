import { Component, Input } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpResponse
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Item } from 'src/app/core/shared/item.model';
import { BehaviorSubject, combineLatest, concatMap, map, Observable, switchMap } from 'rxjs';
import { RelationshipDataService } from 'src/app/core/data/relationship-data.service';
import { FindListOptions } from 'src/app/core/data/find-list-options.model';
import { getAllSucceededRemoteData, getAllSucceededRemoteDataPayload, getFirstCompletedRemoteData, getFirstSucceededRemoteDataPayload, getRemoteDataPayload } from 'src/app/core/shared/operators';
import { NgIf, AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShortNumberPipe } from '../utils/short-number.pipe';
import { LinkService } from 'src/app/core/cache/builders/link.service';
import { followLink } from '../utils/follow-link-config.model';
import { VersionHistoryDataService } from 'src/app/core/data/version-history-data.service';
import { VersionDataService } from 'src/app/core/data/version-data.service';
import { VersionHistory } from 'src/app/core/shared/version-history.model';
import { PaginationService } from 'src/app/core/pagination/pagination.service';
import { PaginationComponentOptions } from '../pagination/pagination-component-options.model';
import { Version } from 'src/app/core/shared/version.model';
import { PaginatedSearchOptions } from '../search/models/paginated-search-options.model';
import { PaginatedList } from 'src/app/core/data/paginated-list.model';
import { FeatureID } from 'src/app/core/data/feature-authorization/feature-id';
import { AuthorizationDataService } from 'src/app/core/data/feature-authorization/authorization-data.service';
import { RemoteData } from 'src/app/core/data/remote-data';
import { hasValue, hasValueOperator } from '../empty.util';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


interface VersionsDTO {
  totalElements: number;
  versionDTOs: VersionDTO[];
}

interface VersionDTO {
  version: Version;
  canEditVersion: Observable<boolean>;
}


@Component({
  selector: 'ds-simple-view-statistics',
  templateUrl: './simple-view-statistics.component.html',
  styleUrls: ['./simple-view-statistics.component.scss'],
  standalone:true,
  imports:[NgIf, AsyncPipe, TranslateModule, ShortNumberPipe,NgbTooltipModule]
})
export class SimpleViewStatisticsComponent {

  @Input() object: Item;
  options = new FindListOptions();
  TotalVisits = new BehaviorSubject<number>(0);
  TotalDownloads = new BehaviorSubject<number>(0);
  TotalVisitsVersions = new BehaviorSubject<number>(0);
  TotalDownloadsVersions = new BehaviorSubject<number>(0);
  displayContent = new BehaviorSubject<boolean>(false);
  dataVolumes$= new BehaviorSubject<number>(0)
  currentVersions$= new BehaviorSubject<any>([])
  currentDsiplay=false;
  pageNumber=0;
  pageSize = 100;

    option = Object.assign(new PaginationComponentOptions(), {
      id: 'ivo',
      currentPage: 1,
      pageSize: this.pageSize,
    });

      versionsDTO$: Observable<VersionsDTO>;

        versionRD$: Observable<RemoteData<Version>>;
      
        /**
         * The item's full version history (remote data)
         */
        versionHistoryRD$: Observable<RemoteData<VersionHistory>>;
      
        /**
         * The item's full version history
         */
        versionHistory$: Observable<VersionHistory>;

  constructor(private httpClient: HttpClient,
    public relationshipService: RelationshipDataService,
    protected linkService: LinkService,
    private versionHistoryService: VersionHistoryDataService,
    private versionService: VersionDataService,
    private paginationService: PaginationService,
    private authorizationService: AuthorizationDataService,
  ){}

  ngOnInit(): void {

   this.linkService.resolveLink<Item>(this.object, followLink('bundles'));

      if (hasValue(this.object.version)) {
         this.versionRD$ = this.object.version;
         this.versionHistoryRD$ = this.versionRD$.pipe(
           getAllSucceededRemoteData(),
           getRemoteDataPayload(),
           hasValueOperator(),
           switchMap((version: Version) => version.versionhistory),
         );
         this.versionHistory$ = this.versionHistoryRD$.pipe(
           getFirstSucceededRemoteDataPayload(),
           hasValueOperator(),
         );
   
         // If there is a draft item in the version history the 'Create version' button is disabled and a different tooltip message is shown

   
         this.getAllVersions(this.versionHistory$);
   
       
       }

       this.versionsDTO$.subscribe(versions=>{
        versions.versionDTOs.map(versionDTO=>{
         versionDTO.version.item.pipe(getFirstSucceededRemoteDataPayload()).subscribe(res=>{
          this.getStatisticsOfJournal(res.uuid).then((statistic)=>{  
            statistic.subscribe(res=>{
              res._embedded.usagereports.filter(visit=>{visit['report-type'] == 'TotalVisits' ? this.TotalVisitsVersions.next(this.TotalVisitsVersions.getValue()+visit.points[0].values.views)  : null})
              res._embedded.usagereports.filter(download=>{download['report-type'] == 'TotalDownloads' ? download.points.forEach(values=>{
               this.TotalDownloadsVersions.next(this.TotalDownloadsVersions.getValue()+values.values.views );
              }) : null})
        
             })
          });
         })
        })
        })




     this.httpClient
          .get(this.object?._links?.bundles?.href)
          .pipe(
            map((bundles: any) => {
              
              return bundles?._embedded?.bundles?.find(
                (bundle) => bundle.name === 'ORIGINAL'
              );
            }
            ),
            concatMap((res: any) => {
              if (res) {
                return this.httpClient.get(
                  `${res?._links?.bitstreams?.href}?page=${this.pageNumber}&size=${this.pageSize}`
                );
              } 
            }
            )
          ).subscribe(res=>{
            res['_embedded']?.bitstreams.forEach((bitstream)=>{
              this.dataVolumes$.next(this.dataVolumes$.getValue()+bitstream.sizeBytes)
               
            })
          })
    

    if(this.object.firstMetadataValue('dspace.entity.type') === 'JournalIssue'){
      this.relationshipService.getRelatedItemsByLabel(this.object ,'isPublicationOfJournalIssue', Object.assign(this.options,
        { elementsPerPage: -1, currentPage: 1, fetchThumbnail: false })).pipe(getFirstSucceededRemoteDataPayload()).subscribe(res=>{
          res.page.forEach(item=>{
            this.getStatisticsOfJournal(item.uuid).then(statistic=>{
              statistic.subscribe(res=>{
               res._embedded.usagereports.filter(visit=>{visit['report-type'] == 'TotalVisits' ? this.TotalVisits.next(this.TotalVisits.getValue()+visit.points[0].values.views)  : null})
               res._embedded.usagereports.filter(download=>{download['report-type'] == 'TotalDownloads' ? download.points.forEach(values=>{
                this.TotalDownloads.next(this.TotalDownloads.getValue()+values.values.views );
               }) : null})
        
              })
             })
          })
        })

    }
    else if (this.object.firstMetadataValue('dspace.entity.type') === 'JournalVolume'){
      this.relationshipService.getRelatedItemsByLabel(this.object ,'isIssueOfJournalVolume', Object.assign(this.options,
        { elementsPerPage: -1, currentPage: 1, fetchThumbnail: false })).pipe(getFirstSucceededRemoteDataPayload()).subscribe((data) => {
          data.page.forEach((issue)=>{

            this.relationshipService.getRelatedItemsByLabel(issue ,'isPublicationOfJournalIssue', Object.assign(this.options,
              { elementsPerPage: -1, currentPage: 1, fetchThumbnail: false })).pipe(getFirstSucceededRemoteDataPayload()).subscribe(res=>{
                res.page.forEach(item=>{
                  this.getStatisticsOfJournal(item.uuid).then(statistic=>{
                    statistic.subscribe(res=>{
                     res._embedded.usagereports.filter(visit=>{visit['report-type'] == 'TotalVisits' ? this.TotalVisits.next(this.TotalVisits.getValue()+visit.points[0].values.views)  : null})
                     res._embedded.usagereports.filter(download=>{download['report-type'] == 'TotalDownloads' ? download.points.forEach(values=>{
                      this.TotalDownloads.next(this.TotalDownloads.getValue()+values.values.views );
                     }) : null})
              
                    })
                   })
                })
              })

          })
        })

    }
    else if(this.object.firstMetadataValue('dspace.entity.type') === 'Journal'){
      this.relationshipService.getRelatedItemsByLabel(this.object ,'isVolumeOfJournal', Object.assign(this.options,
        { elementsPerPage: -1, currentPage: 1, fetchThumbnail: false })).pipe(getFirstSucceededRemoteDataPayload()).subscribe((journal) => {
          journal.page.forEach((volume) => {
            this.relationshipService.getRelatedItemsByLabel(volume ,'isIssueOfJournalVolume', Object.assign(this.options,
              { elementsPerPage: -1, currentPage: 1, fetchThumbnail: false })).pipe(getFirstSucceededRemoteDataPayload()).subscribe((data) => {
                data.page.forEach((issue)=>{
      
                  this.relationshipService.getRelatedItemsByLabel(issue ,'isPublicationOfJournalIssue', Object.assign(this.options,
                    { elementsPerPage: -1, currentPage: 1, fetchThumbnail: false })).pipe(getFirstSucceededRemoteDataPayload()).subscribe(res=>{
                      res.page.forEach(item=>{
                        this.getStatisticsOfJournal(item.uuid).then(statistic=>{
                          statistic.subscribe(res=>{
                           res._embedded.usagereports.filter(visit=>{visit['report-type'] == 'TotalVisits' ? this.TotalVisits.next(this.TotalVisits.getValue()+visit.points[0].values.views)  : null})
                           res._embedded.usagereports.filter(download=>{download['report-type'] == 'TotalDownloads' ? download.points.forEach(values=>{
                            this.TotalDownloads.next(this.TotalDownloads.getValue()+values.values.views );
                           }) : null})
                    
                          })
                         })
                      })
                    })
      
                })
              })
      

          })

        })

    }
    else{
      this.getStatistics().then(statistic=>{
        statistic.subscribe(res=>{
         res._embedded.usagereports.filter(visit=>{visit['report-type'] == 'TotalVisits' ? this.TotalVisits.next(visit.points[0].values.views)  : null})
         res._embedded.usagereports.filter(download=>{download['report-type'] == 'TotalDownloads' ? download.points.forEach(values=>{
          this.TotalDownloads.next(this.TotalDownloads.getValue()+values.values.views );
         }) : null})
  
        })
       })
    }


  }
  async getStatistics(): Promise<any>{
    const  data= await this.httpClient.get(`${environment.rest.baseUrl}/api/statistics/usagereports/search/object?uri=${environment.rest.baseUrl}/api/core/item/${this.object.uuid}`);
     return await data;
   }

   async getStatisticsOfJournal(itemId:string): Promise<any>{
    const  data= await this.httpClient.get(`${environment.rest.baseUrl}/api/statistics/usagereports/search/object?uri=${environment.rest.baseUrl}/api/core/item/${itemId}`);
     return await data;
   }

   onClickToDisplay(){
    this.currentDsiplay=!this.currentDsiplay;
    this.displayContent.next(this.currentDsiplay)
    
   }

   formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

removeDuplicates(arr) {
  return arr.filter((item,
      index) => arr.indexOf(item) === index);
}
  canEditVersion$(version: Version): Observable<boolean> {
    return this.authorizationService.isAuthorized(FeatureID.CanEditVersion, version.self);
  }

  getAllVersions(versionHistory$: Observable<VersionHistory>): void {
    const currentPagination = this.paginationService.getCurrentPagination(this.option.id, this.option);
    this.versionsDTO$ = combineLatest([versionHistory$, currentPagination]).pipe(
      switchMap(([versionHistory, options]: [VersionHistory, PaginationComponentOptions]) => {
        return this.versionHistoryService.getVersions(versionHistory.id,
          new PaginatedSearchOptions({ pagination: Object.assign({}, options, { currentPage: options.currentPage }) }),
          false, true, followLink('item'), followLink('eperson'));
      }),
      getFirstCompletedRemoteData(),
      getRemoteDataPayload(),
      map((versions: PaginatedList<Version>) => ({
        totalElements: versions.totalElements,
        versionDTOs: (versions?.page ?? []).map((version: Version) => ({
          version: version,
          canEditVersion: this.canEditVersion$(version),
        })),
      })),
    );

  }
}
