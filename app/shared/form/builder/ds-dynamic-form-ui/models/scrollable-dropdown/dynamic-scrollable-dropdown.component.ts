import {
  AsyncPipe,
  NgForOf,
  NgIf,
} from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import {
  NgbDropdown,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import {
  DynamicFormLayoutService,
  DynamicFormValidationService,
} from '@ng-dynamic-forms/core';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {
  Observable,
  of as observableOf,
} from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  map,
  tap,
} from 'rxjs/operators';

import {
  buildPaginatedList,
  PaginatedList,
} from '../../../../../../core/data/paginated-list.model';
import { getFirstSucceededRemoteDataPayload } from '../../../../../../core/shared/operators';
import { PageInfo } from '../../../../../../core/shared/page-info.model';
import { VocabularyEntry } from '../../../../../../core/submission/vocabularies/models/vocabulary-entry.model';
import { VocabularyService } from '../../../../../../core/submission/vocabularies/vocabulary.service';
import { isEmpty } from '../../../../../empty.util';
import { FormFieldMetadataValueObject } from '../../../models/form-field-metadata-value.model';
import { DsDynamicVocabularyComponent } from '../dynamic-vocabulary.component';
import { DynamicScrollableDropdownModel } from './dynamic-scrollable-dropdown.model';
import { SharedVariableService } from 'src/app/core/services/share-variable.service';
import { KwareTranslatePipe } from 'src/app/shared/utils/kware-translate.pipe';

/**
 * Component representing a dropdown input field
 */
@Component({
  selector: 'ds-dynamic-scrollable-dropdown',
  styleUrls: ['./dynamic-scrollable-dropdown.component.scss'],
  templateUrl: './dynamic-scrollable-dropdown.component.html',
  imports: [
    NgbDropdownModule,
    NgIf,
    AsyncPipe,
    InfiniteScrollModule,
    NgForOf,
    TranslateModule,
    KwareTranslatePipe
  ],
  standalone: true,
})
export class DsDynamicScrollableDropdownComponent extends DsDynamicVocabularyComponent implements OnInit {
  @ViewChild('dropdownMenu', { read: ElementRef }) dropdownMenu: ElementRef;

  @Input() bindId = true;
  @Input() group: UntypedFormGroup;
  @Input() model: DynamicScrollableDropdownModel;

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();

  public currentValue: Observable<string>;
  public storedValue: Observable<string>;
  public loading = false;
  public pageInfo: PageInfo;
  public optionsList: any;
  public inputText: string = null;
  public selectedIndex = 0;
  public acceptableKeys = ['Space', 'NumpadMultiply', 'NumpadAdd', 'NumpadSubtract', 'NumpadDecimal', 'Semicolon', 'Equal', 'Comma', 'Minus', 'Period', 'Quote', 'Backquote'];
  public SpecializationsList: any;
  public newSpecializationsList: Observable<any>;
  public display = '';
  public value = '';

 mainAdmin="Department of Educational Affairs | إدارة الشؤون التعليمية";
 college="College of Computer and Information Sciences | كلية علوم الحاسب و المعلومات";
  constructor(protected vocabularyService: VocabularyService,
              protected cdr: ChangeDetectorRef,
              protected layoutService: DynamicFormLayoutService,
              protected validationService: DynamicFormValidationService,
              protected sharedVariableService: SharedVariableService, //kware-edit mohamed
  ) {
    super(vocabularyService, layoutService, validationService);
  }

