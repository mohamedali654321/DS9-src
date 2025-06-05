import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorizationDataService } from 'src/app/core/data/feature-authorization/authorization-data.service';
import { hasValue, isNotEmpty } from '../../empty.util';
import { Item } from 'src/app/core/shared/item.model';
import { Bitstream } from 'src/app/core/shared/bitstream.model';
import { getBitstreamDownloadRoute, getBitstreamRequestACopyRoute } from 'src/app/app-routing-paths';
import { Observable, map, combineLatest as observableCombineLatest } from 'rxjs';
import { FeatureID } from 'src/app/core/data/feature-authorization/feature-id';
import { FileService } from 'src/app/core/shared/file.service';

@Injectable({
  providedIn: 'root'
})
export class FileMetadataService {

  constructor(
    private authorizationService: AuthorizationDataService,
    private httpClient: HttpClient,
    private fileService: FileService,
  ) { }

  getFileFormat(bitstream: Bitstream) {
    return this.httpClient.get(bitstream?._links?.format?.href).pipe(map((file: any) => file.mimetype));
  }

  getFileContentLink(bitstream: Bitstream) {
    return this.fileService.retrieveFileDownloadLink(
      bitstream?._links?.content?.href
    );
  }

  canDownload(bitstream: Bitstream): Observable<boolean> {
    return this.authorizationService.isAuthorized(
      FeatureID.CanDownload,
      isNotEmpty(bitstream)
        ? bitstream?._links?.self?.href
        : undefined
    );
  }

  canRequestACopy(bitstream: Bitstream): Observable<boolean> {
    return this.authorizationService.isAuthorized(
      FeatureID.CanRequestACopy,
      isNotEmpty(bitstream)
        ? bitstream?._links?.self?.href
        : undefined
    );
  }

  bitstreamPath(bitstream: Bitstream, item: Item): Observable<{
    routerLink: string;
    queryParams: any;
  }> {
    return observableCombineLatest([
      this.canDownload(bitstream),
      this.canRequestACopy(bitstream),
    ]).pipe(
      map(([canDownload, canRequestACopy]) =>
        this.getBitstreamPath(canDownload, canRequestACopy, item, bitstream)
      ),
    );
  }

  private getBitstreamPath(canDownload: boolean, canRequestACopy: boolean, item: Item, bitstream: Bitstream) {
    if (!canDownload && canRequestACopy && hasValue(item)) {
      return getBitstreamRequestACopyRoute(item, bitstream);
    }
    return this.getBitstreamDownloadPath(bitstream);
  }

  private getBitstreamDownloadPath(bitstream: Bitstream) {
    return {
      routerLink: getBitstreamDownloadRoute(bitstream),
      queryParams: {},
    };
  }
}
