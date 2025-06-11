
import {
  Component,
  Input,
} from '@angular/core';
import { KwareTranslatePipe } from "../utils/kware-translate.pipe";
import { NgClass, NgIf } from '@angular/common';

/**
 * This component renders any content inside this wrapper.
 * The wrapper prints a label before the content (if available)
 */
@Component({
  selector: 'ds-metadata-field-wrapper',
  styleUrls: ['./metadata-field-wrapper.component.scss'],
  templateUrl: './metadata-field-wrapper.component.html',
  standalone: true,
  imports: [KwareTranslatePipe,NgClass,NgIf],
})
export class MetadataFieldWrapperComponent {

  /**
   * The label (title) for the content
   */
  @Input() label: string;

  @Input() hideIfNoTextContent = true;
}
