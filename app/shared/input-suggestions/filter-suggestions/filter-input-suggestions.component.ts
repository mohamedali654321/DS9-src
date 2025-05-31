import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ClickOutsideDirective } from '../../utils/click-outside.directive';
import { DebounceDirective } from '../../utils/debounce.directive';
import { InputSuggestionsComponent } from '../input-suggestions.component';
import { InputSuggestion } from '../input-suggestions.model';
import { KwareCommaConvertPipe } from '../../utils/kware-comma-convert.pipe';
import { KwareTranslatePipe } from '../../utils/kware-translate.pipe';
import { LocaleService } from 'src/app/core/locale/locale.service';

@Component({
  selector: 'ds-filter-input-suggestions',
  styleUrls: ['./../input-suggestions.component.scss'],
  templateUrl: './filter-input-suggestions.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // Usage of forwardRef necessary https://github.com/angular/angular.io/issues/1151
      // eslint-disable-next-line @angular-eslint/no-forward-ref
      useExisting: forwardRef(() => FilterInputSuggestionsComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [
    AsyncPipe,
    ClickOutsideDirective,
    DebounceDirective,
    FormsModule,
    NgClass,
    NgTemplateOutlet,
    TranslateModule,
    KwareTranslatePipe,
    KwareCommaConvertPipe,
  ],
})

/**
 * Component representing a form with a autocomplete functionality
 */
export class FilterInputSuggestionsComponent extends InputSuggestionsComponent {
  /**
   * The suggestions that should be shown
   */
  @Input() suggestions: InputSuggestion[] = [];

  locale: boolean;

  constructor(protected localeService: LocaleService) {
    super();
    this.locale =
      this.localeService.getCurrentLanguageCode() === 'ar' ? true : false;
  }

  onSubmit(data) {
    this.value = data;
    this.submitSuggestion.emit(data);
  }

  onClickSuggestion(data: InputSuggestion) {
    this.value = data.value;
    this.clickSuggestion.emit(data);
    this.close();
    this.blockReopen = true;
    this.queryInput.nativeElement.focus();
    return false;
  }

  displayValueEn(displayValue, name) {
    let counter = displayValue.split('(')[1].split(')')[0];
    if (
      name === 'f.author' ||
      name === 'f.advisor' ||
      name === 'f.creativeWorkEditor' ||
      name === 'f.person'
    ) {
      displayValue =
        (
          this.localeService.getStringByLocale(
            displayValue.split('(')[0].split(',')[0]
          ) +
          ',' +
          this.localeService.getStringByLocale(
            displayValue.split('(')[0].split(',')[1]
          )
        ).split(',undefined')[0] +
        ' (' +
        counter +
        ')';
      return displayValue;
    } else {
      displayValue =
        this.localeService
          .getStringByLocale(displayValue.split('(')[0])
          .split(',undefined')[0] +
        ' (' +
        counter +
        ')';
      return displayValue;
    }
  }
}