  /**
   * Initialize the component, setting up the init form value
   */
  ngOnInit() {


    this.updatePageInfo(this.model.maxOptions, 1);

            // kware-edit-start mohamed
            if (this.model.id === 'dc_relation_specialization'){
              this.sharedVariableService.currentSpecializations.subscribe((Specializations)=>{
                if (this.SpecializationsList !== Specializations){
                  this.SpecializationsList = Specializations;
                 this.newSpecializationsList = this.SpecializationsList.map((value)=>{
                  if (value){
                    this.display = value;
                    this.value = value;
                    return {
                      'display': this.display,
                      'value':this.value
                    };
                  }
                });
                this.optionsList = this.newSpecializationsList;
                if (this.model.value) {
                  this.setCurrentValue(this.model.value, true);
        
                }
    
                this.cdr.detectChanges();
                }
              });
            }
        // kware-edit-end mohamed
        if (this.model.id !== 'dc_relation_specialization'){

          this.loadOptions(true);

          this.group.get(this.model.id).valueChanges.pipe(distinctUntilChanged())
          .subscribe((value) => {
            this.setCurrentValue(value);
          });
        }


  }

  loadOptions(fromInit: boolean) {
    this.loading = true;
    let currentChildOrgUnit;
    let mainAdministrationName;
    let collegeName;
    this.sharedVariableService.currentChildOrgunit_type.subscribe(type=> currentChildOrgUnit = type);
    this.sharedVariableService.currentMainAdministrationType.subscribe(administration=>{mainAdministrationName =administration});
    this.sharedVariableService.currentMainCollege.subscribe(college=>{collegeName = college})
    if(this.model.id === 'organization_legalName' && currentChildOrgUnit === 'Department | قسم'){
      this.vocabularyService.getVocabularyEntriesByValue(this.inputText, false, {name:`${mainAdministrationName.split(' | ')[0].toLocaleLowerCase().split(' ').join('_')}_${collegeName.split(' | ')[0].toLocaleLowerCase().split(' ').join('_')}_type`,closed:true}, this.pageInfo).pipe(
        getFirstSucceededRemoteDataPayload(),
        catchError(() => observableOf(buildPaginatedList(new PageInfo(), []))),
        tap(() => this.loading = false),
      ).subscribe((list: PaginatedList<VocabularyEntry>) => {
        this.optionsList = list.page;
        if (fromInit && this.model.value) {
          this.setCurrentValue(this.model.value, true);
        }
  
        this.updatePageInfo(
          list.pageInfo.elementsPerPage,
          list.pageInfo.currentPage,
          list.pageInfo.totalElements,
          list.pageInfo.totalPages,
        );
        this.selectedIndex = 0;
        this.cdr.detectChanges();
      });



    }
    else{
      this.vocabularyService.getVocabularyEntriesByValue(this.inputText, false, this.model.vocabularyOptions, this.pageInfo).pipe(
        getFirstSucceededRemoteDataPayload(),
        catchError(() => observableOf(buildPaginatedList(new PageInfo(), []))),
        tap(() => this.loading = false),
      ).subscribe((list: PaginatedList<VocabularyEntry>) => {
        this.optionsList = list.page;
        if (fromInit && this.model.value) {
          this.setCurrentValue(this.model.value, true);
        }
  
        this.updatePageInfo(
          list.pageInfo.elementsPerPage,
          list.pageInfo.currentPage,
          list.pageInfo.totalElements,
          list.pageInfo.totalPages,
        );
        this.selectedIndex = 0;
        this.cdr.detectChanges();
      });


    }

  }

  /**
   * Converts an item from the result list to a `string` to display in the `<input>` field.
   */
  inputFormatter = (x: VocabularyEntry): string => x.display || x.value;

  /**
   * Opens dropdown menu
   * @param sdRef The reference of the NgbDropdown.
   */
  openDropdown(sdRef: NgbDropdown) {
    if (!this.model.readOnly) {
      this.group.markAsUntouched();
      this.inputText = null;
      this.updatePageInfo(this.model.maxOptions, 1);
      this.loadOptions(false);
      sdRef.open();
    }
  }

