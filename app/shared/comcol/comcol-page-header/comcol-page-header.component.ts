
import {
  Component,
  Input,
} from '@angular/core';
import { KwareTranslatePipe } from "../../utils/kware-translate.pipe";

@Component({
  selector: 'ds-comcol-page-header',
  styleUrls: ['./comcol-page-header.component.scss'],
  templateUrl: './comcol-page-header.component.html',
  imports: [KwareTranslatePipe],
  standalone: true,
})
export class ComcolPageHeaderComponent {
  @Input() name: string;
}
