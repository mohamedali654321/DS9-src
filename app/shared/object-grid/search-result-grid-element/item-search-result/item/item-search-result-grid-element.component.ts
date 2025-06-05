import {
  AsyncPipe,
  DatePipe,
  NgClass,
  NgFor,
  NgIf,
  NgStyle,
} from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

import { DSONameService } from "../../../../../core/breadcrumbs/dso-name.service";
import { BitstreamDataService } from "../../../../../core/data/bitstream-data.service";
import { Item } from "../../../../../core/shared/item.model";
import { ViewMode } from "../../../../../core/shared/view-mode.model";
import { getItemPageRoute } from "../../../../../item-page/item-page-routing-paths";
import { ThemedThumbnailComponent } from "../../../../../thumbnail/themed-thumbnail.component";
import { focusShadow } from "../../../../animations/focus";
import { ThemedBadgesComponent } from "../../../../object-collection/shared/badges/themed-badges.component";
import { ItemSearchResult } from "../../../../object-collection/shared/item-search-result.model";
import { listableObjectComponent } from "../../../../object-collection/shared/listable-object/listable-object.decorator";
import { TruncatableComponent } from "../../../../truncatable/truncatable.component";
import { TruncatableService } from "../../../../truncatable/truncatable.service";
import { TruncatablePartComponent } from "../../../../truncatable/truncatable-part/truncatable-part.component";
import { SearchResultGridElementComponent } from "../../search-result-grid-element.component";
import { KwareTranslatePipe } from "../../../../utils/kware-translate.pipe";
import { KwareCommaConvertPipe } from "../../../../utils/kware-comma-convert.pipe";
import { LinkService } from "src/app/core/cache/builders/link.service";
import { LocaleService } from "src/app/core/locale/locale.service";
import { followLink } from "src/app/shared/utils/follow-link-config.model";
import { ThemedMetadataRepresentationListComponent } from "../../../../../item-page/simple/metadata-representation-list/themed-metadata-representation-list.component";
import { ViewStatisticsComponent } from "../../../../view-statistics/view-statistics.component";
import { PublictaionCountComponent } from "../../../../publictaion-count/publictaion-count.component";

@listableObjectComponent("PublicationSearchResult", ViewMode.GridElement)
@listableObjectComponent(ItemSearchResult, ViewMode.GridElement)
@Component({
  selector: "ds-item-search-result-grid-element",
  styleUrls: ["./item-search-result-grid-element.component.scss"],
  templateUrl: "./item-search-result-grid-element.component.html",
  animations: [focusShadow],
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    ThemedBadgesComponent,
    ThemedThumbnailComponent,
    TranslateModule,
    TruncatableComponent,
    TruncatablePartComponent,
    KwareTranslatePipe,
    KwareCommaConvertPipe,
    DatePipe,
    NgIf,
    NgFor,
    NgStyle,
    NgClass,
    ThemedMetadataRepresentationListComponent,
    ViewStatisticsComponent,
    PublictaionCountComponent
],
})
/**
 * The component for displaying a grid element for an item search result of the type Publication
 */
export class ItemSearchResultGridElementComponent
  extends SearchResultGridElementComponent<ItemSearchResult, Item>
  implements OnInit
{
  /**
   * Route to the item's page
   */
  itemPageRoute: string;

  dsoTitle: string;

  //kware-edit
  keywords = []; //subject
  title: string; // title
  authors: any; //authors
  abstract: any; //abstract

  //kware-edit check locale
  localeAr: boolean;
  localeEn: boolean;
  arabicLang: boolean;
  englishLang: boolean;

  currentVersion: boolean;
  versionId;

  constructor(
    public dsoNameService: DSONameService,
    protected truncatableService: TruncatableService,
    protected bitstreamDataService: BitstreamDataService,
    protected linkService: LinkService, //kware-edit
    public localeService: LocaleService /* kware edit - call service from LocaleService */
  ) {
    super(
      dsoNameService,
      truncatableService,
      bitstreamDataService,
      linkService,
      localeService
    );
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.itemPageRoute = getItemPageRoute(this.dso);
    this.dsoTitle = this.dsoNameService.getHitHighlights(this.object, this.dso);
    // this.linkService.resolveLink<Item>(this.dso, followLink("thumbnail")); //kware-edit
    this.linkService.resolveLink<Item>(this.dso, followLink("version")); //kware-edit
    this.currentVersion = document.URL.includes("/entities/publication/");
    if (this.currentVersion) {
      this.versionId = document.URL.split("/entities/publication/")[1];
    }

    let arabic = /[\u0600-\u06FF]/;
    let english = /[a-zA-Z]/;
    let arabicKeyswords = this.dso
      .allMetadataValues("dc.subject")
      .filter((key) => arabic.test(key));
    let englishKeywords = this.dso
      .allMetadataValues("dc.subject")
      .filter((key) => english.test(key));
    this.localeService.getCurrentLanguageCode() === "ar"
      ? (this.keywords = arabicKeyswords.slice(0, 3))
      : (this.keywords = englishKeywords.slice(0, 3));

    if (
      this.localeService.getCurrentLanguageCode() === "ar" &&
      this.dso.firstMetadataValue("dc.description.abstract") &&
      this.dso.firstMetadataValue("dc.description.abstract").includes("|") ===
        true
    ) {
      this.abstract = this.dso
        .firstMetadataValue("dc.description.abstract")
        .split("|")[1];
    }
    if (
      this.localeService.getCurrentLanguageCode() === "en" &&
      this.dso.firstMetadataValue("dc.description.abstract") &&
      this.dso.firstMetadataValue("dc.description.abstract").includes("|") ===
        true
    ) {
      this.abstract = this.dso
        .firstMetadataValue("dc.description.abstract")
        .split("|")[0];
    }
    if (
      this.dso.firstMetadataValue("dc.description.abstract") &&
      this.dso.firstMetadataValue("dc.description.abstract").includes("|") ===
        false
    ) {
      this.abstract = this.dso.firstMetadataValue("dc.description.abstract");
    }

    // kware-edit end
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
  // replace comma ',' to '،' if language  is Arabi
  // replace comma ',' to '،' if language  is Arabic
  regxComma(): string {
    if (this.localeService.getCurrentLanguageCode() === "ar") {
      return "،";
    } else {
      return ",";
    }
  }
  // replace comma ';' to '؛' if language  is Arabic

  regxColon(): string {
    if (this.localeService.getCurrentLanguageCode() === "ar") {
      return "؛";
    } else {
      return ";";
    }
  }

  removeMarkdown(text: string): string {
    const mdRegx = text?.replace(
      /__|\*|\#|\-|\!|(?:\[([^\]]*)\]\([^)]*\))/gm,
      ""
    );
    return mdRegx;
  }

  translateDate(): any {
    let date = new Date(
      this.dso.firstMetadataValue("dc.date.accessioned").split("T")[0]
    );
    if (date && this.localeService.getCurrentLanguageCode() === "ar") {
      var months = [
        "يناير",
        "فبراير",
        "مارس",
        "إبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
      ];
      var delDateString =
        date.getDate() +
        " " +
        months[date.getMonth()] +
        "، " +
        date.getFullYear();

      return delDateString;
    } else return null;
  }
}