  navigateDropdown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      this.selectedIndex = Math.min(this.selectedIndex + 1, this.optionsList.length - 1);
    } else if (event.key === 'ArrowUp') {
      this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
    }
    this.scrollToSelected();
  }

  scrollToSelected() {
    const dropdownItems = this.dropdownMenu.nativeElement.querySelectorAll('.dropdown-item');
    const selectedItem = dropdownItems[this.selectedIndex];
    if (selectedItem) {
      selectedItem.scrollIntoView({ block: 'nearest' });
    }
  }

  /**
   * KeyDown handler to allow toggling the dropdown via keyboard
   * @param event KeyboardEvent
   * @param sdRef The reference of the NgbDropdown.
   */
  selectOnKeyDown(event: KeyboardEvent, sdRef: NgbDropdown) {
    const keyName = event.key;

    if (keyName === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      if (sdRef.isOpen()) {
        this.onSelect(this.optionsList[this.selectedIndex]);
        sdRef.close();
      } else {
        sdRef.open();
      }
    } else if (keyName === 'ArrowDown' || keyName === 'ArrowUp') {
      event.preventDefault();
      event.stopPropagation();
      this.navigateDropdown(event);
    } else if (keyName === 'Backspace') {
      this.removeKeyFromInput();
    } else if (this.isAcceptableKey(keyName)) {
      this.addKeyToInput(keyName);
    }
  }

  addKeyToInput(keyName: string) {
    if (this.inputText === null) {
      this.inputText = '';
    }
    this.inputText += keyName;
    // When a new key is added, we need to reset the page info
    this.updatePageInfo(this.model.maxOptions, 1);
    this.loadOptions(false);
  }

  removeKeyFromInput() {
    if (this.inputText !== null) {
      this.inputText = this.inputText.slice(0, -1);
      if (this.inputText === '') {
        this.inputText = null;
      }
      this.loadOptions(false);
    }
  }


  isAcceptableKey(keyPress: string): boolean {
    // allow all letters and numbers
    if (keyPress.length === 1 && keyPress.match(/^[a-zA-Z0-9]*$/)) {
      return true;
    }
    // Some other characters like space, dash, etc should be allowed as well
    return this.acceptableKeys.includes(keyPress);
  }

  /**
   * Loads any new entries
   */
  onScroll() {

      let currentChildOrgUnit;
      let mainAdministrationName;
      let collegeName;
      this.sharedVariableService.currentChildOrgunit_type.subscribe(type=> currentChildOrgUnit = type);
      this.sharedVariableService.currentMainAdministrationType.subscribe(administration=>{mainAdministrationName =administration});
      this.sharedVariableService.currentMainCollege.subscribe(college=>{collegeName = college})
      if(this.model.id === 'organization_legalName' && currentChildOrgUnit === 'Department | قسم'){
        if (!this.loading && this.pageInfo.currentPage <= this.pageInfo.totalPages) {
          this.loading = true;
          this.updatePageInfo(
            this.pageInfo.elementsPerPage,
            this.pageInfo.currentPage + 1,
            this.pageInfo.totalElements,
            this.pageInfo.totalPages,
          );
        this.vocabularyService.getVocabularyEntriesByValue(this.inputText, false, {name:`${mainAdministrationName.split(' | ')[0].toLocaleLowerCase().split(' ').join('_')}_${collegeName.split(' | ')[0].toLocaleLowerCase().split(' ').join('_')}_type`,closed:true}, this.pageInfo).pipe(
          getFirstSucceededRemoteDataPayload(),
          catchError(() => observableOf(buildPaginatedList(
            new PageInfo(),
            [],
          )),
          ),
          tap(() => this.loading = false))
          .subscribe((list: PaginatedList<VocabularyEntry>) => {
            this.optionsList = this.optionsList.concat(list.page);
            this.updatePageInfo(
              list.pageInfo.elementsPerPage,
              list.pageInfo.currentPage,
              list.pageInfo.totalElements,
              list.pageInfo.totalPages,
            );
            this.cdr.detectChanges();
          });
        }
      }
      else{
        if (!this.loading && this.pageInfo.currentPage <= this.pageInfo.totalPages) {
          this.loading = true;
          this.updatePageInfo(
            this.pageInfo.elementsPerPage,
            this.pageInfo.currentPage + 1,
            this.pageInfo.totalElements,
            this.pageInfo.totalPages,
          );

        this.vocabularyService.getVocabularyEntriesByValue(this.inputText, false, this.model.vocabularyOptions, this.pageInfo).pipe(
          getFirstSucceededRemoteDataPayload(),
          catchError(() => observableOf(buildPaginatedList(
            new PageInfo(),
            [],
          )),
          ),
          tap(() => this.loading = false))
          .subscribe((list: PaginatedList<VocabularyEntry>) => {
            this.optionsList = this.optionsList.concat(list.page);
            this.updatePageInfo(
              list.pageInfo.elementsPerPage,
              list.pageInfo.currentPage,
              list.pageInfo.totalElements,
              list.pageInfo.totalPages,
            );
            this.cdr.detectChanges();
          });
        }
      }
      

    
  }

  /**
   * Emits a change event and set the current value with the given value.
   * @param event The value to emit.
   */
  onSelect(event) {
    this.group.markAsDirty();
    this.dispatchUpdate(event);
    this.setCurrentValue(event);
  }

  /**
   * Sets the current value with the given value.
   * @param value The value to set.
   * @param init Representing if is init value or not.
   */
  setCurrentValue(value: any, init = false): void {
    let result: Observable<string>;
    let storedResult: Observable<string>;
    if (init && !this.model.value) {
      result = this.getInitValueFromModel().pipe(
        map((formValue: FormFieldMetadataValueObject) => formValue.display),
      );
      storedResult= this.getInitValueFromModel().pipe(
        map((formValue: FormFieldMetadataValueObject) => formValue.value),
      );
    } else {
      if (isEmpty(value)) {
        result = observableOf('');
        storedResult = observableOf('');
      } else if (typeof value === 'string') {
        result = observableOf(value);
        storedResult = observableOf(value);
      } else {
        result = observableOf(value.display);
        storedResult = observableOf(value.value);

      }
    }

    this.currentValue = result;

    this.storedValue=storedResult;
    if(this.model.id === 'organization_type'){
      this.storedValue.subscribe(res=>{
        this.sharedVariableService.setOrgunit_type(res)
      })
     } 

     if(this.model.id === 'organization_child_type'){
      this.storedValue.subscribe(res=>{
        this.sharedVariableService.setChildOrgunit_type(res)
      })
     } 
     if(this.model.id === 'organization_relation_college'){
      this.storedValue.subscribe(res=>{
        this.sharedVariableService.setMainCollege(res)
      })
     }      
  }

  sendFilterData(event:any){ 
    let currentChildOrgUnit;
    let mainAdministrationName;
    let collegeName;
    this.sharedVariableService.currentChildOrgunit_type.subscribe(type=> currentChildOrgUnit = type);
    this.sharedVariableService.currentMainAdministrationType.subscribe(administration=>{mainAdministrationName =administration});
    this.sharedVariableService.currentMainCollege.subscribe(college=>{collegeName = college})
    if(this.model.id === 'organization_legalName' && currentChildOrgUnit === 'Department | قسم'){
      this.vocabularyService.getVocabularyEntriesByValue(event.target.value, false, {name:`${mainAdministrationName.split(' | ')[0].toLocaleLowerCase().split(' ').join('_')}_${collegeName.split(' | ')[0].toLocaleLowerCase().split(' ').join('_')}_type`,closed:true}, this.pageInfo).pipe(
        getFirstSucceededRemoteDataPayload(),
        catchError(() => observableOf(buildPaginatedList(new PageInfo(), []))),
        tap(() => this.loading = false),
      ).subscribe((list: PaginatedList<VocabularyEntry>) => {
        this.optionsList = list.page;
      });
    }
    else{
      this.vocabularyService.getVocabularyEntriesByValue(event.target.value, false, this.model.vocabularyOptions, this.pageInfo).pipe(
        getFirstSucceededRemoteDataPayload(),
        catchError(() => observableOf(buildPaginatedList(new PageInfo(), []))),
        tap(() => this.loading = false),
      ).subscribe((list: PaginatedList<VocabularyEntry>) => {
        this.optionsList = list.page;
      });
    }


  }

}
