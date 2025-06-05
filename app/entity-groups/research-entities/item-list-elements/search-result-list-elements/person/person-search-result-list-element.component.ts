import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

import {
  APP_CONFIG,
  AppConfig,
} from "../../../../../../config/app-config.interface";
import { DSONameService } from "../../../../../core/breadcrumbs/dso-name.service";
import { ViewMode } from "../../../../../core/shared/view-mode.model";
import { ThemedBadgesComponent } from "../../../../../shared/object-collection/shared/badges/themed-badges.component";
import { listableObjectComponent } from "../../../../../shared/object-collection/shared/listable-object/listable-object.decorator";
import { ItemSearchResultListElementComponent } from "../../../../../shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component";
import { TruncatableComponent } from "../../../../../shared/truncatable/truncatable.component";
import { TruncatableService } from "../../../../../shared/truncatable/truncatable.service";
import { TruncatablePartComponent } from "../../../../../shared/truncatable/truncatable-part/truncatable-part.component";
import { ThemedThumbnailComponent } from "../../../../../thumbnail/themed-thumbnail.component";
import { KwareTranslatePipe } from "../../../../../shared/utils/kware-translate.pipe";
import { LinkService } from "src/app/core/cache/builders/link.service";
import { ThemedMetadataRepresentationListComponent } from "src/app/item-page/simple/metadata-representation-list/themed-metadata-representation-list.component";
import { ViewStatisticsComponent } from "src/app/shared/view-statistics/view-statistics.component";
import { LocaleService } from "src/app/core/locale/locale.service";
import { PublictaionCountComponent } from "../../../../../shared/publictaion-count/publictaion-count.component";

@listableObjectComponent("PersonSearchResult", ViewMode.ListElement)
@Component({
  selector: "ds-person-search-result-list-element",
  styleUrls: ["./person-search-result-list-element.component.scss"],
  templateUrl: "./person-search-result-list-element.component.html",
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass,
    RouterLink,
    ThemedBadgesComponent,
    ThemedThumbnailComponent,
    TranslateModule,
    TruncatableComponent,
    TruncatablePartComponent,
    KwareTranslatePipe,
    ViewStatisticsComponent,
    ThemedMetadataRepresentationListComponent,
    NgIf,
    NgFor,
    DatePipe,
    PublictaionCountComponent
],
})
/**
 * The component for displaying a list element for an item search result of the type Person
 */
export class PersonSearchResultListElementComponent
  extends ItemSearchResultListElementComponent
  implements OnInit
{
  public constructor(
    protected truncatableService: TruncatableService,
    public dsoNameService: DSONameService,
    protected linkService: LinkService,
    public localeService: LocaleService, //kware-edit
    @Inject(APP_CONFIG) protected appConfig: AppConfig
  ) {
    super(truncatableService, dsoNameService, linkService, appConfig);
  }

  /**
   * Display thumbnail if required by configuration
   */
  showThumbnails: boolean;

  ngOnInit(): void {
    super.ngOnInit();
    this.showThumbnails = this.appConfig.browseBy.showThumbnails;
  }
  // replace comma ', or ;' to '،' if language  is Arabic
  convertComma(str: string): string {
    let newstr = "";
    if (this.localeService.getCurrentLanguageCode() === "ar") {
      let regx = /;|,/gi;
      newstr = str?.replace(regx, "،");
      return newstr;
    } else {
      return str;
    }
  }
}
