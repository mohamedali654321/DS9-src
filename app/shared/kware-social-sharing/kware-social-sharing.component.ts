import {
  AsyncPipe,
  NgFor,
  NgIf,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { DSONameService } from 'src/app/core/breadcrumbs/dso-name.service';
import { Item } from 'src/app/core/shared/item.model';
import { getItemPageRoute } from 'src/app/item-page/item-page-routing-paths';

@Component({
  selector: 'ds-kware-social-sharing',
  templateUrl: './kware-social-sharing.component.html',
  styleUrls: ['./kware-social-sharing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    TranslateModule
  ],
})
/**
 * Component to render dynamically the social2 buttons using addToAny plugin
 */
export class KwareSocialSharingComponent implements OnInit {

  @Input() item:Item;
  title:string;
  itemPageRoute: string;

constructor(public dsoNameService: DSONameService,){}
  ngOnInit() {
   this.title= this.dsoNameService.getName(this.item); 
   this.itemPageRoute = location.origin+getItemPageRoute(this.item);
    
  }

  printPage(){
    window.print();
  }
}
