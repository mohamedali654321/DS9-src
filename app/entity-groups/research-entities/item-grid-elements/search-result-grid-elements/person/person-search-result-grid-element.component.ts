import { AsyncPipe, DatePipe, NgClass, NgIf, NgStyle } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

import { ViewMode } from "../../../../../core/shared/view-mode.model";
import { focusShadow } from "../../../../../shared/animations/focus";
import { ThemedBadgesComponent } from "../../../../../shared/object-collection/shared/badges/themed-badges.component";
import { listableObjectComponent } from "../../../../../shared/object-collection/shared/listable-object/listable-object.decorator";
import { ItemSearchResultGridElementComponent } from "../../../../../shared/object-grid/search-result-grid-element/item-search-result/item/item-search-result-grid-element.component";
import { TruncatableComponent } from "../../../../../shared/truncatable/truncatable.component";
import { TruncatablePartComponent } from "../../../../../shared/truncatable/truncatable-part/truncatable-part.component";
import { ThemedThumbnailComponent } from "../../../../../thumbnail/themed-thumbnail.component";
import { KwareTranslatePipe } from "../../../../../shared/utils/kware-translate.pipe";
import { hasValue } from "src/app/shared/empty.util";
import { ThemedMetadataRepresentationListComponent } from "src/app/item-page/simple/metadata-representation-list/themed-metadata-representation-list.component";
import { ViewStatisticsComponent } from "src/app/shared/view-statistics/view-statistics.component";
import { PublictaionCountComponent } from "../../../../../shared/publictaion-count/publictaion-count.component";

@listableObjectComponent("PersonSearchResult", ViewMode.GridElement)
@Component({
  selector: "ds-person-search-result-grid-element",
  styleUrls: ["./person-search-result-grid-element.component.scss"],
  templateUrl: "./person-search-result-grid-element.component.html",
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
    ThemedMetadataRepresentationListComponent,
    ViewStatisticsComponent,
    NgIf,
    NgStyle,
    NgClass,
    DatePipe,
    PublictaionCountComponent
],
})
/**
 * The component for displaying a grid element for an item search result of the type Person
 */
export class PersonSearchResultGridElementComponent extends ItemSearchResultGridElementComponent {
  regxComma(): string {
    if (
      typeof window === "object" &&
      hasValue(window.localStorage) &&
      window.localStorage.getItem("selectedLangCode") === "ar"
    ) {
      return "،";
    } else {
      return ",";
    }
  }
  // replace comma ', or ;' to '،' if language  is Arabic
  convertComma(str) {
    let newstr = "";
    if (
      typeof window === "object" &&
      hasValue(window.localStorage) &&
      window.localStorage.getItem("selectedLangCode") === "ar"
    ) {
      let regx = /;|,/gi;
      newstr = str?.replace(regx, "،");
      return newstr;
    } else {
      return str;
    }
    // kware end edit -- issue.8.0.067
  }
}
